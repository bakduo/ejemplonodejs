const fsp = require('fs').promises;
const fscheck = require('fs');
class ArchivoRepository {

    constructor(path) {
        this.path = path
        this.size = 0;
    }

    async save(data) {
        try {
            await fsp.writeFile(__dirname + this.path, JSON.stringify(data),'utf8');
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
                let data = await fsp.readFile(__dirname + this.path, 'utf8');
                if (data){
                    
                    data = JSON.parse(data);
                    if (data.length > 0){
                        this.size = data.length;
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

module.exports = ArchivoRepository;