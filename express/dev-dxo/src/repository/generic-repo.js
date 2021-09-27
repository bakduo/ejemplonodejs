class GenericRepo {
    
    //the strategy maybe in-memory or relational by SQL/ODM/ORM
    constructor(strategy){
        this.strategy = strategy
    }

    create = async(item)=>{
        throw new Error("Implemente concrete class");
    }

    find = async()=>{
        throw new Error("Implemente concrete class");
    }

    delete = async (id)=> {
        throw new Error("Implemente concrete class");
    }

    update = async (id,item)=>{
        throw new Error("Implemente concrete class");
    }

    findOne=async(id)=>{
        throw new Error("Implemente concrete class");
    }

}

module.exports = GenericRepo