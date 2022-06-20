const routing_to = require('./logic')
const express = require('express')
const server = express()
const port = 3001

const bodyParser = require('body-parser');
const cors = require('cors');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extends : true }))
server.use(cors());

<<<<<<< HEAD

// Page : entry
server.get('/api', (req, res) => {
    console.log('entry page')
=======
server.get('/', (req, res) => {
>>>>>>> 491ac3c6e95e212c1e559f22ed5877a5c34a367a
    routing_to.entry(res)
})

// 유저 기능
server.post('/register', (req, res) => {
    routing_to.register(req.body, res)
})
server.post('/login', (req, res) => {
    routing_to.login(req.body, res)
})
server.get('/user/my-page', (req, res) => {
    routing_to.userMyPage(req.query, res)
})
server.put('/user/my-page', (req, res) => {

})
server.post('/user/like', (req, res) => {

})
server.post('/user/follow', (req, res) => {

})
server.get('/user/my-tattoo', (req, res) => {

})

// 타투이스트 기능
server.get('/tattooist', (req, res) => {

})
server.post('/tattooist', (req, res) => {

})
server.get('/tattooist/my-page', (req, res) => {

})
server.put('/tattooist/my-page', (req, res) => {

})

// 도안 기능
server.post('/draft', (req, res) => {

})
server.get('/draft/:filter/:page', (req, res) => {

})

// 타투 기능
server.post('/imprint/reservation', (req, res) => {

})
server.post('/imprint', (req, res) => {

})
server.put('/imprint', (req, res) => {

})
server.post('/remove/reservation', (req, res) => {

})
server.post('/remove', (req, res) => {

})
server.put('/remove', (req, res) => {

})

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

