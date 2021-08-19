

class SessionController {
    
    constructor(repo){
        this.repo = repo;
    }

    list = async (req,res,next) =>{
        const items = await this.repo.getItems()
        if (items){
            return res.status(200).json(items);
        }
        return res.status(400).json({ status: 'No hay session' });
    }

    delete = async (req,res,next)=>{
        
        const result = await this.repo.deleteAll();
        return res.status(200).json(result);
    }


}

module.exports = SessionController;