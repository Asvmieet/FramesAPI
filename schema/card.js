// Schema for Cards

const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({

card_id: {
type: String,
required: true,
unique: true

},

position: {
type: Number,
required: true,
default: 0
},

labels:[String],

tasks: [{
body: String,
complete: {type: Boolean, default: false}
}],

description: {
type: String,
required: false
},

due_date: {
type: Date,
required: false
},

isArchived: {
    type: Boolean,
    required: true,
    default: false
    },
    

comments: [{
text: String,
author: String, // User ID
createdAt: {type: Date, default: Date.now}
}]


})

const card = mongoose.model('card', cardSchema);

module.exports = card;