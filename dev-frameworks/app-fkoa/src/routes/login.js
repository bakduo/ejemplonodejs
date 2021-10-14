'use strict'

const Router = require('koa-router');

const passport = require('koa-passport');

const WPassport = require('../middleware/wpassport');
const LoginController = require('../controller/login');
const routerLogin = Router({
    prefix:'/auth'
});
const UserDAO = require('../dao/user-dao');
const config = require('../config/index');
let providerEmail1 = "";
let providerEmail2="";

if (config.emails.lenght==2){
    providerEmail1 = config.emails[0];
    providerEmail2 = config.emails[1];
}else{
    providerEmail1 = config.emails[0];
}
const repo = new UserDAO(config.db);
const wpassport = new WPassport(repo);
wpassport.init();

const controller = new LoginController(null);
routerLogin.post('/login',passport.authenticate('login', { failureRedirect: '/auth/login' }),controller.login);
routerLogin.post('/signup',passport.authenticate('signup', { failureRedirect: '/auth/signup' }),controller.signup);
routerLogin.post('/logout',controller.logout);
module.exports = routerLogin;