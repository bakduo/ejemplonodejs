
import Archivo from '../util/archivo.js';

const archivo = new Archivo();

let CONTADOR_ITEM = 0;
let CONTADOR_ITEMRANDOM = 0;


function obtenerRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


export const getItems = (req, res) => {

    try {
        CONTADOR_ITEM++;
        const datos = archivo.read();
        datos.then(data=>{
            const cantidad = (archivo.getSize()-1);
            res.json({items:data,cantidad});
        });    
    } catch (error) {
        res.json({error:error});
    }

}

export const getItemsRandom = (req, res) => {
    const item = obtenerRandom(0,3);
    try {
        CONTADOR_ITEMRANDOM++;
        const datos = archivo.read();
        datos.then(data=>{
            const producto = data[item];
            res.json({item:producto});
        });    
    } catch (error) {
        res.json({error:error});
    }
}

export const getVisitas = (req,res) => {
    try {
        
        res.json({visitas:{items:CONTADOR_ITEM,item:CONTADOR_ITEMRANDOM}});

    } catch (error) {
        res.json({error:error});
    }
}