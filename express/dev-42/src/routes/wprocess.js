'use strict'

const express = require('express');

const WProcessController = require('../api/wprocess');

const routerProcess = express.Router();

const controller = new WProcessController();

routerProcess.get("/info",controller.getInfo);

routerProcess.get("/infosinlog",controller.getInfoSinLog);

routerProcess.get("/randoms",controller.getRandom);

module.exports = routerProcess;