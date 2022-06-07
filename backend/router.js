const express = require('express')
const server = express()
const port = 8080

const routing_to = require('./main')

server.get('/', (req, res) => {
    routing_to.entry(res)
})

server.post('/register', (req, res) => {
    routing_to.register(req.body, res)
})

server.post('/login', (req, res) => {
    routing_to.login(req.body, res)
})


server.set('view engine' , 'ejs')
server.set('views', __dirname + '/views')
server.listen(port, () => {
    console.log('server connected')
})

