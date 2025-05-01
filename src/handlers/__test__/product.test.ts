import request from 'supertest'
import server from "../../server";
import { body } from 'express-validator';

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
    it('Should validate that price is not 0', async () => {
        const response = await request(server).post('/api/products').send({
            name : "Monitor - testing",
            price :0 
        }) //Envio un valor en price menor a 0 o 0
        
        expect(response.status).toBe(400)  //Esperamos que el error se haya caopturado para la validacion en caso de estar mal
        expect(response.body).toHaveProperty('errors')  //Esperamos la propiedad error al validar y revisar que funcione validacion
        expect(response.body.errors).toHaveLength(1)  //Revisa que propiedad errors tenga 4 subglosado
        //Casos contrarios
        expect(response.status).not.toBe(404)  
        expect(response.body.errors).not.toHaveLength(2) 
    })

    //Prueba que prodcuto sea numero y amyor a 0
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

describe('GET /api/products', () => {
    
    //Revisar que el URL exista
     it('GET a JSON response with products', async () => {  
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)  //Esperamos que el get sea successful
    })

    //Test par revisar que GET esta sirviendo y devuelve un JSON
    it('GET a JSON response with products', async () => {  
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)  //Esperamos que el get sea successful
        expect(response.headers['content-type']).toMatch(/json/) //Espera que nos devuelva un JSON
        expect(response.body).toHaveProperty('data')  //Espera que nos devuelva un JSON con parametro data
        expect(response.body.data).toHaveLength(1)  //Espera que data solo devuelva un lenght de 1
        //Casos contrarios
        expect(response.body).not.toHaveProperty('errors')  //Espera que nos devuelva un JSON con parametro data
    })
})

describe('GET /api/products/:id', () => {
    
    //Prueba que revisa que el ID NO EXISTE, por eso 2000
    it('Should return 404 response if the product does not exist', async () => {
        const productID = 2000
        const response = await request(server).get(`/api/products/${productID}`)  //Hacemos un get para el producto que testeamos

        expect(response.status).toBe(404)  //El producto no existe y debe de mandar 404 de no encontrado
        expect(response.body).toHaveProperty('error')  //Si el; prpoducto no existe debe ser 404
        expect(response.body.error).toBe('Producto no encontrado')  //Revisa que se depliegue el mensaje

    })

    //Prueba que revisa que el ID sea valido y numero o un URL no valido
    it('Should return 404 response if the product does not exist', async () => {
        const response = await request(server).get(`/api/products/not-valid-url`)  //Hacemos un get para el producto que testeamos

        expect(response.status).toBe(400)  //No exxiste el URL entonces regresa 400
        expect(response.body).toHaveProperty('errors')  //Si el; prpoducto no existe debe ser 404
        expect(response.body.errors).toHaveLength(1)  //Espera que errors solo devuelva un lenght de 1
        expect(response.body.errors[0].msg).toBe('ID no valido') //Revisa el mensaje en el arreglo/objeto errors
    })

    //Revisar si estamos obteniendo un producto
    it('GET a single response from a single product', async () => {
        const response = await request(server).get(`/api/products/1`)  //Hacemos un get para el producto que testeamos

        expect(response.status).toBe(200)  //Que exista el URL
        expect(response.body).toHaveProperty('data')  //Si el; prpoducto no existe debe ser 404
    })
})

describe('PUT /api/products/:id', () => {
    
    //Prueba que revisa que el url no sea valida pero se trate de ennviar el PUT con datos bien
    it('Should return 404 response if the product does not exist', async () => {
        const response = await request(server).put(`/api/products/not-valid-url`).send({
            name : "Samsung updated",
            price : 250,
            availability: false 
        })  //Hacemos un get para el producto que testeamos

        expect(response.status).toBe(400)  //No existe el URL entonces regresa 400
        expect(response.body).toHaveProperty('errors')  //Si el; prpoducto no existe debe ser 404
        expect(response.body.errors).toHaveLength(1)  //Espera que errors solo devuelva un lenght de 1
        expect(response.body.errors[0].msg).toBe('ID no valido') //Revisa el mensaje en el arreglo/objeto errors
    })

    //Prueba cuando el put no fue valido por enviarse vacio
    it('Should display validatiion error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})  //haemos un put y enviamos un vacio en put

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()  //Revisamos que al menos exista, no importa que sea el contenido
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
   
    //Prueba cuando el put no fue valido por un precio invalido
    it('Should validate that the price is greater than 0', async () => {
        const response = await request(server).put('/api/products/1').send({
            name : "Samsung updated",
            price : -250,
            availability: false
          })  //haemos un put y enviamos un vacio en put

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()  //Revisamos que al menos exista, no importa que sea el contenido
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Precio no valido')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    //Prueba el producto no existe pero en el put
    it('Should return 404 response for a non-existent product', async () => {
        const productID = 2000
        const response = await request(server).put(`/api/products/${productID}`).send({
            name : "Samsung updated",
            price : 250,
            availability: false
          })  //haemos un put y enviamos un vacio en put

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')  //Revisa que se depliegue el mensaje

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
})