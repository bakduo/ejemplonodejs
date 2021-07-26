
const Producto = require('../model/producto');

const Mensaje = require('../model/mensaje');

const TOTAL = 100;

let contador = 0;

const normalizr = require("normalizr");

const schema = normalizr.schema;

const normalize = normalizr.normalize;

var originalData = {
    id:'mensaje',    
        author: {
            email: 'mail del usuario' ,
            nombre: 'nombre del usuario' ,
            apellido: 'apellido del usuario' ,
            edad: 'edad del usuario' ,
            alias: 'alias del usuario' ,
            avatar: 'url avatar (foto, logo) del usuario'
        },
        comment: 'mensaje del usuario',
    }

const comment = new schema.Entity('comment',{});
const author = new schema.Entity('author',{comment},{idAttribute: 'email'});
const mensaje = new schema.Entity('mensaje',{
    assignee:author,
    comment
});

function getData(data){

    const out = JSON.stringify(data, null, 2);

    return out;
}

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
                name: data.name,
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
                
                const dataNorma = getData(data.normalizer);

                feedback = {
                    tiempo:data.tiempo,
                    normalizer: dataNorma
                }

                // feedback = {
                //     msg:data.msg,
                //     tiempo:data.tiempo,
                //     user:data.user
                // }

                const obj = JSON.parse(dataNorma);
                const mensajeCustom = {}
                mensajeCustom.author = obj.entities.mensaje.mensaje.author,
                mensajeCustom.tiempo = data.tiempo;
                mensajeCustom.comment = obj.entities.mensaje.mensaje.comment;

                console.log(mensajeCustom);

                const m = new Mensaje(mensajeCustom);
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