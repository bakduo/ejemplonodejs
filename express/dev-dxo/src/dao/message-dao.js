const GenericDAO = require('./generic-dao');

const MessageDTO = require('../dto/message-dto');

class MessageDAO extends GenericDAO {
  static instancia;

  constructor(datasource) {
    if (!!MessageDAO.instancia) {
      return MessageDAO.instancia;
    }

    super(datasource);

    this.init();

    this.name = 'mensajes';

    this.loadConfiguration(this);

    MessageDAO.instancia = this;

  }

  getName() {
    return this.name;
  }


  //Only for compatibility SQL (don't create two table for lazy) / (mongo and normalize)

  save = async (mensaje)=>{
    if (this.data.getType()=="sqlite" ||this.data.getType()=="mysql"){
      //descomposition mongo
        const mensjeSQL = {
          nombre:mensaje.author.nombre,
          apellido:mensaje.author.apellido,
          email:mensaje.author.email,
          alias:mensaje.author.alias,
          edad:mensaje.author.edad,
          comment:mensaje.comment,
          tiempo:mensaje.tiempo,
          avatar:mensaje.avatar
        }

        const mdto = new MessageDTO(mensjeSQL);
        await this.items.save(mdto.toJson());

    }else{
      await this.items.save(mensaje);
    }
  }

  getItems = async ()=>{
      if (this.data.getType()=="sqlite" || this.data.getType()=="mysql"){
        const itemsLocal = await this.items.getItems();
        const resultado = itemsLocal.map((item)=>{

          const mdto = new MessageDTO(item);

          return {
            author:{
            nombre: mdto.getNombre(),
            apellido: mdto.getApellido(),
            email: mdto.getEmail(),
            alias: mdto.getAlias(),
            avatar: mdto.getAvatar(),
            edad: mdto.getEdad()
          },
          comment:mdto.getComment(),
          tiempo:mdto.getTiempo(),
          }
        });
        return resultado;
    }else{
      return this.items.getItems();
    }
  }
}

module.exports = MessageDAO;