const express = require('express');

const routerProduct = express.Router();

const ProductoController = require("../api/productos");

const CustomOrigin = require('../util/middleware');

const control = new CustomOrigin();

const controller = new ProductoController();

routerProduct.get("/vista",controller.getVista);

routerProduct.get('/listar',controller.getProductos);

routerProduct.get('/listar/:id',control.checkIdGet,controller.getProducto);

routerProduct.post('/guardar',control.checkForm,controller.postProducto);

routerProduct.put('/actualizar/:id',control.checkIdGet,controller.putProducto);

routerProduct.delete('/borrar/:id',control.checkIdGet,controller.deleteProducto);

module.exports = routerProduct;