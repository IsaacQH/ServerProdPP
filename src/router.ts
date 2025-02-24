
import { Router } from "express"
import { createProduct, getProducts, getProductByID, updateProduct, updateAvailability, deleteProduct } from "./handlers/product"
import {body, param} from 'express-validator'
import { handleInputsErrors } from "./middleware"

const router = Router()    //sutituimos 

//Routing

router.get('/', getProducts)   //GET para obtener productos

router.get('/:id',   //GET para obtener unn  producto
    param('id').isInt().withMessage('ID no valido'),
    handleInputsErrors,
    getProductByID)   
     

router.post('/', //POST usando funcion para crear productos en DB  
    //Validacion de datos
    body('name')        //Checa que nombre exista 
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),  //Se pueden customizar con callbacks
    handleInputsErrors,
    createProduct
)    

router.put('/:id',         // PUT Actualizamos todos los datos
    //Validacion de datos
    param('id').isInt().withMessage('ID no valido'),
    body('name')        //Checa que nombre exista 
       .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
       .isNumeric().withMessage('Valor no valido')
       .notEmpty().withMessage('El precio del producto no puede ir vacio')
       .custom(value => value > 0).withMessage('Precio no valido'),  //Se pueden customizar con callbacks
    body('availability')        //Checa que nombre exista 
       .isBoolean().withMessage('La disponibilidad no puede ir vacio'),
    handleInputsErrors,
    updateProduct) 

router.patch('/:id',      //PATCH Actualizamos solo la disponibilidad
    param('id').isInt().withMessage('ID no valido'),
    handleInputsErrors,
    updateAvailability) 

router.delete('/:id',       //DELETE Borramos productos
    param('id').isInt().withMessage('ID no valido'),
    handleInputsErrors,
    deleteProduct
) 

export default router