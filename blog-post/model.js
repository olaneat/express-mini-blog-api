const mongoose = require('mongoose')
const Schema = mongoose.Schema
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");


const BlogPost = new mongoose.Schema({
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
    comments: { type: Schema.Types.Array },
    updatedOn: { type: Date, default: Date.now() },
    createdOn: { type: Date, default: Date.now() },
})


const Comments = new mongoose.Schema({
    comment: { type: String, default: null },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'BlogPost' }
})


module.exports = mongoose.model('Comments', Comments,)
module.exports = mongoose.model('BlogPost', BlogPost) 