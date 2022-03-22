const express = require("express");
const auth = require('../middleware/auth')
const app = express
const router = app.Router()
const Articles = require('./model')
const User = require('../acct/model')

exports.post_article = (auth, async (req, res, next) => {
    try {
        const { body, user, title } = req.body
        const article = await Articles.create({
            body,
            title,
            user
        })

        const response = {
            'msg': 'Post successfully added',
            status: 201,
            data: article
        }
        res.send(response)

    }
    catch (err) {
        res.status(400).json({ success: false, msg: err.message })
    }

    return next()
})

exports.display_articles = (async (req, res, next) => {
    try {
        article_list = await Articles.find({}, 'title')
            .sort({ title: 1 })
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


exports.display_articles_by_id = (async (req, res, next) => {

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


exports.delete_arictle = (auth, async (req, res, next) => {
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


exports.update_article = (auth, async (req, res, next) => {
    try {
        article = await Articles.findOneAndUpdate(req.params.id)
            .populate('user')
        const { body, user, title } = req.body
        let updateAricle = Articles.create({
            body,
            title,
            user,
        })
        const result = {
            success: true,
            msg: 'Article sucessfully updated',
            data: updateAricle
        }
        res.send(result)
    }
    catch (err) {
        res.status(400).json({ msg: err.message, success: false })
    }
    return next()
})

