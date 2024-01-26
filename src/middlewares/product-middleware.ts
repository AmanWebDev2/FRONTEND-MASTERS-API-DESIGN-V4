import { body, validationResult } from "express-validator"

export const productValidationRules =()=>{
    return [
        body('name').notEmpty().withMessage('name cannot be empty')
    ]

}

export const validateProduct=(req,res,next)=>{
    const errors = validationResult(req)

    if(errors.isEmpty()) {
        next()
        return
    }
    
    const extractedErrors = []

    // errors.array().forEach(err => extractedErrors.push({msg:err.msg}))

    return res.status(422).json({
        success:false,
        errors:errors.array()
    })
}