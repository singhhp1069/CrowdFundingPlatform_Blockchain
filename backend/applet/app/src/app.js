'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const Sequelize = require('sequelize');
const Web3 = require('web3');
const cors = require("cors");

// Application config
const LOCAL_APP_PORT = 8080;
const PUBLIC_APP_PORT = process.env.PUBLIC_APP_PORT || LOCAL_APP_PORT;
const PG_HOST = process.env.PG_HOST;
const PG_PORT = process.env.PG_PORT;
const PG_USER = process.env.PG_USER;
const PG_DATABASE = process.env.PG_DATABASE || "";
const ETHEREUM_CLIENT_IP = process.env.ETHEREUM_CLIENT_IP || "http://192.168.178.53";
const ETHEREUM_CLIENT_PORT = process.env.ETHEREUM_CLIENT_PORT || "8545";
const ETHEREUM_CLIENT =  ETHEREUM_CLIENT_IP + ':' + ETHEREUM_CLIENT_PORT;

// Sanity check for debugging
console.log("local app port:", LOCAL_APP_PORT);
console.log("public app port:", PUBLIC_APP_PORT);
console.log("db host:", PG_HOST);
console.log("db port:", PG_PORT);
console.log("ethereum client: " + ETHEREUM_CLIENT);

// Set up a global Postgresql DB connection pool
global.db = new Sequelize(PG_DATABASE, PG_USER, "", {
  host: PG_HOST,
  port: PG_PORT,
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

console.log('Checking database connection');
global.db.authenticate().then(function(err){
    console.log('Connection to database could be established successfully.');
}).catch(function(err){
    console.error('Unable to connect to the database:', err);
});


// Set up global RPC connection
global.web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_CLIENT));
if (global.web3.isConnected()){
  console.log('Connected to ethereum RPC client ...');
}else{
  console.log('Not connected to ethereum RPC client ...');
}

// Express middleware
app.use(bodyParser.json()); // For parsing application/json

// Import controllers (routes)
const account = require('./controllers/account');
const project_owner = require('./controllers/project_owner');
const backer = require('./controllers/backer');

// Set up express routes
app.use(cors());
app.use('/', account);
app.use('/project_owner', project_owner);
app.use('/backer', backer);

app.listen(LOCAL_APP_PORT, function() {

    var accounts = global.web3.eth.accounts;
    console.log('Available ethereum accounts: ' + JSON.stringify(accounts));
    const Account = require('./models/account');
    Account.sync({force: false}).then(function(){
         console.log('Table for accounts created ... (Old table is used if it has already existed.)');
        var body = {'account_address': ''};
        for (var i = 0; i < accounts.length; i++){
             var address = accounts[i];
             body = {'account_address': address};
             Account.findOrCreate({
                where: body, defaults: body});
         }
    });
});