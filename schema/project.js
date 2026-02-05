// Schema for Projects

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


permissions:[String],



})

const project = mongoose.model('project', projectSchema);

module.exports = project;