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

    signup = async (ctx,next)=>{
        if (ctx.isAuthenticated()) {
            ctx.login(ctx.session.passport.user);
            ctx.status=200;
            ctx.body={status:"Registro ok"};
        }else{
            ctx.status=404;
            ctx.body={status:"Registro no funciono"};
        }
        next();
    }

    logout = async(ctx,next) =>{
        let username = "";
        ctx.logOut();
        const fechaLogin =new Date().toISOString();
        this.service.initialize(providerEmail1);
        this.service.setFrom("Ethereal test");
        this.service.send("Logout",config.email_to,"<i>Usuario logout: "+username+"</i> <b>"+fechaLogin+"</b>");
        logger.info("##########Deberia enviar mail##############");
        ctx.status=200;
        ctx.body = {logout:true};
        next();
    }

    login = async (ctx,next) =>{
        if (ctx.isAuthenticated()){
            ctx.login(ctx.session.passport.user);
            ctx.status=200;
            ctx.body="Login ok";
            next()
        }else{
            ctx.status=403;
            ctx.body="Auth no ok";
            next();
        }
    }
}

module.exports = LoginController;