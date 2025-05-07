
import request from "supertest";
import server, {connectDB} from "../server";
import db from "../config/db";

describe('GET /api', () => {
    it('Should send back a json response', async () => {
        const res = await request(server).get('/api')  //guarda el valor al ahcer request en el get con json
        
        expect(res.status).toBe(200)   //Espera que reciba un estado 200
        expect(res.headers['content-type']).toMatch(/json/) //Espera que recioba un json (lo que sea)
        expect(res.body.msg).toBe('Desde API') //Espera a que el objeto json res de el msg

        expect(res.status).not.toBe(404)   //Espera que no reciba 404
        expect(res.body.msg).not.toBe('desde api') //Espera a que el objeto json res de el msg
    })
})

jest.mock('../config/db')  //Creamos el mock de la base de datos

describe('Connect DB', () => {
    it('Should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')  //Revisa que authentique al igual que en el codigo real
                                     .mockRejectedValueOnce(new Error('Hubo un error en la base de datos'))  //Forza el error
        const consoleSpy =  jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith((
            expect.stringContaining('Hubo un error en la base de datos')
        ))
    })
})