const UserDataModel = require('../model/useData');
const OrderModel = require('../model/orderedItems');
const { STATUS_CODES } = require('../constants');

const updateOrderItems = async (req, res) => {
    try {
        const { userTag } = req.params;
        const { paymentMethods } = req.body; // Ensure paymentMethods is extracted correctly

        // Find the user data for the specific user
        const userData = await UserDataModel.findOne({ userTag });

        if (!userData) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                message: "User Account Not Found"
            });
        }

        // Create a new order
        const newData = new OrderModel({
            userTag: userData.userTag,
            items: userData.items,
            totalAmount: userData.totalAmount,
            orderedAt: userData.orderedAt,
            paymentMethods
        });

        // Save the new order to the database
        await newData.save();

        // Clear items, totalAmount, and orderedAt in the user data
        userData.items = [];
        userData.totalAmount = 0;
        userData.orderedAt = new Date();

        // Save the updated user data
        await userData.save();

        res.status(STATUS_CODES.OK).json({
            message: "Order Items Updated Successfully"
        });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error",
            error
        });
    }
};

const getOrderItems= async(req,res)=>{
    try{
        const {userTag} = req.params

        const orderData = await OrderModel.find({userTag})

        if(!orderData){
            res.status(STATUS_CODES.NOT_FOUND).json({
                message:"Accound Not found"
            })
        }

        res.status(STATUS_CODES.OK).json({
            message:"OrderItems Found Successfully",
            data:orderData
        })
    }
    catch(error)
    {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message:"Internal server error",
            error
        })
    }
}

module.exports = {
    updateOrderItems,
    getOrderItems
};
