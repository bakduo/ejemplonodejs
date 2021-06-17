
const ProductService = require('../services/product-sevice.js');

const service = new ProductService();

class WSocket {
    
    cs = null;

    constructor(socket){
        this.cs = socket;
    }

    init(){

        this.cs.on('connection',async (canal) => {
            
            canal.on("procesar",data=>{

                const producto = {
                    title: data.title,
                    price: data.price,
                    thumbail: data.thumbail
                }

                service.addProducto(producto);

                const items = service.getProductos();

                //client
                canal.emit("renderproductos",items);
                //all broadcast
                canal.broadcast.emit("renderproductos",items);

            })

            //TODO fix
            canal.on("getProductos",data=>{
                console.log("getproductos");
            })


        })
    }

}

module.exports = WSocket;