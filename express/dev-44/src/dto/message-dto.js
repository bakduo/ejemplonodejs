class MessageDTO {

    #nombre
    #apellido
    #email
    #alias
    #edad
    #comment
    #tiempo
    #avatar
    
    constructor({nombre,apellido,email,alias,edad,comment,avatar,tiempo}){
        this.#nombre=nombre;
        this.#apellido=apellido;
        this.#email=email;
        this.#alias=alias;
        this.#edad=edad;
        this.#comment=comment;
        this.#tiempo = tiempo;
        this.#avatar = avatar;
    }

    getAlias(){
        return this.#alias;
    }

    getAvatar(){
        return this.#avatar;
    }

    getNombre(){
        return this.#nombre;
    }
    getApellido(){
        return this.#apellido;
    }
    getEmail(){
        return this.#email;
    }
    getEdad(){
        return this.#edad;
    }
    getComment(){
        return this.#comment;
    }

    getTiempo(){
        return this.#tiempo;
    }

    toJson(){
        return {
            nombre:this.getNombre(),
            apellido:this.getApellido(),
            email:this.getEmail(),
            alias:this.getAlias(),
            edad:this.getEdad(),
            comment:this.getComment(),
            tiempo:this.getTiempo(),
            avatar:this.getAvatar()
        }
    }

}

module.exports = MessageDTO;