import ArchivoRepository from '../repository/archivo-repository.js';

const PATH_DB=process.env.PATH_DB || "/db/storage.db";

export default class Archivo {
    
    constructor(){
        this.repository = new ArchivoRepository(PATH_DB);
        this.items = [];
    }

    getId(id){

        try {

            let producto = null;
            this.items.forEach((item)=>{
                if (item.id === id){
                    producto = item;
                }
            });
            return producto;

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
            console.log(p);
            this.items.push(p);
            const data = await this.repository.save(this.items);
            return p;
        } catch (error) {
            throw error;
        }
    }
}