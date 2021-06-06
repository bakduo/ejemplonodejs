
//const itemsController = require('../controllers/index');

import express from 'express';

import {getItems,getItem,postItem} from '../controllers/index.js';

var routerItems = express.Router();

routerItems.get('/api/productos/listar', getItems)
routerItems.get('/api/productos/listar/:id', getItem)
routerItems.post('/api/productos/guardar/',postItem)

export default routerItems;