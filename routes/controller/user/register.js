const bcrypt = require("bcrypt")
const Validator = require("fastest-validator")
const { Users } = require("../../../models")
const v = new Validator()

module.exports = async (req, res) => {
    try {
        //ekstrak data dari body
        const { full_name, email, avatar,rules } = req.body
        // buat skema input
        const schema = {
            full_name: "string|empty:false",
            email: "email|empty:false",
            password: "string|empty:false",
            avatar: "string|optional"
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

        //cari user di database
        const user = await Users.findOne({
            where: { email },
        })
        if (user) {
            return res.status(409).json({
                status: "error",
                message: "email already exist",
            })
        }

        //hash password supaya tidak bisa dibaca
        const password = await bcrypt.hash(req.body.password, 10)

        //kumpulin data ke dalam variabel
        const data = {
            password,
            full_name,
            email,
            rules : rules ?? "user",
            avatar: avatar ?? "default",
        }

        //buat user baru menggunakan data di database
        const createdUser = await Users.create(data)

        //return responce success
        return res.json({
            status: "success",
            data: {
                id: createdUser.id,
            },
        })


    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })

    }
}