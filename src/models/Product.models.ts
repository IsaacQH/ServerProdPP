
import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
    tableName:'productos'
})

class Product extends Model{       // Definimos el modelo del producto
    @Column({
        type: DataType.STRING(100)  //Definimos el tipo de dato y el numero de carateres
    })
    declare name:string

    @Column({
        type: DataType.FLOAT(6,2)  //Definimos el tipo de dato y el numero de carateres
    })
    declare price: number

    @Default(true)  //Colocamos el valor default en true
    @Column({
        type: DataType.BOOLEAN  //Definimos el tipo de dato y el numero de carateres
    })
    declare availability: boolean
}

export default Product