const {STATUS_CODES} = require('../constants')
const MenuItems = require('../model/menuItems')

const  getAllMenuItems = async(req,res)=>{
    try{

        const allMenuItems = await MenuItems.find({})
        res.status(STATUS_CODES.OK).json({
            message:"MenuItems found successfully",
            allMenuItems
        })
    }
    catch(error)
    {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message:error.message
        })
    }

}

module.exports={getAllMenuItems}