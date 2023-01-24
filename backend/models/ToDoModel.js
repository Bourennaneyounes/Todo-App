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
        type : String
    },
    checked : {
        type : Boolean
    }
})

module.exports = mongoose.model('ToDo', todoSchema)