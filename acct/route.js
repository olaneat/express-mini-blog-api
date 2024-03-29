const express = require("express");
const acctRouter = express.Router()
const User = require('./model')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


acctRouter.post('/register', async (req, res) => {
    try {
        const { firstName, username, surname, email, password } = req.body;
        if (!(email && firstName && username && surname && password)) {
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
            surname,
            email: email.toLowerCase(),
            password: encryptedPassword

        })
        // const token = jwt.sign(
        //     { user_id: user._id, email },
        //     process.env.TOKEN_KEY,
        //     {
        //         expiresIn: "2h"
        //     }
        // );
        // user.token = token
        const respond = {
            status: 201,
            'message': 'User successfully created',
            user: user
        }
        res.json(respond)
    }
    catch (err) {
        console.log(err)
    }
})

acctRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let loginResponse;
        if (!(email && password)) {
            loginResponse ={
                'message': 'Sorry all fields are required'
            }
            res.status(400).send(loginResponse)
        }
        
        const user = await User.findOne({ email });
        
        if(user){
            const pswd = bcrypt.compareSync(password, user.password)
        //if (user && (await bcrypt.compareSync(password, user.password))) {
        if (user && pswd) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '3h'
                }
            )
            user.token = token
             loginResponse = {
                'message': 'Login Successful',
                token: user.token,
                status: 200,
                data: user
            }
            
        }else if(user && !pswd ){
            loginResponse = {
                'message': 'invalid login detail, Login failed',
                'status': 400
            }
                    }    
        }else{
            loginResponse = {
                'message': 'user not found'
            }
            
        }
        
        res.send(loginResponse)

    }
    catch (err) {
        console.log(err)
    }

})

module.exports = acctRouter