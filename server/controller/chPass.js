const UserModel=require("../models/UserModel")
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

async function chPass(req,res){
    try{
        const {password,userId}=req.body
        const user=await UserModel.findById(userId)
        const verPass=await bcryptjs.compare(password,user.password)
        if(!verPass){
            return res.status(400).json({
                message:"login failed",
                error:true
            })
        }
        const tokenData={
            id:user._id,
            email:user.email
        }
        const token=await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1D'})
        const cookieOption={
            http:true,
            secure:true
        }
        return res.cookie('token',token,cookieOption).status(200).json({
            message:" login success",
            token:token,
            success:true
        })
    }
    catch(err){
        return res.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}
module.exports=chPass