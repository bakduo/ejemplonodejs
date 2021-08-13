export default class Archivo {
    
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