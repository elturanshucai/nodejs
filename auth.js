const jwt = require("jsonwebtoken")
module.exports=(req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, 'elturans')
        next()
    } catch (error) {
        return res.status(401).send({
            message: 'Icazesiz giris',
            status: 401
        })
    }
}