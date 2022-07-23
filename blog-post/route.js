const express = require("express");
const articleRouter = express.Router()
const article_controller = require('./controller')
const multer = require("multer");
const auth = require('../middleware/auth').verifyToken
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })



articleRouter.get('/list', article_controller.display_articles);
//articleRouter.post('/create-new', auth, article_controller.post_article)
articleRouter.post('/create-new', auth, upload.single('img'), article_controller.post_article)
articleRouter.get('/detail/:id', article_controller.display_articles_by_id)
articleRouter.delete('/delete/:id', auth, article_controller.delete_arictle)
articleRouter.put('/update/:id', auth, article_controller.update_article)
articleRouter.get('/display_articles_by_user', auth, article_controller.display_articles_by_user)
module.exports = articleRouter
