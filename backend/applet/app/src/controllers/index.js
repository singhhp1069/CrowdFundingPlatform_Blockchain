const express = require('express');
const router = express.Router();
// import web3 API
var web3 = require('web3');
// link with local ethereum node
web3 = new web3(new web3.providers.HttpProvider("http://192.168.178.53:8545"));

const index = (req, res, next) => {
  // show all accounts
  console.log(web3.isConnected());
  var json = JSON.stringify(web3.eth.accounts);
  res.status(200).send(json); 
};

// Routes
router.get('/', index);

module.exports = router;
