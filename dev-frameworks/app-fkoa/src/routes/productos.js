'use strict'

const Router = require('koa-router');

const ProductoController = require('../controller/productos');

const routerProduct = Router({
    prefix: '/api/productos'
});

const ProductoDAO = require('../dao/producto-dao');

const config = require('../config/index');

const repo = new ProductoDAO(config.db);

const controller = new ProductoController(repo);

/******Control router*************/
routerProduct.get('/listar', controller.getAll);
routerProduct.get('/listar/:id',controller.get);
routerProduct.post('/guardar',controller.save);
routerProduct.put('/actualizar/:id',  controller.update);
routerProduct.delete('/borrar/:id',controller.delete);
// routerProduct.delete('/borrarTodo',controller.deleteAll);

module.exports = routerProduct;