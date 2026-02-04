// MONGO_URI should be stored in ENV.

const {mongoose} = require('mongoose')

let connected = false;

async function connect() {
   if (connected) return

   if(!process.env.MONGO_URI){   
    console.log("Frames - DATABASE ERROR: Unable to connect to MongoDB | URI Missing")
     return;
      }

   await mongoose.connect(process.env.MONGO_URI)
   connected = true
   console.log("Frames: Connected to MongoDB")
}

module.exports = connect;