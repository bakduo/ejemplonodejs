const configLoad = require('config');
const app = configLoad.get('app');

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

//if (process.argv.length >= 5){
//   config.logger.info(process.argv);
//   config.server.port = process.argv[2];
//   config.facebookid = process.argv[3];
//   config.facebooksecret = process.argv[4];
//   config.mode = process.argv[5] || "FORK";
//}



config.session = new SessionCustom({
  dbtype: config.server.dbtypesession,
  host: `${app.db2.host}`,
  port: `${app.db2.port}`,
  url: `${app.db2.connector}://${app.db2.user}:${app.db2.passwd}@${app.db2.host}:${app.db2.port}/${app.db2.dbname}`,
  secure: `${app.db2.secure}`,
  logger: config.logger,
});

if (process.argv.length >= 3 || config.default !==""){
  config.logger.info(process.argv);
  config.logger.info(config.default);
  config.server.dbtype = process.argv[2] || config.default;
}

config.rebuild = () =>{

 
  //Segun que persistencia eligo se genera un store DB para utilizar

  switch (config.server.dbtype) {
    case "mongo":
      config.db = new DBCustom({
        dbtype: config.server.dbtype,
        persistence:config.persistence,
        url: `${app.db1.connector}://${app.db1.user}:${app.db1.passwd}@${app.db1.host}:${app.db1.port}/${app.db1.dbname}`,
        dbname: `${app.db1.dbname}`,
        secure: `${app.db1.secure}`,
        schema: app.db1.schema,
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