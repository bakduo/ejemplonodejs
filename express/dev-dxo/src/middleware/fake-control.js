'use strict'

const config = require('../config/index');

exports.cookieControl = async (req, res, next) => {
    
    
    if (req.session){
            if ((req.session.cookie.expires===config.timesession) && (req.session.cookie.user)){
                res.clearCookie('user');
                req.logout();
                return res.redirect(req.protocol+"://"+req.headers.host+"/login");
            }
    }else{
        return res.redirect(req.protocol+"://"+req.headers.host+"/login");
    }
    return next();
  };
  