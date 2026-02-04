// Mongo_URI should be stored in ENV.

const {mongoose} = require('mongoose')

let connected = false;

async function connect() {
   if (connected) return

   await mongoose.connect(process.env.MONGOOSE_URI)
   connected = true
   console.log("Frames: Connected to MongoDB")
}

module.exports = connect;