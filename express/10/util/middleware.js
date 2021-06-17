//Uso middleware a nivel de ruta porque me permite agregar funcionalidad de render sin modificar mucho el codigo original

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
}

module.exports = CustomOrigin;