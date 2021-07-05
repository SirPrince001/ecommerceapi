const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderItemsSchema = new Schema({
    quantity: {
        type:Number,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
        
    
    }
})

module.exports = mongoose.model('OrderItem' , orderItemsSchema)