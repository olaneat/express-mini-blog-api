const mongoose = require('mongoose')
const Schema = mongoose.Schema


const BlogPost = new mongoose.Schema({
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
    category: { type: String, required: true },
    updatedOn: { type: Date, default: Date.now() },
    createdOn: { type: Date, default: Date.now() },
    img: { data: Buffer, contentType: String },
})


const Comments = new mongoose.Schema({
    comment: { type: String, default: null },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'BlogPost' }
})


module.exports = mongoose.model('Comments', Comments,)
module.exports = mongoose.model('BlogPost', BlogPost) 