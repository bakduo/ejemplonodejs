
const config = require('../config/index');

const logger = config.logger;

class SessionController {
    
    constructor(){
        //this.repo = repo;
    }

    list = async (req,res,next) =>{
        const items = req.session;
        if (items){
            return res.status(200).json(items);
        }
        return res.status(400).json({ status: 'No hay session' });
    }

    delete = async (req,res,next)=>{
        
        res.clearCookie('user');
        const result = req.session.destroy();
        return res.status(200).json(result);
    }


}

module.exports = SessionController;