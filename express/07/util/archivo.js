import ArchivoRepository from '../repository/archivo-repository.js';

export default class Archivo {
    
    constructor(){
        this.repository = new ArchivoRepository("/db/storage.db");
    }

    getSize(){
        return this.repository.getSize();
    }

    async read(){
        try {
            const data = await this.repository.readFile();
            if (data.length > 0){
                return data.split("\n");
            }
            return data;
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
            if (this.getSize()==0){

            }
            const data = await this.repository.save(p.toJson());
            return p;
        } catch (error) {
            throw error;
        }
    }
}