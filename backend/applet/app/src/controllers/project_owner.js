//Import Postgres Accounts-Table model
const Account = require('../models/account');

//import scheduler node-cron
const CronJob = require('cron').CronJob;

//Import router
const express = require('express');
const router = express.Router();

//Import sol compiler and file system handler
const solc = require('solc');
const fs = require('fs');


// Contract compilation

//Project Owner
var contracts_input = fs.readFileSync('src/smartcontracts/contracts.sol');
var contracts_output = solc.compile(contracts_input.toString(), 1);
var project_owner_bytecode = contracts_output.contracts[':Project_Owner'].bytecode;
var project_owner_abi = JSON.parse(contracts_output.contracts[':Project_Owner'].interface);
var project_owner_contract = global.web3.eth.contract(project_owner_abi);

//Project
var project_bytecode = contracts_output.contracts[':Project'].bytecode;
var project_abi = JSON.parse(contracts_output.contracts[':Project'].interface);
var project_contract = global.web3.eth.contract(project_abi);

// Get project owner data from smart contract
let getProjectOwner = (req, res, next) => {
    var address = req.params.address;
    const body = {
        'account_address': address
    };
    var acccount_balance = global.web3.fromWei(global.web3.eth.getBalance(body.account_address), 'ether');
    console.log('Get project owner contract address for: ' + body.account_address);
    return Account.findOne({ where: body }).then(data => {
        var acccount_balance = global.web3.fromWei(global.web3.eth.getBalance(body.account_address), 'ether');
        if(!data.project_owner_address) {
            var project_owner = project_owner_contract.new(
                {
                    from: address,
                    data: project_owner_bytecode,
                    gas: '4700000'
                }, function (e, contract){
                    console.log(e, contract);
                    if (typeof contract.address !== 'undefined') {
                        console.log('Contract mined! address: ' + contract.address +
                                    ' transactionHash: ' + contract.transactionHash);
                        data.updateAttributes({project_owner_address : contract.address});
                        var contract_balance = global.web3.fromWei(global.web3.eth.getBalance(contract.address), 'ether');
                        return res.json({created: true,
                                         success: true,
                                         data: 'Smart contract for project owner deployed.',
                                         projects: [],
                                         contract_balance: contract_balance + " ether",
                                         account_balance: acccount_balance + " ether"});
                    }
                });
        } else {
            console.log('Account with project owner address ' + data.project_owner_address + ' found.');
            var jsonArr = [];
            var project_owner = project_owner_contract.at(data.project_owner_address);
            console.log("Project Count: " + parseInt(project_owner.getProjectsCount.call()));
            for (var i = 0; i < project_owner.getProjectsCount.call(); i++) {
                var project_address = project_owner.getProject(i);
                var project = project_contract.at(project_address);
                console.log("Got project address: " + project_address);
                console.log("Push project to the return-array.");
                var project_end_date = project.getProjectDate.call();
                var date = new Date(project_end_date[2], project_end_date[1], project_end_date[0],
                    project_end_date[3], project_end_date[4], project_end_date[5], 0);
                jsonArr.push({
                    project_address: project_address,
                    alive: project.isAlive.call(),
                    project_title: project.getProjectTitle.call(),
                    project_end_date: date.toString(),
                    project_funding_goal: project.getFundingGoal.call() + " ether",
                    project_current_funding: global.web3.fromWei(global.web3.eth.getBalance(project_address), "ether")
                        + " ether",
                    project_share_token: project.getTokenAmount.call() + " share tokens"

                });
            }
            var contract_balance = global.web3.fromWei(global.web3.eth.getBalance(data.project_owner_address), 'ether');
            return res.json({
                created: false,
                success: true,
                contract_balance: contract_balance,
                account_balance: acccount_balance,
                projects: jsonArr});
        }
    });
};

router.get('/:address', getProjectOwner);

let createProject = (req, res, next) => {
    var address = req.params.address;
    const body = {
        'account_address': address
    };
    return Account.findOne({ where: body }).then(data => {
            if(data.project_owner_address) {
                var project_owner = project_owner_contract.at(data.project_owner_address);
                var project_title = req.body.project_title;
                var project_funding_goal = req.body.project_funding_goal;
                var date = new Date(req.body.project_end_date);
                console.log("Date now: " + new Date());
                console.log("Project end date: " + date.getDate() + " " + date.getMonth() + " "
                    + date.getFullYear() + " " + date.getHours() + " " + date.getMinutes() + " " + date.getSeconds());
                var project_addr = project_owner.createProject(project_title, project_funding_goal, req.body.tokens,
                        date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(),
                        date.getSeconds(),
                    {from: address, gas: 4700000},
                    (err, result) => {
                        if(err){
                            return res.json({Success: false, Error : err});
                        }else{
                            var newProjectAddress = project_owner.getProject(project_owner.getProjectsCount.call() - 1);
                            console.log("address: " + newProjectAddress); 
                            var scheduledCancelation = new CronJob(date, function (request, results) {
                                console.log("Inside scheduler ...");
                                return Account.findOne({ where: body }).then(deleteData => {
                                    if(deleteData.project_owner_address) {
                                        var project_owner = project_owner_contract.at(deleteData.project_owner_address);
                                        var project_address = global.web3.toChecksumAddress(newProjectAddress);
                                        var project = project_contract.at(project_address);
                                        if(!project.getFundingGoalReached.call()) {
                                            console.log("Inside scheduler - Funding goal not reached: Project cancelled.");
                                            project_owner.cancelProject(project_address, {from: address, gas: 4700000},
                                                (err, cancel_result) => {
                                                if(err){
                                                    console.log('Error: Didn\'t delete project: ' + project_address);
                                                   return res.json({success: false, error: err});
                                                }else{
                                                    console.log('Result: Successfully deleted project: ' +
                                                    project_address + ' since funding goal wasn\'t reached');
                                                    return res.json({success: true, data: cancel_result});
                                                }
                                            });
                                        }
                                    }else{
                                        console.log('unable to find user with address: ' + address);
                                        return res.json({success: false,
                                        data: "Get an project owner contract first with GET/project_owner/:youraddress"});
                                    }
                                });
                            });
                            scheduledCancelation.start();
                            console.log("scheduler running...." + scheduledCancelation.running);
                            return res.json({Success: true, Result : result});
                        }
                     });
                     
                console.log("addr after: " + project_addr);
            }else{
                return res.json({success: false,
                                 data: "Get an project owner contract first with GET/project_owner/:youraddress"});
            }
    });
};

router.post('/:address', createProject);

let withdrawProjectFunding = (req, res, next) => {
    var address = req.params.address;
    const body = {
        'account_address': address
    };

    return Account.findOne({ where: body }).then(data => {
        if(data.project_owner_address) {
            var project_owner = project_owner_contract.at(data.project_owner_address);
            var project_address = global.web3.toChecksumAddress(req.body.project_address);
            console.log('Withdraw funding from ' + project_address);
            project_owner.withdrawFundingFromProject.sendTransaction(project_address,
                {from: address, gas: 4700000}, (err, result) => {
                    if(err){
                        console.log('Error: ' + err);
                        return res.json({success: false, data: err});
                    };
                    if(result){
                        console.log('Result: ' + result);
                        return res.json({success: true, data: result});
                    };
                });
        }else{
            return res.json({success: false,
            data: "Get an project owner contract first with GET/project_owner/:youraddress"});
        }
    });
};

router.put('/:address', withdrawProjectFunding);

let cancelProject = (req, res, next) => {
    var address = req.params.address;
    const body = {
        'account_address': address
    };
    return Account.findOne({ where: body }).then(data => {
        if(data.project_owner_address) {
            var project_owner = project_owner_contract.at(data.project_owner_address);
            var project_address = global.web3.toChecksumAddress(req.body.project_address);
            project_owner.cancelProject(project_address, {from: address, gas: 4700000}, (err, result) => {
                if(err){
                    console.log('Error: ' + err);
                    return res.json({success: false});
                }else{
                    console.log('Result: ' + result);
                    return res.json({success: true, data: result});
                }
            });
        }else{
            return res.json({success: false,
            data: "Get an project owner contract first with GET/project_owner/:youraddress"});
        }
    });
};

router.delete('/:address', cancelProject);

module.exports = router;