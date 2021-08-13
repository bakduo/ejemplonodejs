
const Producto = require("../model/producto.js");

const MemoryDB = require("../util/memory-db");

class ProductService {
 
    memdb = null;

    static instancia;

    constructor(){

        if (!!ProductService.instancia){
            return ProductService.instancia;
        }

        this.memdb = new MemoryDB();

        ProductService.instancia = this;
    }

    setMemDB(mem){
        this.memdb = mem;
    }

    addProducto(producto){
        try {
            if (producto){

                const p2 = new Producto();
                p2.setPrice(producto.price);
                p2.setThumbail(producto.thumbail);
                p2.setTitle(producto.title);
                //Disclaimer.. Este parametro ID produce inconsistencia solo debe ser tomado como ejemplo de prueba NADA MAS.
                p2.setId(this.memdb.getSize());
                const tmp1 = this.memdb.save(p2);
                if (tmp1){    
                    return producto
                }
            }
            return null;

        } catch (error) {
            throw Error(error)
        }
    }

    getProducto(id){
        try {
            if (id){
                const IDP = Number(id);
                const producto = this.memdb.getId(IDP);
                if (producto){
                    return producto;
                }
            }
            return null;   
        } catch (error) {
            throw Error(error)
        }
    }

    getProductos(){
        return this.memdb.getItems();
    }

    updateProducto(id,producto){
        try {
            if (id){
                const IDP = Number(id);
                const pTmp = new Producto();
                pTmp.setPrice(producto.price);
                pTmp.setThumbail(producto.thumbail);
                pTmp.setTitle(producto.title);
                pTmp.setId(IDP);
                const update = this.memdb.updateById(IDP,pTmp);
                if (update){
                    return update
                }
            }
            return null;
        } catch (error) {
            throw Error(error)
        }
    }

    deleteProducto(id){
        try {
            if (id){
                
                const IDP = Number(id);
                const indexDelete = this.memdb.deleteById(IDP);
                if (indexDelete!==null){
                    return indexDelete;
                }
            }
            
            return null;
        } catch (error) {
            throw Error(error)
        }
    }

}

module.exports = ProductService;