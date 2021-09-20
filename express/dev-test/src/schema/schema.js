var { buildSchema } = require('graphql');

const  Schema = buildSchema(`
  type Query {
    productos: [Producto],
    producto(id:String!): Producto,

  },

  type Mutation {
    save(name:String!,price:Int!,thumbail:String!): Producto
  },

  type Producto {
    name: String
    thumbail: String
    price: Int
  }

`);


module.exports = Schema