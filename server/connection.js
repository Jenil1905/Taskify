const mongoose = require('mongoose')

async function connectDB(db_Url) {
    return await mongoose.connect(db_Url).then(() => { console.log('Connected to MongoDb') }).catch((err) => { console.log(err) })
}

module.exports = connectDB