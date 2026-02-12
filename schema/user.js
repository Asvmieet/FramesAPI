// Schema for Users

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

user_id: {
type: String,
required: true,
unique: true

},

username: {
type: String,
required: true,

},


password: {
    type: String,
    required: true,
}


})

const user = mongoose.model('user', userSchema);

module.exports = user;