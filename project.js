// Schema for Boards

const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({

project_id: {
type: String,
required: true,
unique: true

},

name: {
type: String,
required: true,

},


perissions:[String],



})

const project = mongoose.model('project', boardSchema);

module.exports = project;