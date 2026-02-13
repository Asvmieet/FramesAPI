// Schema for Cards

const mongoose = require('mongoose')

const colSchema = new mongoose.Schema({

board: {
type: String,
required: true,
unique: false

},

column_id: {
    type: String,
    required: true,
    unique: true
    
    },

project: {
    type: String,
    required: true,
    unique: false
    
    },



title: {
    type: String,
    required: true
    },

position: {
type: Number,
required: true,
default: 0
},


})

const col = mongoose.model('column', cardSchema);

module.exports = col;