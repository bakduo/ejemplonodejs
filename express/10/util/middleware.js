//Uso middleware a nivel de ruta porque me permite agregar funcionalidad  sin modificar mucho el codigo original

class CustomOrigin {

    constructor(){
        
    }

    checkOrigin(req,res,next){
            
        req.rendercustom = true;  
        if (req.headers['content-type']){
            if (req.headers['content-type']==='application/json'){
                req.rendercustom=false;
            }
         }
        next();
    }

    checkForm(req,res,next){

        let final = true;

        if (req.body.title && req.body.price && req.body.thumbail){
            const ok1 = (typeof req.body.title === 'string' || req.body.title instanceof String);
            const ok2 = (typeof req.body.thumbail === 'string' || req.body.thumbail instanceof String)
            const ok3 = (typeof req.body.price === 'number')
            if (ok1 && ok2 && ok3){
                final = false;
            }
        }
        
        req.customblock = final;
        
        next();
        
    }

    checkId(req,res,next){
        
        const final = true;
        
        if (req.body.id){

            if ((typeof req.body.id === 'number')){
                final = false;
            }
        }

        req.customblock = final;

        next();

    }

}

module.exports = CustomOrigin;