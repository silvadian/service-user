const { Address} = require ("../../../models")

module.exports = async (req, res) => {
    try {
      
        const {id} = req.params

        const address = await Address.findByPk(id)

        if(!address) {
            return res.status(404).json({
                status : "error",
                message : "address not found"
            })
        }
        await address.update(req.body)

        return res.json({
            status : "success",
            data : address
        })


    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}