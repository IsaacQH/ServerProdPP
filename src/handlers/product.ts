
import {Request, Response} from 'express'
import Product from '../models/Product.models'

//Funcion para obtener los productos
export const getProducts = async (req:Request, res:Response) =>{
    try {
        const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            attributes: { exclude:['createdAt', 'updatedAt', 'price']}
        }) //Buscamos todos los productos
        res.json({data:products})
    } catch (error) {
        console.log(error)
    }
}


//Funcion para obtener un producto por su ID
export const getProductByID = async (req:Request, res:Response) =>{
    try {
        const {id} = req.params  //Extraemos con destructuracion el id
        const product = await Product.findByPk(id)
        //Comprobamos que exista el producto
        if(!product){
            res.status(404).json({error: 'Producto no encontrado'})
            return
        }

        res.json({data:product})
    } catch (error) {
        console.log(error)
    }
}

//Funcion para crear productos
export const createProduct = async (req:Request, res:Response) => { //Definimos tipo de dato
    try {
        const product = await Product.create(req.body) //Creamos un objeto product con el input
        res.status(201).json({data:product})
    } catch (error) {
        console.log(error)
    }
}


//Funcion para actualizar productos
export const updateProduct = async (req:Request, res:Response) => { //Definimos tipo de dato
    try {
        const {id} = req.params  //Extraemos con destructuracion el id
        const product = await Product.findByPk(id)
        //Comprobamos que exista el producto
        if(!product){
            res.status(404).json({error: 'Producto no encontrado'})
            return
        }
        res.json({data:product})

        //Actualizar los datos con lo que hay en req
        await product.update(req.body)  //Actualiza el valor de variable product
        await product.save()  //Guarda en la abse de datos

    } catch (error) {
        console.log(error)
    }
}


//Funcion para actualizar disponibilidad
export const updateAvailability = async (req:Request, res:Response) => { //Definimos tipo de dato
    try {
        const {id} = req.params  //Extraemos con destructuracion el id
        const product = await Product.findByPk(id)
        //Comprobamos que exista el producto
        if(!product){
            res.status(404).json({error: 'Producto no encontrado'})
            return
        }

        //Actualizar
        product.availability = !product.dataValues.availability  //solo el valor pasado de disponibilidad
        await product.save()  //Guarda en la abse de datos
        res.json({data:product})

    } catch (error) {
        console.log(error)
    }
}


//Funcion para borrar producto
export const deleteProduct = async (req:Request, res:Response) => { //Definimos tipo de dato
    try {
        const {id} = req.params  //Extraemos con destructuracion el id
        const product = await Product.findByPk(id)
        //Comprobamos que exista el producto
        if(!product){
            res.status(404).json({error: 'Producto no encontrado'})
            return
        }

    await product.destroy()  //Eliminar en la pagina de datos
    res.json({data: 'Producto eliminado'})

    } catch (error) {
        console.log(error)
    }
}