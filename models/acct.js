const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, default: null },
    email: { type: String, unique: true },
    firstName: { type: String, default: null },
    surname: { type: String, default: null },
    password: { type: String },
    token: { type: String }
})

module.exports = mongoose.model('User', userSchema) 