const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const port = 5000
const router = express.Router()
const checkJwt = require('./auth');
const cors = require('cors');
const user = require('./user')

const data = {
    first_name: "Elturan",
    last_name: "Shucai",
    age: "20",
    birthDay: "01.03.2002",
    skills: [
        {
            skilName: "HTML",
            level: "5"
        },
        {
            skilName: "CSS",
            level: "5"
        },
        {
            skilName: "JavaScript",
            level: "5"
        },
        {
            skilName: "React",
            level: "4"
        },
        {
            skilName: "Redux toolkit",
            level: "4"
        },
        {
            skilName: "Tailwind CSS",
            level: "4"
        },
        {
            skilName: "GIT",
            level: "3"
        }
    ],
    email: "elturanfcb@gmail.com",
    github: "github.com/elturanshucai"
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

router.post('/login', function (req, res, next) {
    const reqUser = req.body
    const token = jwt.sign({
        user: reqUser,
        ad: 'Elturan',
        exp: Math.floor(Date.now() / 1000) + 6000,
        issuer: 'www.iss.com'
    }, 'elturans')
    if(reqUser.username === user.username && reqUser.password === user.password){
        res.send(token)
    }
    else{
        res.send(false)
    }
})

router.post('/login2', (req, res) => {
    const token = jwt.sign(req.body, 'elturans', { expiresIn: '1h' });
    res.send(token);
});

router.post('/verify', (req, res) => {
    try {
        const { token } = req.body;
        const decodedData = jwt.verify(token, 'elturans');
        res.send(decodedData);
    } catch (err) {
        res.send(false);
    }
})

router.post('/posts', checkJwt, function (req, res, next) {
    res.send('Hello World')
})
router.get('/', function (req, res, next) {
    res.send('Running')
})
router.get('/user', checkJwt, function (req, res, next) {
    res.send(data)
})

app.use('/', router)
app.listen(port, function () {
    console.log(`localhost: ${port} is running`)
})