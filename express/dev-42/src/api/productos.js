const faker = require('faker');
const config = require('../config/index');
const logger = config.logger;

/*
nombre, precio y foto.
*/
faker.locale = 'es';

class RandomProducto {
    constructor(){
                
    }

    static get(){
        const producto = {
            name:faker.commerce.productName(),
            price:faker.commerce.price(1,1000),
            thumbail:faker.image.business()
        }

        return producto;
    }

    static getCollection(cant=0){

        const contenido = [];

        for(let i = 0 ;i < cant ; i++){
            contenido.push(RandomProducto.get());
        }
        return contenido;
    }
}

class ProductoController {
  constructor(productosDao) {    
    this.repo = productosDao
  }

  getVistaFake = async (req,res,next)=>{

    let cant = 10;

    if (Object.keys(req.query).length>0 && req.query.cant){
        cant = req.query.cant;
    }

    const items = RandomProducto.getCollection(cant);

    if (items==null){
    
        return res.render("productos",{
                                    productos:null,
                                    state:false
                                });
    }

    return res.render("productos",{
                            productos:items,
                            state:true
                        });

}

  getVista = async (req,res,next)=>{

    return res.render("productos-dinamic",{user:req.session.user});
}

  getAll = async (req, res, next) => {
    try {
      const lista = await this.repo.getItems();      
      if (lista) {
        return res.status(200).json(lista);
      }
      return res.status(400).json({ error: "Products empty" });
    } catch (error) {
      logger.error(`Error getAll ${error}`)
      throw Error(error);
    }
  };

  save = async (req, res, next) => {
    try {
      if (req.body) {
        const producto = await this.repo.save(req.body);
        return res.status(201).json(req.body);
      }
      return res.status(400).json({ status: 'Body not valid' });
    } catch (error) {
      logger.error(`Error save ${error}`)
      res.status(500).send(error);
      throw Error(error);
    }
  };

  get = async (req, res, next) => {
    try {
      if (req.params.id) {

        const producto = await this.repo.getId(req.params.id);
        if (producto){
          return res.status(200).json(producto.toJson());
        }
      }
      return res.status(400).json({ error: "Product not exist" });
    } catch (error) {
      logger.error(`Error get ${error}`)
      res.status(500).send(error);
      throw Error(error);
    }
  };

  update = async (req, res, next) => {
    try {
      if (req.params.id) {
        const update = await this.repo.updateById(req.params.id, req.body);
        return res.status(200).json(req.body);
      }
      return res.status(400).json({ error: "Product not exist" });
    } catch (error) {
      logger.error(`Error update ${error}`)
      res.status(500).send(error);
      throw Error(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      if (req.params.id) {
        const existe = await this.repo.getId(req.params.id);
        if (existe) {          
            const producto = await this.repo.deleteById(req.params.id);
            if (producto) {
                return res.status(200).json(producto);
            } else {
                logger.error(`Error producto no se puede eliminar ${error}`)
                return res.status(400).json({ error: "Producto not remove" });
            }
        }
      }
      return res.status(400).json({ error: "Product not exist." });
    } catch (error) {
      logger.error(`Error delete ${error}`)
      res.status(500).send(error);
      throw Error(error);
    }
  };

  deleteAll = async (req,res,next) => {
    const deleteAll = await this.repo.deleteAll();
    return res.status(200).json({ SUCCESS: "All delete product" });
  }
}

module.exports = ProductoController;
