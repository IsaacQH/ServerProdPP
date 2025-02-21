
import server from "./server";
import colors from'colors'

const port = process.env.PORT || 4000  //Asignamos el pueto pero dejamos 4000 de default, porque el deployment asigna el puerto y no tu 

server.listen(port, () => {
    console.log(colors.cyan.bold('REST API en puerto 4000'))
})