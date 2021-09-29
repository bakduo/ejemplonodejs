class ProductoDTO {

    #id
    #name
    #price
    #thumbail
    
    constructor({id,name,price,thumbail}){
        this.#id=id;
        this.#name=name;
        this.#price=price;
        this.#thumbail=thumbail;
    }

    getId(){
        return this.#id;
    }
    getName(){
        return this.#name
    }
    getPrice(){
        return this.#price;
    }

    getThumbail(){
        return this.#thumbail;
    }

    toJson(){
        return {
            id:this.getId(),
            price:this.getPrice(),
            name:this.getName(),
            thumbail:this.getThumbail()
        }
    }
}

module.exports = ProductoDTO;