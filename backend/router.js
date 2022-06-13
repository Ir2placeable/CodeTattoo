const routing_to = require('./logic')
const express = require('express')
const server = express()
const port = 3001

const bodyParser = require('body-parser');
const cors = require('cors');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extends : true }))
server.use(cors());

// 접근가능한 인터페이스
server.get('/api', (req, res) => {
    routing_to.entry(res)
})
server.post('/api/register', (req, res) => {
    console.log(req.body)
    routing_to.register(req.body, res)
        .catch(() => { console.log('register function error')})
})
server.post('/api/login', (req, res) => {
    console.log(req.body)
    routing_to.login(req.body, res)
        .catch(() => { console.log('login function error')})
})
server.post('/api/tattooist/enrollment', (req, res) => {
    console.log(req.body)
    routing_to.tattooistEnroll(req.body, res)
        .catch(() => { console.log('tattooistEnroll function error')})
})
server.post('/api/draft/create', (req, res) => {
    console.log(req.body)
    routing_to.newDraft(req.body, res)
        .catch(() => { console.log('newDraft function error')})
})
server.post('/api/draft/browse', (req, res) => {
    routing_to.browseDraft(req.body, res)
        .catch(() => { console.log('browseDraft function error')})
})
server.post('/api/draft/like', (req, res) => {
    routing_to.likeDraft(req.body, res)
        .catch(() => { console.log('likeDraft function error')})
})


// 관리자용 인터페이스
server.post('/users', (req, res) => {
    routing_to.users(req.body, res)
})
server.post('/tattooists', (req, res) => {
    routing_to.tattooists(req.body, res)
})
server.post('/image_test', (req, res) => {
    routing_to.image_test(req.body, res)
        .catch(() => { console.log('imageSave function error')})
})

server.listen(port, () => {
    console.log('server opened')
})

