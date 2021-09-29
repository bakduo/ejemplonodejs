const config = require('../src/config/index');
config.server.dbtype = "memory";
config.rebuild();

const app = require('../src/server');


const request = require('supertest')(app);
const { expect } = require('chai');
const ProductoDAO = require('../src/dao/producto-dao');
const repo = new ProductoDAO(config.db);
const testRecords = require('./fixtures/loadersfake');

let productosFake = [];
let productoPost = undefined;

describe('API productos UNIT',() => {
    
    before(function(){
        console.log("###############BEGIN TEST#################");
        productosFake = testRecords.load();
    })

    after(async () => {

        console.log("###############CLEAR DB TEST#################");
    })

    //Load datastore
    beforeEach(async () => {
        const load = async () => {
            productosFake.forEach(async (item)=>{
                await repo.save(item);
            })
        }
        await load();
    });

    //Clean datastore
    afterEach(async () => {
        const clear = async () =>{
            productosFake.forEach(async (item)=>{
                const p = await repo.find({query: {'key':'name','value':item.name}});
                if (p){
                    const borrado = await repo.deleteById(p.id);
                }
            })
        }
        await clear();   
    });
 
    describe('GET productos', () => {
        it('debería retornar lista de productos', async () => {
            let response = await request.get('/api/productos/listar')
            expect(response.status).to.eql(200);
            const productos = response.body;
            expect(productos).to.be.a('array');
            expect(productos).length.greaterThanOrEqual(5);
        });
    })

    describe('POST producto', () => {
        it('debería incorporar un producto', async () => {
            productoPost = testRecords.getOne();
            let response = await request.post('/api/productos/guardar').send(productoPost)
            expect(response.status).to.eql(201)
            const productoSave = response.body
            expect(productoSave).to.include.keys('price','name','thumbail')
            expect(productoSave.price).to.eql(productoPost.price)
            expect(productoSave.thumbail).to.eql(productoPost.thumbail)
            expect(productoSave.name).to.eql(productoPost.name);
        })
    })

    describe('Update producto', () => {
        it('debería actualizar un producto', async () => {
            const p = await repo.find({query: {'key':'name','value':productoPost.name}});
            productoPost.name = 'update';
            productoPost.price= 22222; 
            let response = await request.put(`/api/productos/actualizar/${p.id}`).send(productoPost);
            expect(response.status).to.eql(200)
            const productoSave = response.body
            expect(productoSave).to.include.keys('price','name','thumbail')
            expect(productoSave.price).to.eql(productoPost.price)
            expect(productoSave.thumbail).to.eql(productoPost.thumbail)
            expect(productoSave.name).to.eql(productoPost.name);
        });
    })

    describe('Get producto by id', () => {
        it('debería obtener un producto por id', async () => {
            const p = await repo.find({query: {'key':'name','value':productoPost.name}});

            let response = await request.get(`/api/productos/listar/${p.id}`).send();
            expect(response.status).to.eql(200)
            const productoSave=response.body
            expect(productoSave).to.include.keys('price','name','thumbail')
            expect(productoSave.price).to.eql(productoPost.price)
            expect(productoSave.thumbail).to.eql(productoPost.thumbail)
            expect(productoSave.name).to.eql(productoPost.name);
        });
    })

    describe('Delete producto', () => {
        it('debería eliminar un producto', async () => {
            const p = await repo.find({query: {'key':'name','value':productoPost.name}});
            let response = await request.delete(`/api/productos/borrar/${p.id}`).send();
            expect(response.status).to.eql(200)
            const productoDelete= response.body
            expect(productoDelete).to.include.keys('price','name','thumbail')
            expect(productoDelete.price).to.eql(productoPost.price)
            expect(productoDelete.thumbail).to.eql(productoPost.thumbail)
            expect(productoDelete.name).to.eql(productoPost.name);
            // expect(productoDelete).to.include.keys('deletedCount','ok','n')
            // expect(productoDelete.deletedCount).to.eql(1)
            // expect(productoDelete.n).to.eql(1)
            // expect(productoDelete.ok).to.eql(1);
        });
    })

});