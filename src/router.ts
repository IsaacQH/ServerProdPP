
import { Router } from "express"
import { createProduct, getProducts, getProductByID, updateProduct, updateAvailability, deleteProduct } from "./handlers/product"
import {body, param} from 'express-validator'
import { handleInputsErrors } from "./middleware"

const router = Router()    //sutituimos 

//DOCUMENTACION API DE SCHEMA
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  decription: The Product ID
 *                  example: 1
 *              name:
 *                  type: integer
 *                  description: The Product name
 *                  example: LG Monitor 17
 *              price:
 *                  type: number
 *                  description: The Product price
 *                  example: 300
 *              availability:
 *                  type: boolean
 *                  description: The Producr availability
 *                  example: true
 *               
 */

//DOCUMENTACION API DE GET PRODUCTS
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */ 

//Routing
router.get('/', getProducts)   //GET para obtener productos

//DOCUMENTACION API DE GET PRODUCTS
/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product base on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad Request - Invalid ID
*/
router.get('/:id',   //GET para obtener unn  producto
    param('id').isInt().withMessage('ID no valido'),
    handleInputsErrors,
    getProductByID)   
     

//DOCUMENTACION API POST PRODUCTS
/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo 30"
 *                              price:
 *                                  type: number
 *                                  example: 396   
 *          responses:
 *               201:
 *                  description: Product created successfully
 *               400:          
 *                  description: Bad Request - invalid input data
 */
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



//DOCUMENTACION DE API PUT ACTUALIZAR
/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a Product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated products
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Actualizado Monitor Curvo 30"
 *                              price:
 *                                  type: number
 *                                  example: 396 
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found  
 *      
 */
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


//DOCUMENTACION DE API PATCH
/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update product availability
 *          tags:
 *              - Products
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found       
 */
router.patch('/:id',      //PATCH Actualizamos solo la disponibilidad
    param('id').isInt().withMessage('ID no valido'),
    handleInputsErrors,
    updateAvailability) 


//DOCUMENTACION DE API DELETE
/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete product by ID
 *          tags:
 *              - Products
 *          description: Returns a string that product was deleted
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: Producto eliminado
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found         
 */
router.delete('/:id',       //DELETE Borramos productos
    param('id').isInt().withMessage('ID no valido'),
    handleInputsErrors,
    deleteProduct
) 

export default router