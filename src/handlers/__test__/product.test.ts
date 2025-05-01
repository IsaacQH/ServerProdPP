import request from 'supertest'
import server from "../../server";

describe('POST /api/products', () => {
    
    //Prueba de validacion de datos antes de postear
    it('Should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({}) //Envio un valor vacio, no manda name ni price
        
        expect(response.status).toBe(400)  //Esperamos que el error se haya caopturado para la validacion en caso de estar mal
        expect(response.body).toHaveProperty('errors')  //Esperamos la propiedad error al validar y revisar que funcione validacion
        expect(response.body.errors).toHaveLength(4)  //Revisa que propiedad errors tenga 4 subglosado
        //Casos contrarios
        expect(response.status).not.toBe(404)  
        expect(response.body.errors).not.toHaveLength(2)  
    })
    
    //Prueba que prodcuto sea mayor a 0 antes de postear
    it('Should validate that price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name : "Monitor - testing",
            price :"HOLA" 
        }) //Envio un valor en price menor a 0 o 0
        
        expect(response.status).toBe(400)  //Esperamos que el error se haya caopturado para la validacion en caso de estar mal
        expect(response.body).toHaveProperty('errors')  //Esperamos la propiedad error al validar y revisar que funcione validacion
        expect(response.body.errors).toHaveLength(2)  //Revisa que propiedad errors tenga 4 subglosado
        //Casos contrarios
        expect(response.status).not.toBe(404)  
        expect(response.body.errors).not.toHaveLength(4) 
    })

    //Prueba para verificar estado del POST a Producto
    it('Should create a new product', async ()=> {  //Funcion asincrona para no detener codigo
        const response = await request(server).post('/api/products').send({  //Esperamos la respuesta al mandar simulacion de un post al Endpoint
            name : "prueba - testing",
            price : 300 
        })

        expect(response.status).toEqual(201)  //Espera que el HTTP retorne un 201 de creado (REVISAR CODIGOS)
        expect(response.body).toHaveProperty('data')  //Revisamos que sea data el tipo de json creado
        //Casos contrarios
        expect(response.status).not.toEqual(404)  //Espera que no retnrone status 404
        expect(response.status).not.toEqual(200)  //Espera que no retnrone status 200
        expect(response.body).not.toHaveProperty('errors')  //Revisamos que no haya propiedad errors
    })
})