const GenericRepo = require("./generic-repo");

class MessageRepo extends GenericRepo{

    constructor(messageStategy){
        super(messageStategy);
    }

    create = async(item)=>{
        return await this.strategy.save(item);
    }

    find = async()=>{
        return await this.strategy.getItems();
    }

}

module.exports = MessageRepo;