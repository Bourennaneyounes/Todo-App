const mongoose = require('mongoose')
const User = require("../models/UserModel")

const todoSchema = new mongoose.Schema({
    owner : {type: mongoose.Schema.Types.ObjectId ,ref: 'User'},
    title : {
        type : String,
        require : true
    }
    ,
    description : {
        type : String
    },
    date : {
        type : Date
    },
    checked : {
        type : Boolean
    },
    order:{
        type: Number,
        default:0
    }
})

module.exports = mongoose.model('ToDo', todoSchema)