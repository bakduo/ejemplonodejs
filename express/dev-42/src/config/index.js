'use strict'

const configLoad = require('config');

const app = configLoad.get('app');

const args = require('yargs').argv

//Patch ejer 42
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
  path: path.resolve('./', process.env.NODE_ENV + '.env'),
});
//fin patch

const DBCustom = require('../datasource/dbcustom');
const SessionCustom = require('../session/sessioncustom');
const oneMinute = 1000 * 60;
const childProcess = require('child_process')
const stream = require('stream')

const supportPassport=(`${app.support_login}`).split(",")

//https://getpino.io/#/docs/help?id=reopening

const logThrough = new stream.PassThrough()
// Environment variables

const cwd = process.cwd();
const { env } = process;
const logPath = cwd + "/logs";

const logger = require('pino')({
  name: 'app-fake', 
  level: "info"
},logThrough);

const child = childProcess.spawn(process.execPath, [
  require.resolve('pino-tee'),
  'warn', `${logPath}/log.warn.log`,
  'error', `${logPath}/log.error.log`,
  'info', `${logPath}/log.info.log`
], { cwd, env })

logThrough.pipe(child.stdin)

const config = {
    server: {
      port: app.port || 3000,
      dbtype: app.db1.type,
      dbtypesession: app.db2.type,
    },
    default:app.defaultpersistence,
    persistence:app.persistence,
    db: {},
    dbsession: {},
    session:{},
    timesession:(oneMinute*10),
    passportLogin: supportPassport,
    facebookid: `${app.facebookid}` || process.env.FACEBOOK_CLIENTID,
    facebooksecret:`${app.facebooksecret}` || process.env.FACEBOOK_CLIENTS,
    mode:"",
    logger: logger,
    emails: app.emails_providers,
    email_to: `${app.email_admin}`,
    secret: `${app.secret}`,
    sms: app.twilio,
    rebuild:{}
};

config.session = new SessionCustom({
  dbtype: config.server.dbtypesession,
  host: `${app.db2.host}`,
  port: `${app.db2.port}`,
  url: `${app.db2.connector}://${app.db2.user}:${app.db2.passwd}@${app.db2.host}:${app.db2.port}/${app.db2.dbname}`,
  secure: `${app.db2.secure}`,
  logger: config.logger,
});

// if (process.argv.length >= 3 || config.default !==""){
//   config.logger.info(process.argv);
//   config.logger.info(config.default);
//   config.server.dbtype = process.argv[2] || config.default;
// }

//args.port don't work
//args.dbtype don't work

if (args._[0] && (typeof args._[0] == 'number')){
  config.server.port = args._[0] || 8080;
}else{
  config.server.port = 8080
}

if (args._[1] && (typeof (args._[1]) == 'string')){
  config.server.dbtype = args._[1] || config.default;
}else{
  config.server.dbtype =config.default;
}

config.rebuild = () =>{
  //Segun que persistencia eligo se genera un store DB para utilizar
  switch (config.server.dbtype) {
    case "mongo":
      config.db = new DBCustom({
        dbtype: config.server.dbtype,
        persistence:config.persistence,
        url: `${process.env.DBTYPE_DB_CONNECTOR}://${process.env.DBTYPE_DB_USER}:${process.env.DBTYPE_DB_PASSWD}@${process.env.DBTYPE_DB_HOST}:${process.env.DBTYPE_DB_PORT}/${process.env.DBTYPE_DB_DBNAME}` 
        || `${app.db1.connector}://${app.db1.user}:${app.db1.passwd}@${app.db1.host}:${app.db1.port}/${app.db1.dbname}`,
        dbname: process.env.DBTYPE_DB_DBNAME || `${app.db1.dbname}`,
        secure: process.env.SECURE || `${app.db1.secure}`,
        schema: JSON.parse(process.env.SCHEMA_NOSQL) || app.db1.schema,
        logger: config.logger,
      })
      break;
    case "sqlite":
      config.db = new DBCustom({
        dbtype: config.server.dbtype,
        persistence:config.persistence,
        logger: config.logger,
      })
      break;
    case "memory":
      config.db = new DBCustom({
        dbtype: config.server.dbtype,
        persistence:config.persistence,
        logger: config.logger,
      })
    break;
  }
}

config.rebuild();

module.exports = config;