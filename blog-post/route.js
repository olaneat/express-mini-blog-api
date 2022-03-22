const express = require("express");
const articleRouter = express.Router()
const article_controller = require('./controller')
const auth = require('../middleware/auth')



articleRouter.get('/list', article_controller.display_articles);
articleRouter.post('/create-new', auth, article_controller.post_article)
articleRouter.get('/:id/detail', article_controller.display_articles_by_id)
articleRouter.delete('/:id/delete', auth, article_controller.delete_arictle)
articleRouter.put('/:id/update', auth, article_controller.update_article)
module.exports = articleRouter
