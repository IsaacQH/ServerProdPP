
import {Request, Response} from 'express'
import Product from '../models/Product.models'

export const createProduct = async (req:Request, res:Response) => { //Definimos tipo de dato
    
    const product = await Product.create(req.body) //Creamos un objeto product con el input
    
    res.json({data: product})  //Asi mostramos en consola post el guardado con await para que se alcance a guardar el id
}