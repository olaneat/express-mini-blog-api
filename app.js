require('dotenv').config()
require('./config/database').connect()
const bcrypt = require('bcryptjs/dist/bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const User = require('./models/acct')

app.use(express.json())

app.post('/register', async (req, res) => {
    try {
        const { firstName, username, surname, email, password } = req.body;
        if (!(email, firstName, username, surname, password)) {
            res.status(400).send('All fields are required')
        }

        const oldUser = await User.findOne({ email })

        if (oldUser) {
            res.status(409).send('user already exist, kindly Login')
        }

        encryptedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName,
            username,
            email: email.toLowerCase(),
            password: encryptedPassword

        })

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );

        user.token = token
        res.status(201).send('user successfully created', user)
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/login', (req, res) => {

})
module.exports = app