//Import Sequelize and Postgre Accounts-Table model
const Account = require('../models/account');

// Router
const express = require('express');
const router = express.Router();


//Import sol compiler and file system handler
const solc = require('solc');
const fs = require('fs');

// Contract compilation

//Project
var contracts_input = fs.readFileSync('src/smartcontracts/contracts.sol');
var contracts_output = solc.compile(contracts_input.toString(), 1);
var project_abi = JSON.parse(contracts_output.contracts[':Project'].interface);
var project_contract = global.web3.eth.contract(project_abi);

//Backer
var backer_bytecode = contracts_output.contracts[':Backer'].bytecode;
var backer_abi = JSON.parse(contracts_output.contracts[':Backer'].interface);
var backer_contract = global.web3.eth.contract(backer_abi);

//Project Owner
var project_owner_bytecode = contracts_output.contracts[':Project_Owner'].bytecode;
var project_owner_abi = JSON.parse(contracts_output.contracts[':Project_Owner'].interface);
var project_owner_contract = global.web3.eth.contract(project_owner_abi);

// Get backer data from smart contract
let getBacker = (req, res, next) => {
    var address = req.params.address;
    const body = {
        'account_address': address
    };
    var acccount_balance = global.web3.fromWei(global.web3.eth.getBalance(body.account_address), 'ether');
    return Account.findOne({ where: body }).then(data => {
        if(!data.backer_address) {
            var backer = backer_contract.new(
                {
                    from: address,
                    data: backer_bytecode,
                    gas: '4700000'
                }, function (e, contract){
                console.log(e, contract);
                if (typeof contract.address !== 'undefined') {
                    console.log('Contract mined! address: ' + contract.address +
                        ' transactionHash: ' + contract.transactionHash);
                    data.updateAttributes({backer_address : contract.address});
                    return res.json({success: true,
                                     contract_balance: global.web3.fromWei(
                                         global.web3.eth.getBalance(contract.address), 'ether') + " ether",
                                     created: true,
                                     account_balance: acccount_balance + " ether",
                                     projects: []});
                }
            });
        } else{
            var jsonArr = [];
            var backer = backer_contract.at(data.backer_address);
            console.log('Backer has ' + backer.getProjectsCount.call() + ' funded projects.');
            for (var i = 0; i < backer.getProjectsCount.call(); i++) {
                var project_address = backer.getProject(i);
                console.log(i + '. project address: ' + project_address);
                var project = project_contract.at(project_address);
                var balance = global.web3.fromWei(
                    global.web3.eth.getBalance(project_address).toNumber(), "ether");
                console.log('Project balance: ' + balance);
                var funding_goal = project.getFundingGoal.call();
                console.log('Project alive: ' + project.isAlive.call())
                var project_end_date = project.getProjectDate.call();
                var date = new Date(project_end_date[2], project_end_date[1], project_end_date[0], project_end_date[3],
                    project_end_date[4], project_end_date[5], 0);
                console.log('Project end date: ' + date.toString());
                if (project.isAlive.call()) {
                    jsonArr.push({
                        project_address: project_address,
                        project_title: project.getProjectTitle.call(),
                        project_end_date: date.toString(),
                        project_funding_goal: project.getFundingGoal.call() + " ether",
                        project_current_funding: balance + " ether",
                        invested_funds: backer.getProjectFunding(i),
                        share_token_ownership_amount: backer.getProjectTokens(i) + " share tokens"
                    });
                } else {
                    jsonArr.push({
                        project_address: project_address,
                        project_status: 'Deleted or terminated.'
                    });
                }
            }
            return res.json({
                created: false,
                projects: jsonArr,
                success: true,
                contract_balance: global.web3.fromWei(global.web3.eth.getBalance(data.backer_address), "ether")
                    + " ether",
                account_balance: acccount_balance + " ether"
            });
        }
    });
};

router.get('/backer/:address', getBacker);

// Get all projects
let getProjects = (req, res, next) => {
    return Account.findAll({ where: {}}).then(data => {
    if(data){
        var jsonArr = [];
        for(var i = 0; i < data.length; i++){
            if(data[i].project_owner_address){
                console.log('Getting projects which are created by ' + data[i].project_owner_address);
                var project_owner = project_owner_contract.at(data[i].project_owner_address);
                for (var j = 0; j < project_owner.getProjectsCount.call(); j++) {
                    if (project.isAlive.call()) {
                        var project_address = project_owner.getProject(j);
                        var project = project_contract.at(project_address);
                        console.log("Push project project_address to the return-array.");
                        var project_end_date = project.getProjectDate.call();
                        var date = new Date(project_end_date[2], project_end_date[1], project_end_date[0],
                            project_end_date[3], project_end_date[4], project_end_date[5], 0);
                        jsonArr.push({
                            project_address: project_address,
                            alive: project.isAlive.call(),
                            project_title: project.getProjectTitle.call(),
                            project_end_date: date.toString(),
                            project_funding_goal: project.getFundingGoal.call() + " ether",
                            project_current_funding: global.web3.fromWei(global.web3.eth.getBalance(project_address),
                                "ether")
                            + " ether",
                            project_share_token: project.getTokenAmount.call() + " share tokens"
                        });
                    }
                }
            }
        }
        return res.json({success: true, projects: jsonArr});
    } else {
        console.log('No projects found.');
        return res.json({success: true, projects: []});
    }
});};

router.get('/projects', getProjects);

let investProject = (req, res, next) => {
    var address = req.params.address;
    const body = {
        'account_address': address
    };
    return Account.findOne({ where: body }).then(data => {
        if(data.backer_address) {
            var backer = backer_contract.at(data.backer_address);
            var project_address = req.body.project_address;
            var funding = req.body.funding;
            console.log('Fund project ...');

            backer.investProject(project_address, funding,
                {from: address,
                    gas: 4700000,
                    value: global.web3.toWei(funding, 'ether')},
                (err, result) => {
                    if(err){
                        return res.json({success: false, error : err});
                    }else{
                        return res.json({success: true, result : result});}
                });
        }else{
            return res.json({success: false,
                data: "No backer contract deployed yet. Create backer contract with GET /backer/:address"});
        }
    });
};

router.put('/:address', investProject);

module.exports = router;
