const mongoose = require('mongoose');

class WMongo {
  static instancia;

  constructor() {
    this.mongoClient = mongoose;

    //please remember use secret for this. or config file encrypt
    this.url = `mongodb://${process.env.DBTYPE_DB_USER}:${process.env.DBTYPE_DB_PASSWD}@${process.env.DBTYPE_DB_HOST}:${process.env.DBTYPE_DB_PORT}/${process.env.DBTYPE_DB_DBNAME}`;
    this.dbname = `${process.env.DBTYPE_DB_DBNAME}`;
  }

  async connect() {
    try {
      console.log(this.url);
      await this.mongoClient.connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.mongoClient.connection.on('open', () => {
        
        console.log('Connected mongo started');
      });

    } catch (error) {
      throw Error(error);
    }
  }

  async createCollection(name) {
    try {
      const db = this.mongoClient.connection.db.db(this.dbname);
      await db.createCollection(name);
    } catch (error) {
      throw Error(error);
    }
  }
}

module.exports = WMongo;
