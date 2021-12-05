
const mongoose = require("mongoose")


//9135jussmor
async function mongodb() {
    try {
        const mongodb = await mongoose.connect(process.env.MONGODB_URI)
        console.log("MONGODB Connected to ", mongodb.connection.name)
    }
    catch (error){
        console.error(error)
    }
    
}

module.exports = { mongodb } ;        

