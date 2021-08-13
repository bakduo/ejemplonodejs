
import express from 'express';

import {getItems,getItem,postItem, updateItem, deleteItem} from '../controllers/index.js';

var routerItems = express.Router();

routerItems.get('/listar', getItems)
routerItems.get('/listar/:id', getItem)
routerItems.post('/guardar',postItem)
routerItems.put('/actualizar/:id',updateItem)
routerItems.delete('/borrar/:id',deleteItem)


export default routerItems;