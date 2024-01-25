import prisma from "../modules/db";

class UserRepository {
    
    static async create(data) {
        try {
            const user = await prisma.user.create({
                data
            })
            
            return user;
        } catch (error) {
            console.log(error)
            console.log('something went wrong in user repo')
            throw error
        }
    }

    static async getUserByUsername(username) {
        try {
            const user = await prisma.user.findUnique({
                where:{
                    username
                }
            })
            return user
        } catch (error) {
            console.log(error);
            console.log('something went wrong in user repo')
            throw error
        }
    }
}

export default UserRepository