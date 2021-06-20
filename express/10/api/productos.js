
const express = require('express');
const routerProduct = express.Router();
const ProductService = require('../services/product-sevice.js');
const CustomOrigin = require('../util/middleware');
const control = new CustomOrigin();

//Services producto

const service = new ProductService();

//Controller routes

routerProduct.get("/vista",(req,res)=>{

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

})

//API JSON
routerProduct.get('/listar', (req,res)=>{
    try {
        const items = service.getProductos();
        if (items==null){
            return res.status(400).json({error:'No hay productos cargados'});
        }
        return res.status(200).json(items);
        
    } catch (error){
        return res.status(500).json(error)
    }  

});

routerProduct.get('/listar/:id',control.checkId,(res,req)=>{
    try {

        if (req.params.id){
            const producto = service.getPruducto(req.params.id);
            if (producto){
                return res.status(200).json(producto);
            }
        }
        
        return res.status(400).json({error:'Producto no encontrado'})
            
    } catch (error) {
        return res.json({error:error});
    }
});


routerProduct.post('/guardar',control.checkForm,(req,res)=>{
    try {

        if (!req.customblock){
            if (req.body){
                const producto = service.addProducto(req.body);
                if (producto){
                    return res.status(200).json(producto);
                }
            }    
        }
        
        return res.status(500).json({error:'Error al guardar el producto.'});
        
    } catch (error) {
        return res.json({error:error});
    }

});

routerProduct.put('/actualizar/:id',control.checkId,(req,res)=>{
    
    try {

        if (!req.customblock){
            const update = service.updateProducto(req.params.id);
            if (update){
                return res.status(200).json(update);
            }
        }
        return res.status(400).json({error:'Producto no encontrado'})

    } catch (error) {
        return res.json({error:error}); 
    }

});

routerProduct.delete('/borrar/:id',control.checkId,(req,res)=>{
    
    try {

        if (!req.customblock){
            if (req.params.id){
                const existe = service.getPruducto(Number(req.params.id));
                if (existe){
                    const indexDelete = service.deleteProducto(Number(req.params.id));
                    if (indexDelete!==null){
                        return res.status(200).json(indexDelete);
                    }        
                }
            }
        }
        return res.status(400).json({error:'Producto no encontrado para eliminar'})

    } catch (error) {
        return res.json({error:error}); 
    }
})

module.exports = routerProduct;