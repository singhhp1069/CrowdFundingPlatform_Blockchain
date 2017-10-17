const express = require('express');
const router = express.Router();
const Account = require('../models/account');

const index = (req, res, next) => {
  // show all accounts
  console.log(global.web3.isConnected());
  var json = JSON.stringify(global.web3.eth.accounts);
  res.status(200).send(json); 
};

// Routes
router.get('/', index);

// Get address information from Postgres
let getAddresses = (req, res, next) => {
    var address = req.params.address;
    const body = {
        'account_address': address
    };
    return Account.findOne({ where: body }).then(data => {
            if(!data) {
        return Account.create(body)
                .then(newAccount => {
                console.log(`New account for address ${address} has been created.`);
        return res.json(newAccount);
    });
    } else {
        console.log('Account with ' + address + ' is found.');
        return res.json(data);
    }
});
};

router.get('/:address', getAddresses);

module.exports = router;
