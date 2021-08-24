const config = require('../config/index');

const port = config.server.port;

const logger = config.logger;

class LoginController {

    constructor(repo){
        this.repo = repo;
        logger.info("LoginController");
    }

    vistalogout = async (req,res,next) =>{

        if (req.query.username){

            return res.render('logout',{user:req.query.username});
        }

        const url = "http://localhost:"+port+"/login";

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
            const url = "http://localhost:"+port+"/productos/vista";
            return res.redirect(url);
        }
    }

    logout = async(req,res,next) =>{

        let username = "";
        if (req.isAuthenticated()){
            if (req.user.username){
                username = req.user.username
            }
            req.logout();
        }
        res.clearCookie('user');
        req.session.destroy();
        const url = "http://localhost:"+port+"/logout?username="+username;
        return res.redirect(url);
    }

    login = async (req,res,next) =>{

        logger.info("vista Login cookie");
        if (req.user){
            res.cookie('user' ,req.session.user.username, {expire : 1000 * 60});
            const url = "http://localhost:"+port+"/productos/vista";
            return res.redirect(url);
        }
        return res.redirect('http://localhost:'+port+'/faillogin');
    }

    vistaLogin = async (req,res,next) =>{
        logger.info("Vista login");
        return res.render('login');
    }
}

module.exports = LoginController;