//Uso middleware a nivel de ruta porque me permite agregar funcionalidad de render sin modificar mucho el codigo original
export function checkOrigin(req,res,next){
    
    req.rendercustom = true;  
    if (req.headers['content-type']){
        if (req.headers['content-type']==='application/json'){
            req.rendercustom=false;
        }
     }
    next();
}