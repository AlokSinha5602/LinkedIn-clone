import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const isAuth = async (req,res,next)=>{
    try {
        let {token}=req.cookies
        if(!token){
            return res.status(400).json({message:"user doesn't have token"})
        }
        let verifyToken= jwt.verify(token,process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:"user desn't have valid token"})
        }
        // console.log(verifyToken);

        req.userId=verifyToken.userId
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"is auth error"})
    }
}

export default isAuth