
const Producto = require('../model/producto');

const Mensaje = require('../model/mensaje');

const TOTAL = 100;

let contador = 0;

class WSocket {
    
    cs = null;

    clients = null;

    constructor(socket){

        this.cs = socket;
        
        this.clients = [];

    }

    addClient(client){

        this.clients.push(client);
    }

    closeAll(){
        
        this.clients.forEach(element => {
            element.close();
        });

    }

    getClient(id){
        
        const clientIndex = this.clients.findIndex((con)=>con.id === id);
        if (clientIndex>=0){
            return this.clients[clientIndex];
        }
        return null;
    }

    async addOperation(canal){

        canal.on("procesar",async (data)=>{
            const producto = {
                title: data.title,
                price: data.price,
                thumbail: data.thumbail
            }

            const p = new Producto(producto);

            await p.save();

            const items = await Producto.find();
            //client
            canal.emit("renderproductos",items);
            //all broadcast
            canal.broadcast.emit("renderproductos",items);
        });

        canal.on("getproductos",async (data)=>{
            //client
            const items = await Producto.find();

            canal.emit("renderproductos",items);
        });

        canal.on("getmsg",async (data)=>{
            //client
            const items = await Mensaje.find();
            canal.emit("rendermsg",items);
        });

        canal.on("appendmsg",async (data) =>{

            let  feedback = {};

            if (contador < TOTAL){
                
                feedback = {
                    msg:data.msg,
                    tiempo:data.tiempo,
                    user:data.user
                }

                const m = new Mensaje(feedback);
                
                await m.save();

                canal.broadcast.emit("reloadmsg",feedback);

                contador++
            }else{
                canal.emit("overflow",{});
            }
        })

    }


    init(){

        this.cs.on('connection',async (canal) => {
            this.addOperation(canal); 
            canal.emit("getClient",{});
            
        });
    }

}

module.exports = WSocket;