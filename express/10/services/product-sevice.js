
const Producto = require("../model/producto.js");

class MemoryDB {
    
    constructor(){
        this.items = [];
    }

    getIndex(id){
        const index = this.items.findIndex((item)=>item.id === id);
        if (index>=0){
            return index;
        }
        return -1;
    }

    getItems(){
        return this.items;
    }

    getId(id){

        try {
            const index = this.getIndex(id);
            if (index>=0){
              return this.items[index];
            }
            return null;

        } catch (error) {
            throw error;
        }
    }

    deleteById(id){
        try {
            
            const item = this.getId(id);
            if (item!==null){
                this.items = this.items.filter((item)=>item.id !== id);
                return item;
            }
            
            return null;

        } catch (error) {
            throw error;  
        }
    }

    updateById(id,producto){
        try {
            const index = this.getIndex(id);
            if (index>=0){
                this.items[index] = producto;
                return producto;
            }
            return null;
        } catch (error) {
            throw error; 
        }
    }

    getSize(){
        return this.items.length;
    }

    save(p){
        try {
            this.items.push(p);
            return p;
        } catch (error) {
            throw error;
        }
    }
}

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

    getPruducto(id){
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
            return res.json({error:error});
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
            return res.json({error:error}); 
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
            return res.json({error:error}); 
        }
    }

}

module.exports = ProductService;