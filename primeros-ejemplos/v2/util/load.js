import { Producto } from "../model/producto.js";
import Archivo from "./archivo.js";

export default async function loadInitial(){
    try {

        const archivo = new Archivo();
        await archivo.delete();
        const p1 = new Producto();
        p1.setPrice(123.45);
        p1.setThumbail("https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png");
        p1.setTitle("Escuadra");
        console.log(archivo.getSize());
        p1.setId(archivo.getSize());
        //Guardo un contenido
        const tmp = await archivo.save(p1);
        
        const p2 = new Producto();
        p2.setPrice(234.56);
        p2.setThumbail("https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png");
        p2.setTitle("Calculadora");
        p2.setId(archivo.getSize());
        //Guardo un contenido
        const tmp1 = await archivo.save(p2);
        
        const p3 = new Producto();
        p3.setPrice(345.67);
        p3.setThumbail("https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png");
        p3.setTitle("Globo Terráqueo");
        p3.setId(archivo.getSize());
        //Guardo un contenido
        const tmp2 = await archivo.save(p3);
        
        console.log(tmp);
        console.log(tmp1);
        console.log(tmp2);    
    } catch (error) {
        throw error;       
    }
       
}