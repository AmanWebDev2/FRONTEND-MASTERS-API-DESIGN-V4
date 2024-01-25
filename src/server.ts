import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import router from './routes/index'
import config from './config/index'
import { protect } from './modules/auth'
import { createUser, singIn } from './controllers/user-controller'

const app = express()


app.use(cors()) // tell the browser who can access the api, by default api is available publically
app.use(morgan('dev'))
app.use(express.json()) // allow client to send use json
app.use(express.urlencoded({extended: true})) // means we can extract query params easily like an object

// custom middleware and access to any request
app.use((req,res,next)=>{
    req.secret = "aman";
    next(); // hawlt the api call if next is not called
})

app.use('/api',protect,router)
app.use('/sign-up',createUser)
app.use('/sign-in',singIn)

app.listen(config.PORT,()=>{
    console.log(`server is listening on http://localhost:${config.PORT}`)
})


// adding property to Request object
declare global {
    namespace Express {
        interface Request {
            secret: string
        }
    }
}

/**
 * Primsa --> cli
 * Prisma/client --> orm, used to talk to database
 * npx prisma init
 * npx prisma migrate dev --name init
 * npx prisma format
 * npx prisma studio --> visual representation of database 
 */