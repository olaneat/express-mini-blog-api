const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        req.user = decoded;
        next()



    } catch (error) {
        res.status(401).send("Invalid Token");
    }
};

module.exports = { verifyToken };