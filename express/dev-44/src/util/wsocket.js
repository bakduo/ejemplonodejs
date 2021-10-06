'use strict'

const config = require('../config/index');

//DAO
const MessageDAO = require('../dao/message-dao');
const daoM = new MessageDAO(config.db);

//REPO strategy relational
const MessageRepo = require('../repository/message-repo');
const repo = new MessageRepo(daoM);

const ProductoDAO = require('../dao/producto-dao');

const repoProducto = new ProductoDAO(config.db);

const TOTAL = 100;

let contador = 0;

const normalizr = require("normalizr");

const schema = normalizr.schema;

const normalize = normalizr.normalize;

const logger = config.logger;

const SMService = require('../services/smsservice');

const sms = new SMService();

const originalData = {
        id: 'mensaje',
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

const MessageData = {
        id:'mensaje',
        mensajes:[
            {
            author: {
                email: 'mail del usuario' ,
                nombre: 'nombre del usuario' ,
                apellido: 'apellido del usuario' ,
                edad: 'edad del usuario' ,
                alias: 'alias del usuario' ,
                avatar: 'url avatar (foto, logo) del usuario'
            },
            comment: 'mensaje del usuario',
            tiempo: 'tiempo'
            },
            {
                author: {
                    email: 'mail del usuario' ,
                    nombre: 'nombre del usuario' ,
                    apellido: 'apellido del usuario' ,
                    edad: 'edad del usuario' ,
                    alias: 'alias del usuario' ,
                    avatar: 'url avatar (foto, logo) del usuario'
                },
                comment: 'mensaje del usuario',
                tiempo: 'tiempo'
            },
            {
            author: {
                email: 'mail del usuario' ,
                nombre: 'nombre del usuario' ,
                apellido: 'apellido del usuario' ,
                edad: 'edad del usuario' ,
                alias: 'alias del usuario' ,
                avatar: 'url avatar (foto, logo) del usuario'
            },
            comment: 'mensaje del usuario',
            tiempo: 'tiempo'
            },
        ]
}

const comment = new schema.Entity('comment',{});
const author = new schema.Entity('author',{comment},{idAttribute: 'email'});
const mensaje = new schema.Entity('mensaje',{
    assignee:author,
    comment
});

const posts = new schema.Entity('posts',{
    assignee:[mensaje],
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

            await repoProducto.save(producto)

            const items  = await repoProducto.getItems();

            //client
            canal.emit("renderproductos",items);
            //all broadcast
            canal.broadcast.emit("renderproductos",items);
        });

        canal.on("getproductos",async (data)=>{
            //client

            const items  = await repoProducto.getItems();

            canal.emit("renderproductos",items);
        });

        canal.on("getmsg",async (data)=>{
            //client
            const items = await repo.find();

            //Normalizr

            const transform = items.map((item)=>{
                return {author:{
                        nombre: item.author.nombre,
                        apellido: item.author.apellido,
                        email: item.author.email,
                        alias: item.author.alias,
                        avatar: item.author.avatar,
                        edad: item.author.edad
                      },
                      comment:item.comment,
                      tiempo:item.tiempo,
                }});

            const MessageDataOrig = {
                id:'mensaje',
                mensajes: transform
            }

            const normalizedMessageDataOrig = normalize(MessageDataOrig, posts);

            const outNorma = JSON.stringify(normalizedMessageDataOrig, null, 3);

            canal.emit("rendermsg",outNorma);
        });

        canal.on("appendmsg",async (data) =>{

            let  feedback = {};

            if (contador < TOTAL){
                
                const dataNorma = getData(data.normalizer);

                feedback = {
                    tiempo:data.tiempo,
                    normalizer: dataNorma
                }

                const obj = JSON.parse(dataNorma);
                const mensajeCustom = {}
                mensajeCustom.author = obj.entities.mensaje.mensaje.author,
                mensajeCustom.tiempo = data.tiempo;
                mensajeCustom.comment = obj.entities.mensaje.mensaje.comment;

                if (mensajeCustom.comment.indexOf('administrador')){
                    logger.info("###############Administrador detectado para procesadr#############");
                    const texto ="Quien lo envio: " + mensajeCustom.author.nombre+ "email: "+mensajeCustom.author.email+ " Texto: "+mensajeCustom.comment
                    if (process.env.TEST_PHONE){
                        try {
                            logger.info("########SMS: "+texto+"#################");
                            sms.send(texto,process.env.TEST_PHONE);
                        } catch (error) {
                            logger.error(error);
                            throw new Error("Error al enviar SMS");
                        }
                        
                    }else{
                        logger.error("No es posible enviar SMS sin un Telefono");
                    }
                    logger.info("###############Administrador procesado, finalizado#############");
                    
                }
                await repo.create(mensajeCustom);

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