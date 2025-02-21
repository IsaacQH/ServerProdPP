
import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()  //Llama a las variables de entorno en .env

//Conection to db Render
const db = new Sequelize(process.env.DATABASE_URL)  //Funcion que se conecta con la base de datos

export default db