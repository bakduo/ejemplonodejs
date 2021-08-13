const express = require('express');

const ProductoController = require('../api/productos');

const routerProduct = express.Router();

const controller = new ProductoController();

const CustomControl = require("../middleware/custom-control");

const control = new CustomControl();


/******Control router*************/
routerProduct.get('/vista-test', controller.getVistaFake);
routerProduct.get('/vista', controller.getVista);
routerProduct.get('/listar', controller.getAll);
routerProduct.get('/listar/:id',controller.get);
routerProduct.post('/guardar',control.checkForm,controller.save);
routerProduct.put('/actualizar/:id',  controller.update);
routerProduct.delete('/borrar/:id',controller.delete);
/** ******************************* */

module.exports = routerProduct;