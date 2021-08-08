'use strict'

/**
 * [PassportLocalCustom wrapper para manipular datos necesarios para post-passport-login]
 */
class PassportLocalCustom {
    constructor (repo){
        this.repo = repo;
    }

    deserializeUserLocal = async (req,res,next) =>{

        if (req.isAuthenticated()){
            let user = req.user;
            if (user.username){
                user = user.username
            }
            req.session.user = user;
            next();
        }
        
    }

    serializerUserLocal = async (req,res,next) => {
    
        if (req.isAuthenticated()){
    
            //const userTmp = req.user;
    
            //let userModel = this.repo.getModel();
    
            //req.session.user = await userModel.findOne({username: userTmp });
            
            req.session.user = {username:req.user.username};
            
            next();
        }

    }
}


module.exports = PassportLocalCustom;
