'use strict'

const config = require('../config/index');

exports.cookieControl = async (req, res, next) => {
    
    
    if (req.session){
        
            if (req.session.cookie.expires===config.timesession){
                res.clearCookie('user');
                req.logout();
                return res.redirect('http://localhost:3000/login');
            }
    }
  
    return next();
  };
  