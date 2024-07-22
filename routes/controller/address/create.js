const Validator = require("fastest-validator")
const{Address} = require ("../../../models")
const v = new Validator()




module.exports = async (req, res) =>{
    try {
        //extract data dari body
        const{phone,address, house_number, city} = req.body

        //buat schema input
        const schema = {
            user_id : "number|empty|false",
            phone : "string|empty|false",
            address :"string|empty|false",
            house_number : "string|empty|false",
            city : "string|empty|false"
        }

        //bandingkan body dengan schema
        const validate = v.validate(req.body, schema)
        //cek hasil validasi
        if (validate.length){
            return res.status(400).json({
                status : "error",
                message : validate
            })
        }

        const createAddress = await Address.create(req.body)
        return res.json({
            status : "success",
            date : createAddress
        })


        return res.send("create address")
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
}
}