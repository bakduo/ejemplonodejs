const config = require('../config/index');
const providerEmail1 = config.emails[0];
const logger = config.logger;
const EmailService = require('../services/emailservice');

class LoginController {

    constructor(repo){
        this.repo = repo;
        logger.info("LoginController");
        this.service = new EmailService();
        
    }

    vistalogout = async (req,res,next) =>{

        if (req.query.username){
            return res.render('logout',{user:req.query.username});
        }

        const url = req.protocol+"://"+req.headers.host+"/login";

        return res.redirect(url);
    }

    failLogin = async (req,res,next)=>{
        return res.render("faillogin");
    }

    failSignup = async (req,res,next)=>{
        return res.render("failsignup");
    }

    vistasignup = async (req,res,next)=>{
        return res.render("signup");
    }

    signup = async (req,res,next)=>{
        if (req.user){
            req.session.user = req.user;
            const url = req.protocol+"://"+req.headers.host+"/productos/vista";
            return res.redirect(url);
        }
    }

    logout = async(req,res,next) =>{
        let username = "";
        //req.session.passport.user.photos["value"]
        if (req.isAuthenticated()){
            if (req.session.passport){
                username = req.user.username || req.session.passport.user.displayName
            }
            req.logout();
        }
        res.clearCookie('user');
        req.session.destroy();
        const fechaLogin =new Date().toISOString();
        this.service.initialize(providerEmail1);
        this.service.setFrom("Ethereal test");
        this.service.send("Logout",config.email_to,"<i>Usuario logout: "+username+"</i> <b>"+fechaLogin+"</b>");
        const url = req.protocol+"://"+req.headers.host+"/logout?username="+username;
        logger.info("##########Deberia enviar mail##############");
        return res.redirect(url);
    }

    login = async (req,res,next) =>{
        logger.info("vista Login cookie");
        if (req.user){
            res.cookie('user' ,req.session.user.username, {expire : 1000 * 60});
            const url = req.protocol+"://"+req.headers.host+"/productos/vista";
            return res.redirect(url);
        }
        return res.redirect(req.protocol+"://"+req.headers.host+'/faillogin');
    }

    vistaLogin = async (req,res,next) =>{
        logger.info("Vista login");
        return res.render('login');
    }
}

module.exports = LoginController;