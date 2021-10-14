const ProductoModel = require("../model/producto-model");
const config = require('../config/index');
const logger = config.logger;

class ApiProductos {
    
    constructor(repo){
        this.repo = repo;
        this.model = new ProductoModel();
    }

    add = async (producto) =>{
        const valid = this.model.validate(producto);
        if (valid){
            const productoGenarado = await this.repo.save(producto);
            return productoGenarado;
        }
        return false;
    }

    deleteOne = async (id) => {
        const existe = await this.repo.getId(id);
        if (!existe.isEmpty()){
            const producto = await this.repo.deleteById(id);
            if (producto) {
                return existe;
            } else {
                logger.debug(`producto no se puede eliminar ${error}`);
            }
        }
        return false;
    }

    update = async (id,producto) =>{
        if (id) {
            const valid = this.model.validate(producto);
            if (valid){
                const update = await this.repo.updateById(id, producto);
                return update;
            }
        }
        return false
    }

    getOne = async (id) =>{
        const producto = await this.repo.getId(id);
        if (producto){
          return producto.toJson();
        }
        return false
    }

    getAll = async () => {
        const listaProductos = await this.repo.getItems();      
        if (listaProductos) {
            return listaProductos;
        }
        return false;
    }

    deleteAll = async () => {
        const deleteAll = await this.repo.deleteAll();
        return true
    }


}

module.exports = ApiProductos;