exports.cookieControl = async (req, res, next) => {
    
    
    if (req.session){
        
            if (req.session.cookie.expires===60000){
                res.clearCookie('user');
                return res.redirect('http://localhost:3000/login');
            }
    }
  
    return next();
  };
  