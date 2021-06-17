const ProductService = require('../services/product-sevice.js');

const service = new ProductService();

const getItems = (req, res) => {
    try {

        const items = service.getProductos(); 

        if (items==null){

            //Logica en la ruta, por ahora sin SPA client-side, es accesible.
            
            if (req.rendercustom){
                return res.render("productos",{
                                        productos:null,
                                        state:false
                                    });
            }else{
                return res.status(400).json({error:'No hay productos cargados'});
            }
        }

        if (req.rendercustom){
            return res.render("productos",{
                                productos:items,
                                state:true
                            });
        }else{
            return res.status(200).json(items);
        }
        
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

const postItem = (req, res) => {
    
    try {

        const producto = service.addProducto(req.body);

        if (producto){
            if (req.rendercustom){
                return res.render("add_producto");
            }else{
                return res.status(200).json(producto);
            }
        }

        return res.status(500).json({error:'Error al guardar el producto.'});
        
    } catch (error) {
        return res.json({error:error});
    }
}

const getItem = (req, res) => {
    
    try {

        const producto = service.getPruducto(req.params.id);
        if (producto){
            return res.status(200).json(producto);
        }
        return res.status(400).json({error:'Producto no encontrado'})
            
    } catch (error) {
        return res.json({error:error});
    }
}

const updateItem = async (req,res) => {
    try {

        const update = service.updateProducto(req.params.id);
        if (update){
            return res.status(200).json(update);
        }
        return res.status(400).json({error:'Producto no encontrado'})

    } catch (error) {
        return res.json({error:error}); 
    }
}


const deleteItem = async (req,res) => {
    try {
        const indexDelete = service.deleteProducto(Number(req.params.id));
        if (indexDelete!==null){
            return res.status(200).json(indexDelete);
        }
        return res.status(400).json({error:'Producto no encontrado para eliminar'})
    } catch (error) {
        return res.json({error:error}); 
    }
}

module.exports = {getItem,getItems,updateItem,deleteItem,postItem}