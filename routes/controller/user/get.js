const { Users, Address } = require("../../../models")

module.exports = async (req, res) =>{
    try {
        const {id} = req.params

        const attributes = ["id", "full_name", "email", "avatar", "rules"]

        const user = await Users.findByPk(id, {attributes, include:[
            {model:Address,as:"address"}
        ]
        })
        if(!user){
            return res.status(404).json({
                status : "error",
                message : "user not found"
            })
        }
        return res.json({
            status : "success",
            data : user
        })
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}