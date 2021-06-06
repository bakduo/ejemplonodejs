
//const itemsController = require('../controllers/index');

import * as  express from 'express';

import {getItems,getItemsRandom,getVisitas} from '../controllers/index.js';

var routerItems = express.Router();

routerItems.get('/items', getItems)
routerItems.get('/items-random', getItemsRandom)
routerItems.get('/visitas',getVisitas)

export default routerItems;