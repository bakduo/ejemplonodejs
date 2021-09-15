const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve('./', process.env.NODE_ENV + '.env'),
});

const DBCustom = require('../datasource/dbcustom');
const SessionCustom = require('../session/sessioncustom');
const oneMinute = 1000 * 60;
const childProcess = require('child_process')
const stream = require('stream')

const supportPassport=(process.env.SUPPORT_LOGIN).split(",")

//https://getpino.io/#/docs/help?id=reopening

const logThrough = new stream.PassThrough()
// Environment variables

const cwd = process.cwd();
const { env } = process;
const logPath = cwd + "/logs";

const logger = require('pino')({
  name: 'app-fake', 
  // set the own levels
  //customLevels: levels,
  // use only the custom levels
  //useOnlyCustomLevels: true,
  level: "info"
},logThrough);

const child = childProcess.spawn(process.execPath, [
  require.resolve('pino-tee'),
  'warn', `${logPath}/log.warn.log`,
  'error', `${logPath}/log.error.log`,
  'info', `${logPath}/log.info.log`
], { cwd, env })

logThrough.pipe(child.stdin)

const email1 = {
   user: process.env.EMAIL1_USER,
   passwd: process.env.EMAIL1_PASSWD,
   server:process.env.EMAIL1_SERVER,
   port: process.env.EMAIL1_PORT || 587,
}

const email2 = {
  user: process.env.EMAIL2_USER,
  passwd: process.env.EMAIL2_PASSWD,
  server: process.env.EMAIL2_SERVER,
  port: process.env.EMAIL2_PORT|| 587,
}

const twilio = {
  sid: process.env.TWILIO_SID || "",
  token: process.env.TWILIO_TOKEN || "",
  fromtel: process.env.TWILIO_FROM_TEL || ""
}

const config = {
    server: {
      port: process.env.PORT || 3000,
      dbtype: process.env.DBTYPE || 'mongo',
      sessiontype:process.env.DBSESSIONTYPE || 'mongo'
    },
    db: {},
    dbsession: {},
    session:{},
    timesession:(oneMinute*10),
    passportLogin: supportPassport,
    facebookid:"" || process.env.FACEBOOK_CLIENTID,
    facebooksecret:"" || process.env.FACEBOOK_CLIENTS,
    mode:"",
    logger: logger,
    emails:[email1,email2],
    email_from:process.env.EMAIL_FROM,
    sms: twilio
  };

if (process.argv.length >= 5){
  config.logger.info(process.argv);
  config.server.port = process.argv[2];
  config.facebookid = process.argv[3];
  config.facebooksecret = process.argv[4];
  config.mode = process.argv[5] || "FORK";
}

//Remember use Secret for this.

config.db = new DBCustom({
  dbtype: config.server.dbtype,
  url:`${process.env.DBTYPE_DB_CONNECTOR}://${process.env.DBTYPE_DB_USER}:${process.env.DBTYPE_DB_PASSWD}@${process.env.DBTYPE_DB_HOST}:${process.env.DBTYPE_DB_PORT}/${process.env.DBTYPE_DB_DBNAME}`,
  dbname:`${process.env.DBTYPE_DB_DBNAME}`,
  secure:`${process.env.SECURE}`,
  logger: config.logger,
});

config.dbsession = new DBCustom({
  dbtype: config.server.dbtype,
  url:`${process.env.DBTYPE_DB_SESSION_CONNECTOR}://${process.env.DBTYPE_DB_SESSION_USER}:${process.env.DBTYPE_DB_SESSION_PASSWD}@${process.env.DBTYPE_DB_SESSION_HOST}:${process.env.DBTYPE_DB_SESSION_PORT}/${process.env.DBTYPE_DB_SESSION_DBNAME}`,
  dbname:`${process.env.DBTYPE_DB_SESSION_DBNAME}`,
  secure:`${process.env.SECURE}`,
  logger: config.logger,
});

config.session = new SessionCustom({
  dbtype: config.server.sessiontype,
  host:`${process.env.DBTYPE_DB_SESSION_HOST}`,
  port:`${process.env.DBTYPE_DB_SESSION_PORT}`,
  url:`${process.env.DBTYPE_DB_SESSION_CONNECTOR}://${process.env.DBTYPE_DB_SESSION_USER}:${process.env.DBTYPE_DB_SESSION_PASSWD}@${process.env.DBTYPE_DB_SESSION_HOST}:${process.env.DBTYPE_DB_SESSION_PORT}/${process.env.DBTYPE_DB_SESSION_DBNAME}`,
  secure:`${process.env.SECURE}`,
  logger: config.logger,
});

module.exports = config;