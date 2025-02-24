const UserModel=require("../models/UserModel")
async function chMail(req,res){
    try{
        const {email}=req.body
        const checkEmail =await UserModel.findOne({email}).select('-password')
        if(!checkEmail){
            return res.status(400).json({
                message:"user not exist",
                error:true
            })
        }
        return res.status(200).json({
            message:" email verified",
            data:checkEmail,
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
module.exports=chMail