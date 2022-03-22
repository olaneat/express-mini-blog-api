const mongoose = require('mongoose')
const Articles = require('../blog-post/model')
const Schema = mongoose.Schema


const userSchema = new mongoose.Schema({
    username: { type: String, default: null },
    email: { type: String, unique: true },
    firstName: { type: String, default: null },
    surname: { type: String, default: null },
    comment: { type: Schema.Types.ObjectId, ref: 'Articles' },
    password: { type: String },
    token: { type: String }
})

module.exports = mongoose.model('User', userSchema) 