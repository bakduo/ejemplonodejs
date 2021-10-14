const GenericDAO = require('./generic-dao');

const ProductoDTO = require('../dto/producto-dto');

class ProductoDAO extends GenericDAO {
  static instancia;

  constructor(datasource) {
    if (!!ProductoDAO.instancia) {
      return ProductoDAO.instancia;
    }

    super(datasource);

    this.name = 'productos';

    this.init();

    this.loadConfiguration(this);

    ProductoDAO.instancia = this;

  }

  getName() {
    return this.name;
  }

  //TODO Refactor

  save = async (obj) =>{
    //pre or post
    const item = await this.items.save(obj);
    return new ProductoDTO(item);
  }

  updateById = async (id,obj) =>{
    //pre or post
    const item = await this.items.updateById(id,obj);
    return new ProductoDTO(item);
  }

  getId = async (id) =>{
    //pre or post
    const item = await this.items.getId(id);
    return new ProductoDTO(item);
  }
  
}

module.exports = ProductoDAO;
