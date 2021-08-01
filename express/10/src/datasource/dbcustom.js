const WMongo = require('./storage/wmongo');

class DBCustom {
  constructor(config) {
    this.store = null;
    this.type = config;
  }

  getStore() {
    switch (this.type.dbtype) {
      case 'mongo':
        this.store = new WMongo(this.type.url,this.type.dbname,this.type.secure,`${process.env.SCHEMA_NOSQL}`);
        break;

      default:
        break;
    }
    return this.store;
  }
}

module.exports = DBCustom;
