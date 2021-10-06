'use strict'

const express = require('express');

const passport = require('passport');

const WPassport = require('../middleware/wpassport');
const LoginController = require('../controller/login');
const PassportLocalCustom = require('../middleware/passport-local-custom');
const routerLogin = express.Router();
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

const logger = config.logger;
const EmailService = require('../services/emailservice');
const serviceMail = new EmailService();
const repo = new UserDAO(config.db);
const middlewareControl = new PassportLocalCustom(repo);
const wpassport = new WPassport(repo);
wpassport.init();

const controller = new LoginController(null);
routerLogin.get('/login',controller.vistaLogin);
routerLogin.post('/login',[passport.authenticate('login', { failureRedirect: '/faillogin' }),middlewareControl.serializerUserLocal],controller.login);
routerLogin.get('/faillogin',controller.failLogin);
routerLogin.get('/signup',controller.vistasignup);
routerLogin.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }),controller.signup);
routerLogin.get('/failsignup',controller.failSignup);
routerLogin.get('/logout', controller.vistalogout);
routerLogin.post('/logout', controller.logout);

//facebook
routerLogin.get('/auth/facebook',passport.authenticate('facebook'));

routerLogin.get('/auth/facebook/callback',passport.authenticate('facebook',{
    successRedirect:"/facebookdatos", 
    failureRedirect: "/faillogin"}));

routerLogin.get('/facebookdatos', (req, res) => {
    if (req.isAuthenticated()) {
        const fechaLogin =new Date().toISOString();
        serviceMail.setFrom("Ethereal test");
        serviceMail.initialize(providerEmail1);
        const username = req.session.passport.user.displayName || "";
        const photo = req.session.passport.user.photos[0].value || "";
        serviceMail.send("Login",config.email_from,"<i>Usuario login: "+username+"</i> <b>"+fechaLogin+"</b>");
        logger.info("#############Enviar mail login###############");
        if (providerEmail2){
            serviceMail.setFrom("Email externo");
            serviceMail.initialize(providerEmail2);
            serviceMail.send("Login",config.email_from,"<i>Usuario login: "+username+"</i> <b>"+fechaLogin+"</b><hr><br>Profile photo<br><center><img src='"+photo+"'/></center>");
            logger.info("#############Enviar mail login hacia externo###############");
        }
        res.render('facebookfake',{user:req.user});
    } else {
        res.render('defaultMessage');
    }
});

module.exports = routerLogin;