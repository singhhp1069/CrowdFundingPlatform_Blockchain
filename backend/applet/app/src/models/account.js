const Sequelize = require('sequelize');

module.exports = global.db.define('accounts', {
  account_address: {
    type: Sequelize.STRING
  },
  project_owner_address: {
    type: Sequelize.STRING
  },
  backer_address: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});
