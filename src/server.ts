import express from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors'
import swaggerUi from "swagger-ui-express";
import swaggerSpect, {swaggerUiOptions} from "./config/swagger";

//Conectamos a la base de datos con una funcion asincrona
export async function connectDB() {
    try{
        await db.authenticate()  //Autentica con la base de datos que exista y el link dde coneccion
        db.sync()  //Ira agregando todo lo anadido a la DB
        //console.log(colors.magenta('Conectado a la base de datos'))
    } catch(error){
        //console.log(error)
        console.log(colors.red('Hubo un error en la base de datos'))
    }
}

connectDB()

//Instancia de express
const server = express() //Este sera el servidor de la aplicacion

//Leer datos de formularios
server.use(express.json()) //Habilita la lectura de los formualsios json

server.use('/api/products', router) //

//Prueba que la URL funcione y se llama un get para revisar la respuesta
/*server.get('/api', (req, res) =>{
    res.json({msg:'Desde API'})
}) */

//RUTA de Documentacion de API
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpect, swaggerUiOptions)) 

export default server