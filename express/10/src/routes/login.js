const express = require('express');

const passport = require('passport');

const WPassport = require('../middleware/wpassport');

const LoginController = require('../api/login');

const routerLogin = express.Router();

const UserDAO = require('../dao/user-dao');

const config = require('../config/index');

const repo = new UserDAO(config.dbsession);

const wpassport = new WPassport(repo);

wpassport.init();

const controller = new LoginController(null);

routerLogin.get('/login',controller.vistaLogin);

routerLogin.post('/login',passport.authenticate('login', { failureRedirect: '/faillogin' }),controller.login);

routerLogin.get('/faillogin',controller.failLogin);

routerLogin.get('/signup',controller.vistasignup);

routerLogin.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }),controller.signup);

routerLogin.get('/failsignup',controller.failSignup);

routerLogin.get('/logout', controller.vistalogout);

routerLogin.post('/logout', controller.logout);

module.exports = routerLogin;