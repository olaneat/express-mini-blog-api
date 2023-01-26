const express = require("express");
const app = express
const Articles = require('./model')
//const Comment = require('./model')
const User = require('../acct/model')
//const fs = require('fs')
//const multer = require("multer");
//const path = require('path');
//const router = app.Router()

exports.post_article = async (req, res, next) => {
    try {
        const obj = {
            body: req.body.body,
            category: req.body.category,
            user: req.user.user_id,
            title: req.body.title,
            img: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        }

        const article = await Articles.BlogPostModel.create(obj)
        const response = {
            'msg': 'Article successfully added',
            status: 201,
            data: article
        }
        res.send(response)

    }
    catch (err) {
        res.status(400).json({ success: false, msg: err.message })
    }

    return next()
}


exports.display_articles = (async (req, res, next) => {
    try {
        article_list = await Articles.BlogPostModel.find({}, { 'title': !null, 'category': !null, 'img': 1 }).select({})
            .sort({ 'createdOn': -1 })
            .populate('user')
        const respond = {
            data: article_list,
            'msg': 'data fetched successfully',
            success: true
        }
        res.send(respond)


    }
    catch (err) {
        res.status(404).json({ success: false, msg: err.message })
    }
    return next()
})


exports.display_articles_by_user = (async (req, res, next) => {
    //console.log(req.user)
    //console.log(req.query)
    //console.log(req.params)

    try {
        article_list = await Articles.BlogPostModel.find({}, { 'title': !null, 'category': !null, user: !null }).select({}) 
            .sort({ 'createdOn': -1 })
            .populate('user')
            let articles = []
            
            article_list.forEach((x)=>{
                let id = x.user._id.toString()
                if(id==req.params.id){
                    articles.push(x)
                }
            })
        const resp = {
            data: articles,
            success: true
        }
        res.send(resp)
    }
    catch (err) {
        res.status(404).json({ success: false, msg: err.message })
    }
})
exports.display_articles_by_id = (async (req, res, next) => {
    try {
        const article = await Articles.BlogPostModel.findById(req.params.id)
            .populate('user').populate('comments')
        const response = {
            data: article,
            success: true,
            msg: 'data fetched successfully '
        }
        res.send(response)
    }
    catch (err) {
        res.status(400).json({ success: false, msg: err.message })
    }

    return next()
})


exports.delete_arictle = (async (req, res, next) => {
    try {
        article = await Articles.deleteOne({}, { id: req.params.id })
        article_list = await Articles.find({})
        const result = {
            success: true,
            msg: 'article deleted successfully',
            data: article_list
        }
        res.send(result)
    }
    catch (err) {
        res.status(400).json({ msg: err.message, success: false })
    }

    return next()
})

exports.update_article = ((req, res, next) => {
    try {
        const article = new Articles({
            _id: req.params.id,
            title: req.body.title,
            user: req.body.user,
            body: req.body.body,
            image: req.body.image,
            category: req.body.category
        })

        Articles.updateOne({ _id: req.params.id }, article)
        res.status(200).json({ success: true, msg: 'update successful', article })
    }
    catch (err) {
        res.status(400).json({ msg: err.message, success: false })
    }
    return next()
})


exports.create_comments = async (req, res, next) => {
    try {
        let obj = await Articles.CommentModel.create({
            comment: req.body.comment,
            email: req.body.email,
            fullName: req.body.fullName,
            articleId: req.body.articleId
        })
        const updatedpost = await Articles.BlogPostModel.findByIdAndUpdate(req.body.articleId, { $push: { comments: obj._id } }, { new: true })
        console.log(updatedpost)
        let response = {
            msg: 'comment successfully added',
            status: 201,
            data: obj,
            success: true
        }
        console.log(response)
        res.send(response)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'comment not save', success: false })
    }
    return next()
}

