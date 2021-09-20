const express = require('express');

const SessionController = require('../api/session');

const SessionDAO = require('../dao/session-dao');

//const config = require('../config/index');

const routerSession = express.Router();

//const repo = new SessionDAO(config.dbsession);

const controller = new SessionController();

routerSession.get('/list', controller.list);

routerSession.delete('/delete',controller.delete);

module.exports = routerSession;