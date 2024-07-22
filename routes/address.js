 const express =require("express")
const router = express.Router()
const addressController = require("./controller/address")

router.post("/", addressController.create )
router.put("/:id", addressController.update)

module.exports = router
