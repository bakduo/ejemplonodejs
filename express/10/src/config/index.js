const dotenv = require('dotenv');

const path = require('path');

dotenv.config({
  path: path.resolve('./', process.env.NODE_ENV + '.env'),
});

const DBCustom = require('../datasource/dbcustom');
const SessionCustom = require('../session/sessioncustom');

const oneMinute = 1000 * 60;

const config = {
    server: {
      port: process.env.PORT || 3000,
      dbtype: process.env.DBTYPE || 'mongo',
      sessiontype:process.env.DBSESSIONTYPE || 'mongo'
    },
    db: {},
    dbsession: {},
    session:{},
    timesession:(oneMinute*10)
  };


  //Remember use Secret for this.

config.db = new DBCustom({
  dbtype: config.server.dbtype,
  url:`${process.env.DBTYPE_DB_CONNECTOR}://${process.env.DBTYPE_DB_USER}:${process.env.DBTYPE_DB_PASSWD}@${process.env.DBTYPE_DB_HOST}:${process.env.DBTYPE_DB_PORT}/${process.env.DBTYPE_DB_DBNAME}`,
  dbname:`${process.env.DBTYPE_DB_DBNAME}`,
  secure:`${process.env.SECURE}`
});

config.dbsession = new DBCustom({
  dbtype: config.server.dbtype,
  url:`${process.env.DBTYPE_DB_SESSION_CONNECTOR}://${process.env.DBTYPE_DB_SESSION_USER}:${process.env.DBTYPE_DB_SESSION_PASSWD}@${process.env.DBTYPE_DB_SESSION_HOST}:${process.env.DBTYPE_DB_SESSION_PORT}/${process.env.DBTYPE_DB_SESSION_DBNAME}`,
  dbname:`${process.env.DBTYPE_DB_SESSION_DBNAME}`,
  secure:`${process.env.SECURE}`
});

config.session = new SessionCustom({
  dbtype: config.server.sessiontype,
  host:`${process.env.DBTYPE_DB_SESSION_HOST}`,
  port:`${process.env.DBTYPE_DB_SESSION_PORT}`,
  url:`${process.env.DBTYPE_DB_SESSION_CONNECTOR}://${process.env.DBTYPE_DB_SESSION_USER}:${process.env.DBTYPE_DB_SESSION_PASSWD}@${process.env.DBTYPE_DB_SESSION_HOST}:${process.env.DBTYPE_DB_SESSION_PORT}/${process.env.DBTYPE_DB_SESSION_DBNAME}`,
  secure:`${process.env.SECURE}`
});


module.exports = config;