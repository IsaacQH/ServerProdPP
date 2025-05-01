import {exit} from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({force:true})  //Elimina todos los datos de la db
        console.log("Datos eliminados correctamente")
        exit()   //Finaliza correctamente
    } catch (error) {
        console.log(error)
        exit(1)  //Finaliza con  error
    }
}

if(process.argv[2] == '--clear'){   //Si usamos el comando XXXXX --clear entonces eliminara la base de datos
    clearDB()
}