const mongoose = require('mongoose')
const { Schema } = mongoose;


const roomSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        default: undefined
    },
    sold: {
        type: Number,
        default: 0
    },
    createDate: {
        type: Date,
        
    },
    outDate: {
        type: Date,
        
    },
    hotelName:{
        type:String,
        
    },
    images: {
        type: Object,
        
    },


}, {
    timestamps: true
})


module.exports = mongoose.model("Rooms", roomSchema)