const express = require('express');

const LoginController = require('../api/login');

const routerLogin = express.Router();

const controller = new LoginController(null);

routerLogin.get('/login', controller.vista);

routerLogin.post('/login', controller.login);

routerLogin.get('/logout', controller.vistalogout);

routerLogin.post('/logout', controller.logout);

module.exports = routerLogin;