const config = require('../config/index');

const logger = config.logger;

class GResolver {
  constructor(repo) {    
    this.repo = repo;
  } 

  getAll = async () => {
    try {

      let lista = await this.repo.getItems();

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
        
        const {name,price,thumbail} = await this.repo.getId(id);

        return {name,price,thumbail};
      }

      return { error: "Product not exist" };

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
            
      await this.repo.save(body);
      
      return body;
      
    } catch (error) {
      logger.error(`Error save ${error}`)
      throw Error(error);
    }
  };

   test = async () => {
    logger.info("Acceso por medio de graphql")
    return 'sample ';
  }

}

module.exports = GResolver;
