import * as fscheck from 'fs';
import { promises as fsp } from 'fs';
import path from 'path';
const __dirname = path.resolve();

export default class ArchivoRepository {

    constructor(path) {
        this.path = path
        this.size = 0;
    }

    async save(data) {
        try {
            //Control loop \n
            await fsp.appendFile(__dirname + this.path, data + '\n');
            this.size = this.size + 1;
            return data;
        } catch (error) {
            throw error;
        }
    }

    getSize(){
        return this.size;
    }

    async readFile(){
        try {
        
            const existe = fscheck.existsSync(__dirname + this.path)
        
            if (existe){
                const data = await fsp.readFile(__dirname + this.path, 'utf8');
                if (data){
                    if (data.length > 0){
                        this.size = (data.split("\n")).length;
                    }
                    return data;
                }
            }
            this.size = 0;
            return [];

        } catch (error) {
            throw error
        }
    }

    async deleteFile(){
        try {
            await fsp.unlink(__dirname +this.path);
            this.size = 0;
        } catch (error) {
            throw error
        }
    }
}