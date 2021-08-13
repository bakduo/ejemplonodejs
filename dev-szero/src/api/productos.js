const ProductService = require('../services/product-sevice.js');
//Services producto
const service = new ProductService();
// Controller routes
// API JSON
class ProductoController{

    constructor(){

    }

    getVista(req,res){
        const items = service.getProductos();
        if (items==null){
            return res.render("productos",{
                                        productos:null,
                                        state:false
                                    });
        }
    
        return res.render("productos",{
                                productos:items,
                                state:true
                            });
    };

    getProductos(req,res){
        try {
            const items = service.getProductos();
            if (items==null){
                return res.status(400).json({status:'No hay productos cargados'});
            }
            return res.status(200).json(items);
        }catch(error){
            return res.status(500).json({error:`${error}`});
        }
    }

    getProducto(req,res){
        try {
            if (!req.customblock){   
                if (req.params.id){
                    const producto = service.getProducto(req.params.id);
                    if (producto){
                        return res.status(200).json(producto);
                    }
                }
            }
            return res.status(400).json({status:'Producto not found.'});

        } catch (error) {
            
            return res.status(500).json({error:`${error}`});
        }
    }

    postProducto(req,res){
        try {
            if (!req.customblock){
                if (req.body){
                    const producto = service.addProducto(req.body);
                    if (producto){
                        return res.status(200).json(producto);
                    }
                }    
            }

            return res.status(200).json({
                status:{
                    kind: req.customerror.kind,
                    descript: req.customerror.descript
                }
            });
        } catch (error) {
            return res.status(500).json({error:`${error}`});
        }
    }

    putProducto(req,res){
        try {
    
            if (!req.customblock){
                const update = service.updateProducto(req.params.id,req.body);
                if (update){
                    return res.status(200).json(update);
                }
            }
            return res.status(400).json({status:'Producto no encontrado'})
    
        } catch (error) {
            return res.status(500).json({error:`${error}`});
        }
    }

    deleteProducto(req,res){

        try {
            
            if (!req.customblock){

                if (req.params.id){
                    
                    const existe = service.getProducto(Number(req.params.id));
                    if (existe){
                        const indexDelete = service.deleteProducto(Number(req.params.id));
                        if (indexDelete!==null){
                            return res.status(200).json(indexDelete);
                        }        
                    }
                }
            }
            
            return res.status(400).json({status:'Producto no encontrado para eliminar'});

        }catch(error){
            return res.status(500).json({error:`${error}`});
        }
    }
}


module.exports = ProductoController;