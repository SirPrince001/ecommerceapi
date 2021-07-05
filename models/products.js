const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    images:[{
        type:String
    }],
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
       
    },
    category :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    countInstock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    rating:{
        type:Number,
        default:0
    },
    numReviews : {
        type:Number,
        default:0
    },

    isFeatured:{
        type:Boolean,
        default:false
    },
    
},{timestamps:true})

module.exports = mongoose.model('Product' , productSchema)