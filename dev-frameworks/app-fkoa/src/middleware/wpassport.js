'use strict'

const passport = require('koa-passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/index');
const EmailService = require('../services/emailservice');
const { logger } = require('../config/index');

/**
 * [WPassport wrapper para tener una estrategia de multi-auth]
 */
class WPassport {

    constructor(repo){
        this.repo = repo;
        this.support = config.passportLogin;
        this.enableLogin = {};
        this.service = new EmailService();
    }


    isValidPassword = (user, password) => {
        return bcrypt.compareSync(password, user.password);
    }

    createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }

    checkLogin = async (req, username, password, done) => {
        
        let user = await this.repo.find({query:{key:'username',value:username}});
        if (!user) {
            return done(null, false, console.log('mensaje', 'usuario no encontrado'));
        } else {
            if (!this.isValidPassword(user, password)) {
                return done(null, false, console.log('mensaje', 'contraseña invalida'));
            } else {
                return done(null, user);
            }
        }
    }

    signup = async (req, username, password, done) => {

        let usuario = await this.repo.find({query:{key:'username',value:username}});
        if (usuario) {
            return done(null, false, console.log('mensaje', 'usuario ya existe'));
        } else {
            let newUser = {
                username: username,
                password: this.createHash(password),
            };
            await this.repo.save(newUser);
            return done(null, newUser);
        }
    }

    deserializeUserLocal = async (user, done) =>{
        //Only refresh
        return done(null, user);
    }

    serializerLocal = async (user, done) => {
        //Only by login
        return done(null, user);
    }

    checkLoginFacebook = async (accessToken,refreshToken,profile,done) => {
        let user = profile;
        return done(null, user);
    }

    generateStructureLogin= async ()=>{

        this.support.forEach(item=>{
            
            switch (item) {
                case "facebook":
                    //Remember use secret for this
                    passport.use('facebook',new FacebookStrategy({
                        clientID: config.facebookid || process.env.FACEBOOK_CLIENTID,
                        clientSecret: config.facebooksecret || process.env.FACEBOOK_CLIENTS,
                        callbackURL: "" || process.env.FACEBOOK_CALLBACK,
                        profileFields: ['id', 'displayName', 'photos', 'emails'],
                        scope: ['email']
                    },this.checkLoginFacebook));

                    this.enableLogin[item] = true;

                    break;
            }
        })

        //Always local
        passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },this.checkLogin));
        
        passport.use('signup', new LocalStrategy({
            passReqToCallback: true
        },  this.signup));

        passport.serializeUser(this.serializerLocal);
        
        passport.deserializeUser(this.deserializeUserLocal);

    }

    initAsync = async () =>{

        await this.generateStructureLogin();
    }

    init = () => {

        //Wrapper async
        const inicio = async () => {
            await this.initAsync();
        }
        inicio();
    }
}

module.exports=WPassport;