var { graphqlHTTP } = require('express-graphql');

const GResolver = require('../resolvers/gresolver');

const Schema = require('../schema/schema');

const ProductoDAO = require('../dao/producto-dao');

const config = require('../config/index');

const repo = new ProductoDAO(config.db);

const gresolver = new GResolver(repo);

let  routes = {
    productos: gresolver.getAll,
    producto: gresolver.get,
    save: gresolver.save,
    delete: gresolver.delete,
    update: gresolver.update
    
  }

routerGraphql =  graphqlHTTP({
    schema: Schema,
    rootValue: routes,
    graphiql: config.graphql
  })

module.exports = routerGraphql;