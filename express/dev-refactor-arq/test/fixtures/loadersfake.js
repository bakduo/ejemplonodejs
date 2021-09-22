const faker = require('faker')

CANT=5;

let productos = [];

const getOne = () =>{
    return {
        name:faker.commerce.productName(),
        thumbail:faker.image.imageUrl(),
        price:faker.commerce.price(),
    };
}

const load= () =>{
    for(let i =0;i<CANT;i++){
        productos.push({
            name:faker.commerce.productName(),
            thumbail:faker.image.imageUrl(),
            price:faker.commerce.price(),
        });
    }
    return productos;
}

const clear= () => {
    productos = [];
    return productos;
}

module.exports = {
    load,
    clear,
    getOne
}