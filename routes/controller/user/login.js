const bcrypt = require("bcrypt")
const Validator = require("fastest-validator")
const { Users } = require("../../../models")
const v = new Validator()

module.exports = async (req, res) => {
    try {//ekstrak data dari body
        const { email } = req.body
        // buat skema input
        const schema = {
            email: "email|empty:false",
            password: "string|empty:false",
        }
        // bandingkan body dengan skema
        const validate = v.validate(req.body, schema)
        // cek hasil validasi
        if (validate.length) {
            return res.status(400).json({
                status: "error",
                message: validate
            })
        }
        //cari user berdasarkan email
        const user = await Users.findOne({
            where : { email}
        })

        //check pakah user ada
        if(!user){
            return res.status(404).json({
                status : "error",
                message : "user not found"
            })
        }

        //compare passowrd
        const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        //jika tidak sama
        if(!isValidPassword){
            return res.status(404).json({
                status : "error",
                message : "password didnt match"
            })
        }

        return res.json({
            status : "success",
            data : {
                id : user.id,
                full_name : user.full_name,
                email,
                rules : user.rules,
                avatar : user.avatar,
            }
        })


    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}