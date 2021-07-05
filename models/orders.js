const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem'
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    shippingAddress :{
        type:String,
        required:true
        
    },
    shippingAddress2:{
        type:String,
        required:true
        
    },
    city:{
        type:String,
        required:true
        
    },
    zip:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'pending'
    },
    totalPrice:{
        type:Number
            
       
    },

},{timestamps:true})

module.exports = mongoose.model('Order' , orderSchema)