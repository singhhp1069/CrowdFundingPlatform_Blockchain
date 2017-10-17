const express = require('express');
const DAO = require('../dao/postgresql');

// helper functions
let handleErr = (err, res) => {
  console.error(err);     
  res.status(500).send(err);  
};

let handleRes = (data, res, statusCode) => {
  s = statusCode || 200;
  res.status(s).send(data);
};

module.exports = class Controller {
  constructor(Model) {
    this.Model = Model;
    this.dao = new DAO(Model);
  }

  withCreate() {
    this.create = (req, res, next) => {
      let model = req.body;
      this.dao.create(model).then(data => handleRes(data, res)).catch(err => handleErr(err, res));
    }
    return this;
  }

  withGet(id) {
    this.get = (req, res, next) => {
      let query = {
        'id': req.params.id
      };
      this.dao.get(query).then(data => handleRes(data, res)).catch(err => handleErr(err, res));
    }
    return this;
  }

  withGetAll() {
    this.getAll = (req, res, next) => {
      this.dao.getAll().then(data => handleRes({
        "data": data
      }, res)).catch(err => handleErr(err, res));
    }
    return this;
  }

  withUpdate() {
    this.update = (req, res, next) => {
      let query = {
        'id': req.body.id
      };
      this.dao.update(query, req.body).then(data => handleRes(data, res, 204)).catch(err => handleErr(err, res));
    };
    return this;
  }

  withRemove() {
    this.remove = (req, res, next) => {
      let query = req.body;
      this.dao.remove(query).then(data => handleRes({}, res, 204)).catch(err => handleErr(err, res));
    }
    return this;
  }

  router() {
    const router = express.Router();
    if (this.create) {
      router.post('/', this.create.bind(this));
    }
    if (this.get) {
      //router.get('/:id', this.get.bind(this));
    }
    if (this.getAll) {
      router.get('/', this.getAll.bind(this));
    }
    if (this.update) {
      router.put('/', this.update.bind(this));
    }
    if (this.remove) {
      router.delete('/', this.remove.bind(this));
    }
    return router;
  }
}
