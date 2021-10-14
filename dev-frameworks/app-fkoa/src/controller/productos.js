const config = require('../config/index');
const logger = config.logger;

const ApiProductos = require('../api/api-productos');

class ProductoController {
  constructor(productosDao) {
    this.api = new ApiProductos(productosDao);
  }

  getAll = async (ctx,next) => {
    try {
      const lista = await this.api.getAll();
      if (lista) {
        ctx.body = {lista};
      }else{
        ctx.status=404;
        ctx.body="Products empty";
      }
      next()
    } catch (error) {
      logger.error(`Error getAll ${error}`)
      throw Error(error);
    }
  };

  save = async (ctx,next) => {
    try {
      if (ctx.request.body) {
        const producto = await this.api.add(ctx.request.body);
        if (producto){
          ctx.status = 201;
          ctx.body = ctx.request.body
        }else{
          ctx.status=422;
          ctx.body = "Producto incompatible";
        }
      }else{
        ctx.status = 400;
        ctx.body = "Recurso incompatible";
      }
      next();
    } catch (error) {
      logger.error(`Error save ${error}`)
      throw Error(error);
    }
  };

  get = async (ctx, next) => {
    try {
      if (ctx.params.id) {
        const producto = await this.api.getOne(ctx.params.id);
        if (producto){
          ctx.status = 200;
          ctx.body = producto;
        }else{
          ctx.status = 404;
          ctx.body = "Producto no existe";
        }
      }else{
        ctx.status = 400;
        ctx.body = "Debe ingresar al menos un parametros de busqueda";
      }
      next();
    } catch (error) {
      logger.error(`Error get ${error}`)
      throw Error(error);
    }
  };

  update = async (ctx, next) => {
    try {
      if (ctx.params.id) {
        const update = await this.api.update(ctx.params.id,ctx.request.body);
        if (update){
          ctx.status = 200;
          ctx.body = ctx.request.body;
        }else{
          ctx.status = 304;
          ctx.body = "Producto no actualizado";
        }
      }else{
        ctx.status = 400;
        ctx.body = "Debe ingresar al menos un parametro que referencia al producto";
      }
      next()
    } catch (error) {
      logger.error(`Error update ${error}`);
      throw Error(error);
    }
  };

  delete = async (ctx, next) => {
    try {
      if (ctx.params.id) {
        const producto = await this.api.deleteOne(ctx.params.id);
        if (producto) {
          ctx.status = 200;
          ctx.body = producto.toJsonPublic();
        }else{
          logger.info(`producto no se puede eliminar ${ctx.params.id}`)
          ctx.status = 404;
          ctx.body = {status:"Producto no encontrado para eliminar"};
        }
      }else{
        ctx.status = 404;
        ctx.body = {status:"Debe ingresar al menos un parametro que referencia el producto a eliminar."};
      }
      next();
    } catch (error) {
      logger.error(`Error delete ${error}`);
      throw Error("No es posible eliminar el producto");
    }
  };

  deleteAll = async (ctx,next) => {
    await this.api.deleteAll();
    ctx.status = 200;
    ctx.body = {status:"Todos los productos eliminados."};
  }
}

module.exports = ProductoController;
