const dotenv = require('dotenv');

const path = require('path');

//schema DB
// db.createCollection("productos", 
//     { validator: { 
//         $jsonSchema: { 
//             bsonType: "object", required: ["title", "price","thumbail"],
//             properties: { 
//                 title: { bsonType: "string", description: "must be a string and is required" },
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

const config = {
    server: {
      port: process.env.PORT || 3000,
      dbtype: process.env.DBTYPE || 'mongo'
    },
    db: {},
  };

config.db = new DBCustom({
    dbtype: config.server.dbtype
  });
const conectarMongo = async () => {
return config.db.getStore().connect();
};
conectarMongo();

module.exports = config;