const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
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