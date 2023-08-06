const bcrypt= require("bcrypt")
const Validator= require("fastest-validator")
const {User}= require("../../../models")
const v=new Validator()

module.exports= async (req, res)=>{
    try {
        // buat skema input
        const schema={
            full_name:"string|empty:false",
            email:"email|empty:false",
            password:"string|empty:false",
            avatar:"string|optional"
        }
        // bandingkan body dengan skema
        const validate= v.validate(req.body,schema)
        // cek hasil validasi
        if(validate.length){
            return res.status(400).json({
              status:"error",
              message:validate  
            })
        }
        return res.send("oke")
    } catch (error) {
        
    }
}