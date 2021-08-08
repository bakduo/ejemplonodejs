'use strict'

class LoginFakeControl {
    constructor(){

    }

    auth = async (req,res,next) =>{
        if (req.session.user){
            return next();
        }
        return res.status(401).send('Invalid access');
    }
}

module.exports = LoginFakeControl