module.exports = class DAO {
  constructor(Model) {
    this.Model = Model;
  }

  create(model) {
    return this.Model.create(model);
  }

  get(query) {
    return this.Model.findOne({
      where: query
    });
  }

  getAll() {
    return this.Model.findAll();
  }

  update(query, body) {
    return this.Model.update(body, {
      where: query
    });
  };

  remove(query) {
    return this.Model.destroy({
      where: query
    });
  }
}
