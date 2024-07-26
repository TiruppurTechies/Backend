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

const  getVegMenuItems = async(req,res)=>{
    try{

        const vegMenuItems = await MenuItems.find({veg:true})
        res.status(STATUS_CODES.OK).json({
            message:"VegMenuItems found successfully",
            vegMenuItems
        })
    }
    catch(error)
    {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message:error.message
        })
    }
}

const  getNonVegMenuItems = async(req,res)=>{
    try{

        const nonVegMenuItems = await MenuItems.find({veg:false})
        res.status(STATUS_CODES.OK).json({
            message:"NonMenuItems found successfully",
            nonVegMenuItems
        })
    }
    catch(error)
    {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message:error.message
        })
    }
}

const  getSpecialMenuItems = async(req,res)=>{
    try{

        const specialMenuItems = await MenuItems.find({veg:false})
        res.status(STATUS_CODES.OK).json({
            message:"SpecialMenuItems found successfully",
            specialMenuItems
        })
    }
    catch(error)
    {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message:error.message
        })
    }
}


module.exports={
    getAllMenuItems,
    getVegMenuItems,
    getNonVegMenuItems,
    getSpecialMenuItems
}