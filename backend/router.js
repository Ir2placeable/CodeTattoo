const routing_to = require('./main')
const express = require('express')
const server = express()
const port = 3001

const bodyParser = require('body-parser');
const cors = require('cors');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extends : true }))
server.use(cors());


server.get('/api', (req, res) => {
    routing_to.entry(res)
})
server.post('/api/register', (req, res) => {
    routing_to.register(req.body, res)
        .catch(() => { console.log('register function error')})
})
server.post('/api/login', (req, res) => {
    routing_to.login(req.body, res)
        .catch(() => { console.log('login function error')})
})
server.listen(port, () => {
    console.log('server opened')
})

