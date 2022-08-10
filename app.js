const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const port = 5000
const router = express.Router()
const checkJwt = require('./auth');
const cors = require('cors');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

router.post('/login', function (req, res, next) {
    const email = req.body
    const token = jwt.sign({
        email: email,
        ad: 'Elturan',
        exp: Math.floor(Date.now() / 1000) + 600,
        issuer: 'www.iss.com'
    }, 'elturans')
    res.send(token)
})

router.post('/login2', (req, res) => {
    const token = jwt.sign(req.body, 'elturans', { expiresIn: '1h' });
    res.send(token);
});

router.post('/verify', (req, res) => {
    try {
        console.log(req.body);
        const { token } = req.body;
        console.log(token);
        const decodedData = jwt.verify(token, 'elturans');
        res.send(decodedData);
    } catch (err) {
        res.send(false);
    }
})

router.post('/posts',checkJwt, function (req, res, next) {
    console.log('a');
    res.send('Hello World')
})
router.get('/', function (req, res, next) {
    res.send('Running')
})
router.get('/user',checkJwt, function (req, res, next) {
    res.send({name: "Elturan", age: "20"})
})

app.use('/', router)
app.listen(port, function () {
    console.log(`localhost: ${port} is running`)
})