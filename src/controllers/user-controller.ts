import UserService from "../services/user-service"

const createUser=async(req,res)=>{
    try {
        const data = req.body;
        const token = await UserService.createUser({ username:data.username,password:data.password})
        return res.status(201).json({
            token,
            success: true,
            message: 'successfully create a user'
        })
    } catch (error) {
        return res.status(500).json({
            data: [],
            success: false,
            message: 'unable to create user',
            error
        })
    }
}

const singIn=async(req,res)=>{
    try {
        const { username, password } = req.body
        const token = await UserService.singIn(username,password)
        return res.status(200).json({
            token,
            success: true,
            message: 'successfully logged in'
        })
    } catch (error) {
        return res.status(500).json({
            data: [],
            success: false,
            message: 'unable to sign in',
            error
        })
    }
}

export {
    createUser,
    singIn
}