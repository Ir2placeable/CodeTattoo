const routing_to = require('./logic')
const express = require('express')
const server = express()
const port = 3001

const bodyParser = require('body-parser');
const cors = require('cors');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extends : true }))
server.use(cors());

// Page : entry
server.get('/api', (req, res) => {
    console.log('entry page')
    routing_to.entry(res)
})
// Page : 회원가입
server.post('/api/register', (req, res) => {
    console.log('register page')
    routing_to.register(req.body, res)
        .catch(() => { console.log('register function error')})
})
// Page : 로그인
server.post('/api/login', (req, res) => {
    console.log('login page')
    routing_to.login(req.body, res)
        .catch(() => { console.log('login function error')})
})
// Page : 타투이스트 등록
server.post('/api/tattooist/enrollment', (req, res) => {
    console.log('tattooist enrollment')
    routing_to.tattooistEnroll(req.body, res)
        .catch(() => { console.log('tattooistEnroll function error')})
})
// Page : 도안 생성(Only Tattooist)
server.post('/api/draft/create', (req, res) => {
    console.log('new draft page')
    routing_to.newDraft(req.body, res)
        .catch(() => { console.log('newDraft function error')})
})
// Page : 도안 검색
server.get('/api/draft/browse/:filter/:page_number', (req, res) => {
    console.log('browse draft page')
    routing_to.browseDraft(req.params, res)
})
// Page : 도안 찜
server.post('/api/draft/like', (req, res) => {
    console.log('like draft page')
    routing_to.likeDraft(req.body, res)
        .catch(() => { console.log('likeDraft function error')})
})
// Page : 타투이스트 팔로우
server.post('/api/follow', (req, res) => {
    console.log('follow tattooist page')
    routing_to.followTattooist(req.body, res)
        .catch(() => { console.log('followTattooist function error')})
})


// 관리자용 인터페이스 목록
server.post('/users', (req, res) => {
    routing_to.users(req.body, res)
})
server.post('/tattooists', (req, res) => {
    routing_to.tattooists(req.body, res)
})
server.post('/drafts', (req, res) => {
    routing_to.drafts(req.body, res)
})


server.listen(port, () => {
    console.log('server opened')
})

