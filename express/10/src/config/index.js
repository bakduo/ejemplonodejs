const dotenv = require('dotenv');

const path = require('path');

//schema DB
// db.createCollection("productos", 
//     { validator: { 
//         $jsonSchema: { 
//             bsonType: "object", required: ["name", "price","thumbail"],
//             properties: { 
//                 name: { bsonType: "string", description: "must be a string and is required" },
//                 thumbail: { bsonType: "string", description: "must be a string and is required" },  
//                 price: { bsonType: "number", description: "must be a number" }, 
//             },
//            }
//         } 
//        },
// { timestamps: true }
// );

// db.createCollection("mensajes", 
//     { validator: { 
//         $jsonSchema: { 
//             bsonType: "object", required: ["msg", "user","tiempo"],
//             properties: { 
//                 msg: { bsonType: "string", description: "must be a string and is required" },
//                 user: { bsonType: "string", description: "must be a string and is required" },  
//                 tiempo: { bsonType: "string", description: "must be a string and is required" }, 
//             },
//            }
//         } 
//        },
// { timestamps: true }
// );

dotenv.config({
  path: path.resolve('./', process.env.NODE_ENV + '.env'),
});

const DBCustom = require('../datasource/dbcustom');
const SessionCustom = require('../session/sessioncustom');

const config = {
    server: {
      port: process.env.PORT || 3000,
      dbtype: process.env.DBTYPE || 'mongo',
      sessiontype:process.env.DBSESSIONTYPE || 'file'
    },
    db: {},
    dbsession: {},
    session:{}
  };

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