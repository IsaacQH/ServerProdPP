
import { Router } from "express"
import { createProduct } from "./handlers/product"

const router = Router()    //sutituimos 

//Routing

router.get('/', (req, res)=> {    //GET
    res.json('Desde GET')
}) 

router.post('/', createProduct)    //POST usando funcion para crear productos en DB  

router.put('/', (req, res)=> {    //PUT
    res.json('Desde PUT')
}) 

router.patch('/', (req, res)=> {    //PATCH
    res.json('Desde PATCH')
}) 

router.delete('/', (req, res)=> {    //DELETE
    res.json('Desde DELETE')
}) 

export default router