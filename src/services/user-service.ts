import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import config from "../config";
import UserRepository from "../repository/user-repository";

class UserService {

    static async createUser(userData){
        try {
            const hashPwd = this.hashPassword(userData.password);
           const user = await UserRepository.create({...userData,password:hashPwd})
           const token = this.#createJWT({id:user.id,username:user.username});
           return token;
        } catch (error) {
            console.log(error);
            throw error
        }
    }


    static async singIn(username:string,password:string) {
        try {
            const user = await UserRepository.getUserByUsername(username);
            if(!user) {
                throw {
                    message:'no user found'
                }
            }
            // compare pwd
            const isValidPassword = this.comparePassword(password,user.password);
            if(!isValidPassword) {
                throw {
                    message: 'passoword not matched'
                }
            }
            
            const token = this.#createJWT({id:user.id,username:user.username});
            return token

        } catch (error) {
            console.log(error)
            console.log('something went wrong in user service')
        }
    }

    static #createJWT(user) {
        try {
            const token = jwt.sign(user,config.JWT_SECRET);
            return token;
        } catch (error) {
            console.log(error)
        }
    }

    static hashPassword(password) {
        try {
            return bcrypt.hashSync(password,5);
        } catch (error) {
            console.log(error)
        }
    }

    static comparePassword(password,hash) {
        try {
            return bcrypt.compareSync(password,hash);
        } catch (error) {
            console.log(error)
        }
    }

}

export default UserService