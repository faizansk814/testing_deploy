const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1]
    if (token) {
        jwt.verify(token, 'DC', function (err, decoded) { //{userId:....}
            if (decoded) {
                console.log(decoded)
                req.body.userID = decoded.userID // title sub body 
                console.log(req.body)
                next()
            } else {
                res.send({ "msg": "Please Login First" })
            }
        });
    } else {
        res.send({ "msg": "Please Login First" })
    }
}
module.exports = auth