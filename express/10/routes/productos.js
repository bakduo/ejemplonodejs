const express = require('express');

const ProductoController = require('../api/productos');

const routerProduct = express.Router();

const config = require('../config/index');

const repo = new ProductoRepository(config.dbproducts);

const controller = new ProductoController(repo);


/** ****Control router************ */
routerProduct.get('/vista', controller.getVista);

routerProduct.get('/listar', controller.getProductos);

routerProduct.get('/listar/:id', control.checkIdGet, controller.getProducto);


routerProduct.post(
  '/guardar',controller.postProducto
);

routerProduct.put(
  '/actualizar/:id',  controller.putProducto
);

routerProduct.delete(
  '/borrar/:id',controller.deleteProducto
);
/** ******************************* */

module.exports = routerProduct;