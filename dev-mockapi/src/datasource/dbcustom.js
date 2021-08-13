const WMongo = require('../util/wmongo');

class DBCustom {
  constructor(config) {
    this.store = null;
    this.type = config;
  }

  getStore() {
    switch (this.type.dbtype) {
      case 'mongo':
        this.store = new WMongo();
        break;

      default:
        break;
    }
    return this.store;
  }
}

module.exports = DBCustom;
