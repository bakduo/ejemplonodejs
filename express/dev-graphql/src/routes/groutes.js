var { graphqlHTTP } = require('express-graphql');

const GResolver = require('../resolvers/gresolver');

const Schema = require('../schema/schema');

const gresolver = new GResolver();

let  routes = {
    productos: gresolver.getAll,
    producto: gresolver.get,
    save: gresolver.save
  }

routerGraphql =  graphqlHTTP({
    schema: Schema,
    rootValue: routes,
    graphiql: true
  })

module.exports = routerGraphql;