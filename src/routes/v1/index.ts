import express from 'express'
import { createUser} from '../../controllers/user-controller'
import { productValidationRules, validateProduct } from '../../middlewares/product-middleware';
import { param, query } from 'express-validator';

const router = express.Router();

// users
router.post('/user',createUser)


// products

router.get('/product',productValidationRules(),validateProduct,(req,res)=>{
    res.status(200).json({
        data:req.secret
    })
})

router.get('/product/:id',param('id').isNumeric().withMessage('invalid product id'),validateProduct,(req,res)=>{
    res.status(222).json({
        "name":"df"
    })
})

router.put('/product/:id',(req,res)=>{

})

router.post('/product',(req,res)=>{

})

router.delete('/product/:id',(req,res)=>{

})


//Update


router.get('/update/:id',(req,res)=>{

})

router.put('/update/:id',(req,res)=>{

})

router.post('/update',(req,res)=>{

})

router.delete('/update/:id',(req,res)=>{

})

// update points

router.get('/updatepoint/:id',(req,res)=>{

})

router.put('/updatepoint/:id',(req,res)=>{

})

router.post('/updatepoint',(req,res)=>{

})

router.delete('/updatepoint/:id',(req,res)=>{

})
export default router;