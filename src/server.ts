import express from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors'
import cors, {CorsOptions} from 'cors' // Importamos cors
import morgan from 'morgan'
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

//CORS - permitir conexiones
const corsOptions:CorsOptions = {
    origin: function(origin, callback){ //el origen dice quien conecta y la permite, callback niega la conexion
        if(origin === process.env.FRONTEND_URL){  //Variable de entorno de dominio/url permitido
            callback(null, true)   //Como se permite la coneccion el error es null y cor true
        }else{
            callback(new Error('Error de CORS'), false)
        }
    }
}

server.use(cors(corsOptions))  //Pemrite que los CORS se ejecuten con los metodos http (get, post etc)


//Leer datos de formularios
server.use(express.json()) //Habilita la lectura de los formualsios json

server.use(morgan('dev'))  //da unn codigo en respuesta de la peticion realizada al back

server.use('/api/products', router) //

//Prueba que la URL funcione y se llama un get para revisar la respuesta
/*server.get('/api', (req, res) =>{
    res.json({msg:'Desde API'})
}) */

//RUTA de Documentacion de API
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpect, swaggerUiOptions)) 

export default server