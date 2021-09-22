class ProductoDTO {

    constructor({id,name,price,thumbail}){
        this.id=id;
        this.name=name;
        this.price=price;
        this.thumbail=thumbail;
    }

    getId(){
        return this.id;
    }
    getName(){
        return this.name
    }
    getPrice(){
        return this.price;
    }

    getThumbail(){
        return this.thumbail;
    }
}

module.exports = ProductoDTO;