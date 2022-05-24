require('./config/database').connect()
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const articleRouter = require('./blog-post/route')
const acctRouter = require('./acct/route')
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use('/articles', articleRouter)
app.get('')
app.use('/acct/', acctRouter)

module.exports = app