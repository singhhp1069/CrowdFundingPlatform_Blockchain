const Sequelize = require('sequelize');
const Controller = require('./_controller');
const Account = require('../models/account');
// import web3 API
const Web3 = require('web3');
// instanciate
const web3 = new Web3();
// link with local ethereum node
web3.setProvider(new web3.providers.HttpProvider("http://192.168.178.53:8545"));

const router = new Controller(Account).withCreate().withGet().withGetAll().withUpdate().withRemove().router();
const project_owner_abi = [{"constant":false,"inputs":[{"name":"project_address","type":"address"}],"name":"cancelProject","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"project_title","type":"string"},{"name":"funding_goal","type":"uint256"}],"name":"createProject","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"deleteProject_Owner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"project_address","type":"address"}],"name":"withDrawFundingFromProject","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getProjectsCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getProject","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"project_owner_address","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
;
const project_abi = [{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getFundingGoalReached","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"deleteProject","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdrawFunding","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isAlive","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"fundProject","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"getCurrentFunding","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getFundingGoal","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getProjectTitle","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[{"name":"project_title","type":"string"},{"name":"_funding_goal","type":"uint256"}],"payable":false,"type":"constructor"}];
const backer_abi = [{"constant":false,"inputs":[],"name":"Backer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"deleteBacker","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"backer_address","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"project_address","type":"address"},{"name":"funding","type":"uint256"}],"name":"fundProject","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"getProjectsCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getProject","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"}];

const project_owner_bytes = '0x6060604052341561000c57fe5b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6111eb8061005f6000396000f30060606040523615610081576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680636db8c06f1461008357806391754a5d146100b9578063ac9983071461011c578063cc6afdad1461012e578063e4a8f18b14610164578063f0f3f2c81461018a578063f501c22a146101ea575bfe5b341561008b57fe5b6100b7600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061023c565b005b34156100c157fe5b61011a600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091908035906020019091905050610424565b005b341561012457fe5b61012c610591565b005b341561013657fe5b610162600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061062c565b005b341561016c57fe5b610174610802565b6040518082815260200191505060405180910390f35b341561019257fe5b6101a86004808035906020019091905050610810565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101f257fe5b6101fa610925565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60006000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561029d5760006000fd5b600091505b60018054905082101561041d578273ffffffffffffffffffffffffffffffffffffffff166001838154811015156102d557fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561040f5760018281548110151561032d57fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff16632941b7256040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050600060405180830381600087803b15156103bf57fe5b6102c65a03f115156103cd57fe5b5050506001828154811015156103df57fe5b906000526020600020900160005b6101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5b81806001019250506102a2565b5b5b505050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104835760006000fd5b828261048d61094b565b80806020018381526020018281038252848181518152602001915080519060200190808383600083146104df575b8051825260208311156104df576020820191506020810190506020830392506104bb565b505050905090810190601f16801561050b5780820380516001836020036101000a031916815260200191505b509350505050604051809103906000f080151561052457fe5b90506001805480600101828161053a919061095b565b916000526020600020900160005b83909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b5b505050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105ee5760006000fd5b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b60006000600091505b6001805490508210156107fc578273ffffffffffffffffffffffffffffffffffffffff1660018381548110151561066857fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156107ee576001828154811015156106c057fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff16632916cc486000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b151561075b57fe5b6102c65a03f1151561076957fe5b50505060405180519050156107ed578073ffffffffffffffffffffffffffffffffffffffff166330b9af986040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050600060405180830381600087803b15156107db57fe5b6102c65a03f115156107e957fe5b5050505b5b5b8180600101925050610635565b5b505050565b600060018054905090505b90565b6000600060018381548110151561082357fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff16634136aa356000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156108be57fe5b6102c65a03f115156108cc57fe5b505050604051805190501561091e576001838154811015156108ea57fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915061091f565b5b50919050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b604051610813806109ad83390190565b815481835581811511610982578183600052602060002091820191016109819190610987565b5b505050565b6109a991905b808211156109a557600081600090555060010161098d565b5090565b9056006060604052341561000c57fe5b604051610813380380610813833981016040528080518201919060200180519060200190919050505b816003908051906020019061004b9291906100c7565b5033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806000819055506000601e8190555060006001819055506001601f60006101000a81548160ff0219169083151502179055505b505061016c565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061010857805160ff1916838001178555610136565b82800160010185558215610136579182015b8281111561013557825182559160200191906001019061011a565b5b5090506101439190610147565b5090565b61016991905b8082111561016557600081600090555060010161014d565b5090565b90565b6106988061017b6000396000f30060606040523615610097576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806302d05d3f146100995780632916cc48146100eb5780632941b7251461011557806330b9af98146101275780634136aa35146101395780636c563abe14610163578063a31b95291461017b578063b85090f3146101a1578063f020cd19146101c7575bfe5b34156100a157fe5b6100a9610260565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100f357fe5b6100fb610286565b604051808215151515815260200191505060405180910390f35b341561011d57fe5b610125610296565b005b341561012f57fe5b610137610400565b005b341561014157fe5b6101496104c6565b604051808215151515815260200191505060405180910390f35b61017960048080359060200190919050506104de565b005b341561018357fe5b61018b610599565b6040518082815260200191505060405180910390f35b34156101a957fe5b6101b16105a4565b6040518082815260200191505060405180910390f35b34156101cf57fe5b6101d76105af565b6040518080602001828103825283818151815260200191508051906020019080838360008314610226575b80518252602083111561022657602082019150602081019050602083039250610202565b505050905090810190601f1680156102525780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600054600154101590505b90565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102f55760006000fd5b600090505b601e548110156103a65760206000601e54815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60206000601e548152602001908152602001600020600101549081150290604051809050600060405180830381858888f1935050505015156103985760006000fd5b5b80806001019150506102fa565b6000601f60006101000a81548160ff021916908315150217905550600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561045d5760006000fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6001549081150290604051809050600060405180830381858888f193505050505060006001819055505b5b565b6000601f60009054906101000a900460ff1690505b90565b6040604051908101604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018281525060206000601e54815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155905050601e60008154809291906001019190505550806001600082825401925050819055505b50565b600060015490505b90565b600060005490505b90565b6105b7610658565b60038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561064d5780601f106106225761010080835404028352916020019161064d565b820191906000526020600020905b81548152906001019060200180831161063057829003601f168201915b505050505090505b90565b6020604051908101604052806000815250905600a165627a7a72305820be29a274d40e2a4e51fcbd4145e7795c12848e6b30ef4df9096b201714626edd0029a165627a7a72305820f78a526b9628c048a376cb3de27c10de61b145bb7074e22999d7023cc3df8a0e0029';
const backer_bytes = '0x6060604052341561000c57fe5b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b610ff78061005f6000396000f30060606040523615610081576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680636db8c06f1461008357806391754a5d146100b9578063ac9983071461011c578063cc6afdad1461012e578063e4a8f18b14610164578063f0f3f2c81461018a578063f501c22a146101ea575bfe5b341561008b57fe5b6100b7600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061023c565b005b34156100c157fe5b61011a600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091908035906020019091905050610388565b005b341561012457fe5b61012c6104ef565b005b341561013657fe5b610162600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061058a565b005b341561016c57fe5b610174610760565b6040518082815260200191505060405180910390f35b341561019257fe5b6101a8600480803590602001909190505061076e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101f257fe5b6101fa6107b4565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60006000600091505b600180549050821015610382578273ffffffffffffffffffffffffffffffffffffffff1660018381548110151561027857fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610374576001828154811015156102d057fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff16632941b7256040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050600060405180830381600087803b151561036257fe5b6102c65a03f1151561037057fe5b5050505b5b8180600101925050610245565b5b505050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156103e55760006000fd5b600180548060010182816103f991906107da565b916000526020600020900160005b8484610411610806565b8080602001838152602001828103825284818151815260200191508051906020019080838360008314610463575b8051825260208311156104635760208201915060208101905060208303925061043f565b505050905090810190601f16801561048f5780820380516001836020036101000a031916815260200191505b509350505050604051809103906000f08015156104a857fe5b909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b5b5050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561054c5760006000fd5b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b60006000600091505b60018054905082101561075a578273ffffffffffffffffffffffffffffffffffffffff166001838154811015156105c657fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561074c5760018281548110151561061e57fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff16632916cc486000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b15156106b957fe5b6102c65a03f115156106c757fe5b505050604051805190501561074b578073ffffffffffffffffffffffffffffffffffffffff166330b9af986040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050600060405180830381600087803b151561073957fe5b6102c65a03f1151561074757fe5b5050505b5b5b8180600101925050610593565b5b505050565b600060018054905090505b90565b600060018281548110151561077f57fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b815481835581811511610801578183600052602060002091820191016108009190610816565b5b505050565b6040516107908061083c83390190565b61083891905b8082111561083457600081600090555060010161081c565b5090565b9056006060604052341561000c57fe5b604051610790380380610790833981016040528080518201919060200180519060200190919050505b816003908051906020019061004b9291906100ac565b5033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806000819055506000601e8190555060006001819055505b5050610151565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100ed57805160ff191683800117855561011b565b8280016001018555821561011b579182015b8281111561011a5782518255916020019190600101906100ff565b5b509050610128919061012c565b5090565b61014e91905b8082111561014a576000816000905550600101610132565b5090565b90565b610630806101606000396000f3006060604052361561008c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806302d05d3f1461008e5780632916cc48146100e05780632941b7251461010a57806330b9af981461011c5780636c563abe1461012e578063a31b952914610146578063b85090f31461016c578063f020cd1914610192575bfe5b341561009657fe5b61009e61022b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100e857fe5b6100f0610251565b604051808215151515815260200191505060405180910390f35b341561011257fe5b61011a610261565b005b341561012457fe5b61012c6103b0565b005b6101446004808035906020019091905050610476565b005b341561014e57fe5b610156610531565b6040518082815260200191505060405180910390f35b341561017457fe5b61017c61053c565b6040518082815260200191505060405180910390f35b341561019a57fe5b6101a2610547565b60405180806020018281038252838181518152602001915080519060200190808383600083146101f1575b8051825260208311156101f1576020820191506020810190506020830392506101cd565b505050905090810190601f16801561021d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600054600154101590505b90565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102c05760006000fd5b600090505b601e5481101561037157601f6000601e54815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc601f6000601e548152602001908152602001600020600101549081150290604051809050600060405180830381858888f1935050505015156103635760006000fd5b5b80806001019150506102c5565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561040d5760006000fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6001549081150290604051809050600060405180830381858888f193505050505060006001819055505b5b565b6040604051908101604052803373ffffffffffffffffffffffffffffffffffffffff16815260200182815250601f6000601e54815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155905050601e60008154809291906001019190505550806001600082825401925050819055505b50565b600060015490505b90565b600060005490505b90565b61054f6105f0565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105e55780601f106105ba576101008083540402835291602001916105e5565b820191906000526020600020905b8154815290600101906020018083116105c857829003601f168201915b505050505090505b90565b6020604051908101604052806000815250905600a165627a7a723058201c130944fa7220a1bf3e1facee1f58a1a3733f97228cd0a4c159f5a24f8cf95a0029a165627a7a723058201dffa18411ab81f98135fbbb8d8570800b2cd65365f8f3cf554bf68160dc04160029';

// get address from postgres
let getAddresses = (req, res, next) => {
  var address = req.params.address;
  const body = {
    'account_address': address
  };
  return Account.findOne({ where: body }).then(data => {
    if(data == null) {
      return Account.create(body)
        .then(newAccount => {
          console.log(`New account ${address} has been created.`);
          return res.json(newAccount);
        });
    } else {
      console.log('Account with ' + address + ' found');
      return res.json(data);
    }
  });
};

router.get('/:address', getAddresses);

/**
 * 
 * PROJECT OWNER
 * 
 */
// get project owner data from smart contract
let getProjectOwner = (req, res, next) => {
  var address = req.params.address;
  const body = {
    'account_address': address
  };
  return Account.findOne({ where: body }).then(data => {
    if(data.project_owner_address == null) {
      var project_owner_sol_project_ownerContract = web3.eth.contract(project_owner_abi);
      var project_owner_sol_project_owner = project_owner_sol_project_ownerContract.new(
      {
        from: address, 
        data: project_owner_bytes, 
        gas: '4700000'
      }, function (e, contract){
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
          console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
          data.updateAttributes({project_owner_address : contract.address});
          return res.json({});
        }
      });
    } else {
      var jsonArr = [];
      var Project_owner_contract = web3.eth.contract(project_owner_abi);
      var projectOwnerContract = Project_owner_contract.at(data.project_owner_address);

      console.log("Count: " + parseInt(projectOwnerContract.getProjectsCount.call()));
      for (var i = 0; i < projectOwnerContract.getProjectsCount.call(); i++) {
        console.log("1");
        var Project_contract = web3.eth.contract(project_abi);
        console.log("2");
        var project_address = projectOwnerContract.getProject(i);
        console.log("3");
        var projectContract = Project_contract.at(project_address);
        console.log("4:" + projectContract);
        console.log("5:" + projectContract.isAlive);
        if(projectContract.isAlive.call()) {
          console.log("7:" + projectContract.isAlive.call());
          var percent = parseInt(web3.fromWei(web3.eth.getBalance(project_address).toNumber(),"ether")) / parseInt(projectContract.getFundingGoal.call());
          console.log("8");
          jsonArr.push({
            project_address: project_address,
            project_title: projectContract.getProjectTitle.call(),
            project_funding_goal: projectContract.getFundingGoal.call(),
            project_goal_percent: percent
          });
        }
      }
      console.log('Account with project owner address ' + data.project_owner_address + ' found');
      return res.json(jsonArr);
    }
  });
};

router.get('/:address/project_owner', getProjectOwner);

let createProject = (req, res, next) => {
  var address = req.params.address;
  const body = {
    'account_address': address
  };
  return Account.findOne({ where: body }).then(data => {
    if(data.project_owner_address != null) {
      var Project_owner_contract = web3.eth.contract(project_owner_abi);
      var projectOwnerContract = Project_owner_contract.at(data.project_owner_address);
      var project_title = req.body.project_title;
      var project_funding_goal = req.body.project_funding_goal;
      projectOwnerContract.createProject(project_title, project_funding_goal, {from: address, gas: 4700000}, (err, result) => {
        if(err)
          return res.json({"success": false});
        else if(result)
          return res.json({"success": true});
      });
    }
  });
};

router.post('/:address/project_owner', createProject);

let withdrawProjectFunding = (req, res, next) => {
  var address = req.params.address;
  const body = {
    'account_address': address
  };
  return Account.findOne({ where: body }).then(data => {
    if(data.project_owner_address != null) {
      var Project_owner_contract = web3.eth.contract(project_owner_abi);
      var projectOwnerContract = Project_owner_contract.at(data.project_owner_address);
      var project_address = req.body.project_address;

      projectOwnerContract.withDrawFundingFromProject(project_address, {from: address, gas: 4700000}, (err, result) => {
        if(err)
          return res.json({"success": false});
        else if(result)
          return res.json({"success": true});
      });
    }
  });
};

router.put('/:address/project_owner', withdrawProjectFunding);

let cancelProject = (req, res, next) => {
  var address = req.params.address;
  const body = {
    'account_address': address
  };
  return Account.findOne({ where: body }).then(data => {
    if(data.project_owner_address != null) {
      var Project_owner_contract = web3.eth.contract(project_owner_abi);
      var projectOwnerContract = Project_owner_contract.at(data.project_owner_address);
      var project_address = req.body.project_address;
      projectOwnerContract.cancelProject(project_address, {from: address, gas: 4700000}, (err, result) => {
        if(err)
          return res.json({"success": false});
        else if(result)
          return res.json({"success": true});
      });
    }
  });
};

router.delete('/:address/project_owner', cancelProject);

/**
 * 
 * BACKER
 * 
 */
// get backer data from smart contract
let getBacker = (req, res, next) => {
  var address = req.params.address;
  const body = {
    'account_address': address
  };
  return Account.findOne({ where: body }).then(data => {
    if(data.backer_address == null) {
      var backer_sol_project_ownerContract = web3.eth.contract(backer_abi);
      var backer_sol_project_owner = backer_sol_project_ownerContract.new(
      {
        from: address, 
        data: backer_bytes, 
        gas: '4700000'
      }, function (e, contract){
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
          console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
          data.updateAttributes({backer_address : contract.address});
          return res.json({});
        }
      });
    } else {
      // TODO: Make beautiful json of project status (project address (?), project title, project funding status (current funding, funding goal, funding percentage))
      var jsonArr = [];
      var Backer_contract = web3.eth.contract(backer_abi);
      var backerContract = Backer_contract.at(data.backer_address);

      for (var i = 0; i < backerContract.getProjectsCount.call(); i++) {
        var Project_contract = web3.eth.contract(project_abi);
        var project_address = projectOwnerContract.getProject(i);
        var projectContract = Project_contract.at(project_address);
        var percent = parseInt(web3.fromWei(web3.eth.getBalance(project_address).toNumber(),"ether")) / parseInt(projectContract.getFundingGoal.call())

        jsonArr.push({
          project_address: project_address,
          project_title: projectContract.getProjectTitle.call(),
          project_funding_goal: projectContract.getFundingGoal.call(),
          project_goal_percent: percent
        });
      }
      console.log('Account with backer address ' + data.backer_address + ' found');
      return res.json(jsonArr);
    }
  });
};

router.get('/:address/backer', getBacker);

let investProject = (req, res, next) => {
  var address = req.params.address;
  const body = {
    'account_address': address
  };
  return Account.findOne({ where: body }).then(data => {
    if(data.backer_address != null) {
      var Backer_contract = web3.eth.contract(backer_abi);
      var backerContract = Backer_contract.at(data.backer_address);
      var project_address = req.body.project_address;
      var funding = req.body.funding;
      backerContract.fundProject.sendTransaction(project_address, funding, {from: address, gas: 4700000, value: web3.toWei(funding,'ether')}, (err, result) => {
        if(err)
          return res.json({"success": false});
        else if(result)
          return res.json({"success": true});
      });
    }
  });
};

router.put('/:address/backer', investProject);

module.exports = router;
