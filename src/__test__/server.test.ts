
import request from "supertest";
import server from "../server";

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