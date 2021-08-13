import { Producto } from "../model/producto.js";
import Archivo from '../util/archivo.js';

const archivo = new Archivo();

export const getItems = (req, res) => {
    try {

        const cantidad = archivo.getSize();

        const data = archivo.getItems();

        if (cantidad===0){

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
                                productos:data,
                                state:true
                            });
        }else{
            return res.status(200).json(data);
        }
        
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const postItem = (req, res) => {
    
    try {
        const producto = req.body;
        if (producto){
            const p2 = new Producto();
            p2.setPrice(producto.price);
            p2.setThumbail(producto.thumbail);
            p2.setTitle(producto.title);
            //Disclaimer.. Este parametro ID produce inconsistencia solo debe ser tomado como ejemplo de prueba NADA MAS.
            p2.setId(archivo.getSize());
            const tmp1 = archivo.save(p2);
            if (tmp1){    
                if (req.rendercustom){
                    return res.render("add_producto");
                }else{
                    return res.status(200).json(tmp1);
                }
            }
            return res.status(500).json({error:'Error al guardar el producto.'});
        }
        
    } catch (error) {
        return res.json({error:error});
    }
}

export const getItem = (req, res) => {
    
    try {

        if (req.params.id){
            
            const IDP = Number(req.params.id);

            const producto = archivo.getId(IDP);

            if (producto){
                return res.status(200).json(producto);
            }else{
                return res.status(400).json({error:'Producto no encontrado'})
            }
        }
        return res.json({error:'No hay parametro de ID'});
            
    } catch (error) {
        return res.json({error:error});
    }
}

export const updateItem = async (req,res) => {
    try {
        if (req.params.id){
            
            const producto = req.body;
            const IDP = Number(req.params.id);
            const pTmp = new Producto();
            
            pTmp.setPrice(producto.price);
            pTmp.setThumbail(producto.thumbail);
            pTmp.setTitle(producto.title);
            pTmp.setId(IDP);
            
            const update = archivo.updateById(IDP,pTmp);
            if (update){
                return res.status(200).json(update);
            }else{
                return res.status(400).json({error:'Producto no encontrado'})
            }
        }
        return res.json({error:'No hay parametro de ID para actualizar'}); 
    } catch (error) {
        return res.json({error:error}); 
    }
}


export const deleteItem = async (req,res) => {
    try {
        if (req.params.id){
            
            const IDP = Number(req.params.id);
            const indexDelete = archivo.deleteById(IDP);
            
            if (indexDelete!==null){
                return res.status(200).json(indexDelete);
            }else{
                return res.status(400).json({error:'Producto no encontrado para eliminar'})
            }
        }
        return res.json({error:'No hay parametro de ID para eliminar'}); 
    } catch (error) {
        return res.json({error:error}); 
    }
}