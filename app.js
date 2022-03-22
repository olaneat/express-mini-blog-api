require('./config/database').connect()
const express = require('express');
const app = express()
const articleRouter = require('./blog-post/route')
const acctRouter = require('./acct/route')
app.use(express.json({ limit: "50mb" }));


app.use('/article', articleRouter)
app.get('')
app.use('/acct/', acctRouter)
module.exports = app