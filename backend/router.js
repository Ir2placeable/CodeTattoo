const routing_to = require('./logic')
const blockchain = require('./blockchain')
const express = require('express')
const fs = require('fs')
const server = express()
const port = 3001

const bodyParser = require('body-parser');
const cors = require('cors');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended : true }))
server.use(cors());

// 엔트리
server.get('/', (req, res) => {
    routing_to.entry(res)
})
// 로그인
server.post('/login', (req, res) => {
    if (req.body.filter === 'user') {
        routing_to.userLogin(req.body, res)
            .catch(() => { console.log('error')})
    } else if (req.body.filter === 'tattooist') {
        routing_to.tattooistLogin(req.body, res)
            .catch(() => { console.log('error')})
    } else {
        res.send({ err : 'wrong filter'})
    }
})
// 회원가입
server.post('/register', (req, res) => {
    if (req.body.filter === 'user') {
        routing_to.userRegister(req.body, res)
            .catch(() => { console.log('error')})
    } else if (req.body.filter === 'tattooist') {
        routing_to.tattooistRegister(req.body, res)
            .catch(() => { console.log('error')})
    } else {
        res.send({ err : 'wrong filter'})
    }
})
// 유저 메인 페이지 - 도안
server.get('/user/main/draft/:filter/:page', (req, res) => {
    routing_to.userMainDraft(req.params, res)
        .catch(() => { console.log('error')})
})
// 유저 메인 페이지 - 타투이스트
server.get('/user/main/tattooist/:filter/:page', (req, res) => {
    routing_to.userMainTattooist(req.params, res)
        .catch(() => { console.log('error')})
})
// 유저 메인 페이지 - 스크랩
server.get('/user/main/scrap/:page', (req, res) => {
    routing_to.userMainScrap(req.params, res)
        .catch(() => { console.log('error')})
})
// 유저 메인 페이지 - 마이 타투
server.get('/user/main/my-tattoo', (req, res) => {
    routing_to.userMainMyTattoo(req.params, res)
        .catch(() => { console.log('error')})
})
// 유저 예약 확인 페이지
server

// 도안 스크랩
server.post('/scrap', (req, res) => {
    routing_to.draftScrap(req.body, res)
        .catch(() => { console.log('error')})
})
// 타투이스트 팔로우
server.post('/follow', (req, res) => {
    routing_to.followTattooist(req.body, res)
        .catch(() => { console.log('error')})
})
// 유저 마이 페이지
server.get('/user/my-page', (req, res) => {
    routing_to.userMyPage(req.query, res)
        .catch(() => { console.log('error')})
})
// 유저 마이 페이지 : 정보수정
server.put('/user/my-page', (req, res) => {
    routing_to.userInfoEdit(req.body, res)
        .catch(() => { console.log('error') })
})
// 유저 마이 페이지 : 이미지수정
server.put('/user/my-page/image', (req, res) => {
    routing_to.userImageEdit(req.body, res)
        .catch(() => { console.log('error') })
})



// User 초기화
server.get('/reset/user', (req, res) => {
    routing_to.resetUser()
        .then(() => { res.send({ success : true })})
})
// Draft 초기화
server.get('/reset/draft', (req, res) => {
    routing_to.resetDraft()
        .then(() => { res.send({ success : true })})
})
// Tattooist 초기화
server.get('/reset/tattooist', (req, res) => {
    routing_to.resetUser()
        .then(() => { res.send({ success : true })})
})
// Tattoo 초기화
server.get('/reset/tattoo', (req, res) => {
    routing_to.resetTattoo()
        .then(() => { res.send({ success : true })})
})

server.listen(port, () => {
    console.log('server opened')
})


