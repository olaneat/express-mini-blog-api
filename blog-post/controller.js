const express = require("express");
const app = express
const router = app.Router()
const Articles = require('./model')
const fs = require('fs')
const User = require('../acct/model')
const multer = require("multer");

const path = require('path');

exports.post_article = async (req, res, next) => {
    console.log(req.body, req.user)
    try {
        const obj = {
            body: req.body.body,
            category: req.body.category,
            user: req.user.user_id,
            title: req.body.title,
            img: {
                data: req.body.buffer,
                contentType: req.body.mimetype
            }
        }

        const article = await Articles.create(obj)
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
        article_list = await Articles.find({}, 'title').select({ 'img': 1 })
            .sort({ 'createdOn': -1 })
            .populate('user')
        const respond = {
            data: article_list,
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
    console.log(req.user)
    console.log(req.query)
    console.log(req.params)
    console.log(req.body)

    try {
        article_list = await Articles.find({ "user": req.user_id }).select({ 'img': 1 })
            .sort({ 'createdOn': -1 })
        const res = {
            data: article_list,
            success: true
        }
        //res.send(res)
    }
    catch (err) {
        res.status(404).json({ success: false, msg: err.message })
    }
})
exports.display_articles_by_id = (async (req, res, next) => {
    console.log(req.params)
    try {
        article = await Articles.findById(req.params.id)
            .populate('user')
        const response = {
            data: article,
            success: true,
            msg: 'article successfully fetched'
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

