
import { Response, Request, NextFunction } from "express"
import { validationResult } from 'express-validator'

export const handleInputsErrors = (req:Request , res:Response, next:NextFunction) => {
    
    let errors = validationResult(req)
    if(!errors.isEmpty()){  //Si hay errores(no esta vavio, is not empty)
      res.status(400).json({errors: errors.array()})  //Hay un error en el cliente
      return 
    }
    next()
}
