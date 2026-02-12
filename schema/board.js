// Schema for Boards

const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({

board_id: {
type: String,
required: true,
unique: true

},

name: {
type: String,
required: true,

},


permissionsWrite:[String],
permissionsRead:[String],



})

const board = mongoose.model('board', boardSchema);

module.exports = board;