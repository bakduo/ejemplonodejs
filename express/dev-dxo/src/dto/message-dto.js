class MessageDTO {

    constructor({nombre,apellido,email,alias,edad,comment,avatar,tiempo}){
        this.nombre=nombre;
        this.apellido=apellido;
        this.email=email;
        this.alias=alias;
        this.edad=edad;
        this.comment=comment;
        this.tiempo = tiempo;
        this.avatar = avatar;
    }

    getAlias(){
        return this.alias;
    }

    getAvatar(){
        return this.avatar;
    }

    getNombre(){
        return this.nombre;
    }
    getApellido(){
        return this.apellido;
    }
    getEmail(){
        return this.email;
    }
    getEdad(){
        return this.edad;
    }
    getComment(){
        return this.comment;
    }

    getTiempo(){
        return this.tiempo;
    }

    toJson(){
        return {
            nombre:this.nombre,
            apellido:this.apellido,
            email:this.email,
            alias:this.alias,
            edad:this.edad,
            comment:this.comment,
            tiempo:this.tiempo,
            avatar:this.avatar
        }
    }

}

module.exports = MessageDTO;