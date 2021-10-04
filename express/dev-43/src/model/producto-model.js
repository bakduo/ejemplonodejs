const Joi = require('joi');

class ProductoModel {
    
    constructor(){
        this.schema = this.initSchema();
    }

    initSchema(){
        const productoSchema = Joi.object().keys({
            name:Joi.string().required(),
            price:Joi.number().required(),
            thumbail:Joi.string().required()
        });
        return productoSchema;
    }

    validate(body){
        const result = this.schema.validate(body);
        const { value, error } = result; 
        const valid = error == null; 
        
        if (!valid) { 
            return false
        }

        return true;
    }
}

module.exports = ProductoModel;