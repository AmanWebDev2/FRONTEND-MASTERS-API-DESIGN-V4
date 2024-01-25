import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

import config from '../config'

export const createJWT=(user)=>{
    const token = jwt.sign({id: user.id, username:user.username},config.JWT_SECRET);
    return token;
}

export const comparePassword =(password:string,hash:string)=>{
    return bcrypt.compareSync(password,hash)
}

export const hashPassword=(password:string)=>{
    return bcrypt.hash(password,5)
}

export const protect =(req,res,next)=>{
    const bearer = req.headers.authorization
    if(!bearer) {
        return res.status(401).json({
            message: 'not authorized'
        })
    }

    const [,token] = bearer.split(" ");
    if(!token) {
        res.send(401)
        res.json({ messge: 'not authorized' })
        return;
    }
    try {
        const user = jwt.verify(token,config.JWT_SECRET)
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.send(401)
        res.json({ messge: 'not a valid token' })
    }
}