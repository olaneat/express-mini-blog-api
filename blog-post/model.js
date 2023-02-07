const mongoose = require('mongoose')
const Schema = mongoose.Schema


const BlogPost = new mongoose.Schema({
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String },
    category: { type: String },
    updatedOn: { type: Date, default: Date.now() },
    createdOn: { type: Date, default: Date.now() },
    img: { data: Buffer, contentType: String },
    slug: {type: String, required:true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }]
})


const Comments = new mongoose.Schema({
    comment: { type: String },
    fullName: { type: String },
    email: { type: String },
    updatedOn: { type: Date, default: Date.now() },
    createdOn: { type: Date, default: Date.now() },
    //articleId: { type: Schema.Types.ObjectId, ref: 'BlogPost' }
})

const CommentModel = mongoose.model('Comments', Comments,)
const BlogPostModel = mongoose.model('BlogPost', BlogPost)

module.exports = { CommentModel, BlogPostModel }
