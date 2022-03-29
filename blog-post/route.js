const express = require("express");
const articleRouter = express.Router()
const article_controller = require('./controller')


articleRouter.get('/list', article_controller.display_articles);
articleRouter.post('/create-new', article_controller.post_article)
articleRouter.get('/:id/detail', article_controller.display_articles_by_id)
articleRouter.delete('/:id/delete', article_controller.delete_arictle)
articleRouter.put('/:id/update', article_controller.update_article)
module.exports = articleRouter
