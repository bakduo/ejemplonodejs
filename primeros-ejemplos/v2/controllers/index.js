
import { Producto } from "../model/producto.js";
import Archivo from '../util/archivo.js';

const archivo = new Archivo();

export const getItems = (req, res) => {

    try {
        
        const datos = archivo.read();
        datos.then(data=>{
            const cantidad = archivo.getSize();
            if (cantidad===0){
                return res.status(400).json({error:'No hay productos cargados'});
            }
            return res.status(200).json(data);
        });    
    } catch (error) {
        return res.json({error:error});
    }

}

export const postItem = async (req, res) => {
    
    try {
        const producto = req.body;
        if (producto){
            const p2 = new Producto();
            p2.setPrice(producto.price);
            p2.setThumbail(producto.thumbail);
            p2.setTitle(producto.title);
            p2.setId(archivo.getSize());
            const tmp1 = await archivo.save(p2);
            if (tmp1){
                return res.status(200).json(tmp1);
            }
            return res.status(500).json({error:'Error al guardar el producto.'});
        }
        
    } catch (error) {
        return res.json({error:error});
    }
}

export const getItem = async (req, res) => {
    
    try {

        if (req.params.id){
            
            await archivo.read();
            
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