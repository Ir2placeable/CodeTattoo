const routing_to = require('./logic')
const express = require('express')
const server = express()
const port = 3001

const bodyParser = require('body-parser');
const cors = require('cors');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extends : true }))
server.use(cors());

// 엔트리 기능
server.get('/api', (req, res) => {
    console.log('entry page')
    routing_to.entry(res)
})
server.post('/api/register', (req, res) => {
    console.log('register page')
    routing_to.register(req.body, res)
        .catch(() => { console.log('register function error')})
})
server.post('/api/login', (req, res) => {
    console.log('login page')
    routing_to.login(req.body, res)
        .catch(() => { console.log('login function error')})
})

// // 유저 기능
// server.post('/api/user/mypage', (req, res) => {
//
// })
// server.post('/api/user/mypage/edit', (req, res) => {
//
// })


// 타투이스트 기능

// 타투시술 기능

// 타투제거 기능
server.post('/api/tattooist/enrollment', (req, res) => {
    console.log('tattooist enrollment')
    routing_to.tattooistEnroll(req.body, res)
        .catch(() => { console.log('tattooistEnroll function error')})
})
server.post('/api/draft/create', (req, res) => {
    console.log('new draft page')
    routing_to.newDraft(req.body, res)
        .catch(() => { console.log('newDraft function error')})
})
server.get('/api/draft/browse/:filter/:page_number', (req, res) => {
    console.log('browse draft page')
    routing_to.browseDraft(req.params, res)
})
server.post('/api/draft/like', (req, res) => {
    console.log('like draft page')
    routing_to.likeDraft(req.body, res)
        .catch(() => { console.log('likeDraft function error')})
})
server.post('/api/follow', (req, res) => {
    console.log('follow tattooist page')
    routing_to.followTattooist(req.body, res)
        .catch(() => { console.log('followTattooist function error')})
})
server.post('/api/tattooist/mypage', (req, res) => {
    console.log('tattooist page')
    routing_to.tattooistPage(req.body, res)
        .catch(() => { console.log('tattooist page function error')})
})
server.post('/api/tattooist/mypage/edit', (req, res) => {
    console.log('tattooist page edit')
    routing_to.tattooistEdit(req.body, res)
        .catch(() => { console.log('tattooist page edit function error')})
})
server.post('/api/reservation', (req, res) => {
    console.log('tattoo reservation profile')
    routing_to.reservation(req.body, res)
        .catch(() => { console.log('tattoo reservation function error')})
})
server.post('/api/tattooist/list', (req, res) => {
    console.log('tattooist list')
    routing_to.tattooists(res)
        .catch(() => { console.log('tattooist list function error')})
})

server.post('/api/tattoo/imprint/start', (req, res) => {
    routing_to.imprintStart(req.body, res)
        .catch(() => { console.log('tattoo imprint start function error')})
})
server.post('/api/tattoo/imprint/end', (req, res) => {
    routing_to.imprintEnd(req.body, res)
        .catch(() => { console.log('tattoo imprint end function error')})
})
server.post('/api/tattoo/remove/start', (req, res) => {
    routing_to.removeStart(req.body, res)
        .catch(() => { console.log('tattoo remove start function error')})
})
server.post('/api/tattoo/remove/end', (req, res) => {
    routing_to.removeEnd(req.body, res)
        .catch(() => { console.log('tattoo remove end function error')})
})
server.post('/api/tattoo/side_effect', (req, res) => {
    routing_to.addSideEffect(req.body, res)
        .catch(() => { console.log('add Side effect function error')})
})
server.post('/api/tattoo/info', (req, res) => {
    routing_to.tattooInfo(req.body, res)
        .catch(() => { console.log('tattoo info function error')})
})
server.post('/api/tattoo/history', (req, res) => {
    routing_to.tattooHistory(req.body, res)
        .catch(() => { console.log('tattoo history function error')})
})


server.listen(port, () => {
    console.log('server opened')
})

