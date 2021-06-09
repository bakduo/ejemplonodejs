import ArchivoRepository from '../repository/archivo-repository.js';

const PATH_DB=process.env.PATH_DB || "/db/storage.db";

export default class Archivo {
    
    constructor(){
        this.repository = new ArchivoRepository(PATH_DB);
        this.items = [];
    }

    getId(id){

        try {
            const index = this.items.findIndex((item)=>item.id === id);
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
            const index = this.items.findIndex((item)=>item.id === id)
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

    async read(){
        try {
            this.items = await this.repository.readFile();
            return this.items;
        } catch (error) {
            throw error
        }
    }

    async delete(){
        try {
            await this.repository.deleteFile();
        } catch (error) {
            throw error;
        }
    }

    async save(p){
        try {
            this.items.push(p);
            const data = await this.repository.save(this.items);
            return p;
        } catch (error) {
            throw error;
        }
    }

    async sync(){
        try {
            const data = await this.repository.save(this.items);
            return data;
        } catch (error) {
            throw error;
        }
    }
}