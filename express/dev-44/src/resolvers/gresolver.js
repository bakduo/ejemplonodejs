const config = require('../config/index');

const ApiProductos = require('../api/api-productos');

const logger = config.logger;

class GResolver {
  constructor(repo) {    
    this.api = new ApiProductos(repo);
  } 

  getAll = async () => {
    try {

      let lista = await this.api.getAll();

      if (lista) {
        //transform expected schema
        lista = lista.map((item)=> {
          return {
            name:item.name,
            price:item.price,
            thumbail:item.thumbail
          }
        })
        return lista;
      }
      return { error: "Products empty" };
    } catch (error) {
      logger.error(`Error getAll ${error}`)
      throw Error(error);
    }
  };

  get = async ({id}) => {
    try {
      if (id) {
        
        const {name,price,thumbail} = await this.api.getOne(id);

        return {name,price,thumbail};
      }

      return false;

    } catch (error) {
      logger.error(`Error get ${error}`)
      res.status(500).send(error);
      throw Error(error);
    }
  };

  save = async ({name,price,thumbail}) => {
    try {

      if (!name && !thumbail && !price){
        return { status: 'Body not valid' };
      }

      const body={
        name,thumbail,price
      }
            
      await this.api.add(body);
      
      return body;
      
    } catch (error) {
      logger.error(`Error save ${error}`)
      throw Error(error);
    }
  };

  update = async ({id,name,price,thumbail}) => {
    if (!name && !thumbail && !price){
      return { status: 'Body not valid' };
    }

    const body={
      name,thumbail,price
    }

    const update = await this.api.update(id,body);
    if (update){
      return body;
    }
    return false
  }

  delete = async ({id}) => {
    const producto = await this.api.deleteOne(id);
        if (producto) {
          const {name,price,thumbail} = producto;
            return {name,price,thumbail};
        }
        return false;
  }

   test = async () => {
    logger.info("Acceso por medio de graphql")
    return 'sample ';
  }

}

module.exports = GResolver;
