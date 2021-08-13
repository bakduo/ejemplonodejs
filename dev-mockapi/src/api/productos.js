const Producto = require('../model/producto');

const faker = require('faker');

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
  constructor() {    
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

    return res.render("productos-dinamic");

}

  getAll = async (req, res, next) => {
    try {
      const lista = await Producto.find();

      if (lista) {
        return res.status(200).json(lista);
      }
      return res.status(400).json({ error: "Products empty" });
    } catch (error) {
      throw Error(error);
    }
  };

  save = async (req, res, next) => {
    try {
      if (req.body) {
        const producto = new Producto(req.body);

        await producto.save();

        return res.status(201).json(req.body);
      }
      return res.status(400).json({ status: 'Body not valid' });
    } catch (error) {
      res.status(500).send(error);
      throw Error(error);
    }
  };

  get = async (req, res, next) => {
    try {
      if (req.params.id) {
        const producto = await Producto.findOne({ _id: req.params.id });
        return res.status(200).json(producto);
      }

      return res.status(400).json({ error: "Product not exist" });
    } catch (error) {
      res.status(500).send(error);
      throw Error(error);
    }
  };

  add = async (req, res, next) => {};

  update = async (req, res, next) => {
    try {
      if (req.params.id) {
        const producto = await Producto.updateOne(
          { _id: req.params.id },
          { $set: { name: req.body.name,thumbail:req.body.thumbail,price:req.body.price }}
        );
        return res.status(200).json(req.body);
      }

      return res.status(400).json({ error: "Product not exist" });
    } catch (error) {
      res.status(500).send(error);
      throw Error(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      if (req.params.id) {
        const existe = await Producto.findOne({ _id: req.params.id });
        if (existe) {
          
            const producto = await Producto.deleteOne({
                _id: req.params.id,
            });
            if (producto) {
                return res.status(200).json(producto);
            } else {
                return res.status(400).json({ error: "Producto not remove" });
            }
            
        }
      }
      return res.status(400).json({ error: "Product not exist." });
    } catch (error) {
      res.status(500).send(error);
      throw Error(error);
    }
  };
}

module.exports = ProductoController;
