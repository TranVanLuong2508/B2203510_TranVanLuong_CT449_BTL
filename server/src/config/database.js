const mongoose = require("mongoose")
module.exports.connect =  async () =>{
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGO_URL);
            console.log('Connect to Database successfully!!!');
        }
    } catch (error) {
        console.log(error);
    }
}


// database Connect state
// 0: disconnected
// 1: connected
// 2: connecting
// 3: disConnecting
