
import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'

dotenv.config()  //Llama a las variables de entorno en .env

//Conection to db Render
const db = new Sequelize(process.env.DATABASE_URL, {    //Funcion que se conecta con la base de datos
    models: [__dirname + '/../models/**/*'],
    logging:false  //para poder correr test i no imprimir todo TEMP
}) 

export default db


