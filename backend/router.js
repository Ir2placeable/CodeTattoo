const routing_to = require('./logic')
const blockchain = require('./blockchain')
const express = require('express')
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
    console.log('entry')
})
// 로그인
server.post('/login', (req, res) => {
    console.log('login')
    if (req.body.filter === 'user') {
        routing_to.userLogin(req.body, res)
            .catch((err) => { console.log(err)})
    } else if (req.body.filter === 'tattooist') {
        routing_to.tattooistLogin(req.body, res)
            .catch((err) => { console.log(err)})
    } else {
        res.send({ err : 'wrong filter'})
    }
})
// 회원가입
server.post('/register', (req, res) => {
    console.log('register')
    if (req.body.filter === 'user') {
        routing_to.userRegister(req.body, res)
            .catch((err) => { console.log(err)})
    } else if (req.body.filter === 'tattooist') {
        routing_to.tattooistRegister(req.body, res)
            .catch((err) => { console.log(err)})
    } else {
        res.send({ err : 'wrong filter'})
    }
})
// 유저 메인 페이지 - 도안
server.get('/main/draft/:filter/:page', (req, res) => {
    console.log('main page - draft')
    routing_to.MainDraft(req.params, req.query, res)
        .catch((err) => { console.log(err)})
})
// 유저 메인 페이지 - 타투이스트
server.get('/main/tattooist/:filter/:page', (req, res) => {
    console.log('main page - tattooist')
    routing_to.MainTattooist(req.params, req.query, res)
        .catch((err) => { console.log(err)})
})
// 유저 메인 페이지 - 스크랩
server.get('/main/scrap/:filter/:page', (req, res) => {
    console.log('main page - scrap')
    routing_to.MainScrap(req.params, req.query, res)
        .catch((err) => { console.log(err)})
})
// 유저 메인 페이지 - 마이 타투
server.get('/main/my-tattoo', (req, res) => {
    console.log('main page - my tattoo')
    routing_to.MainMyTattoo(req.query, res)
        .catch((err) => { console.log(err)})
})
// 유저 예약확인 페이지
server.get('/user/reservation', (req, res) => {
    routing_to.userReservation(req.query, res)
        .catch((err) => { console.log(err)})
})
// 유저 마이 페이지
server.get('/user/my-page', (req, res) => {
    routing_to.userMyPage(req.query, res)
        .catch((err) => { console.log(err)})
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



// 도안 스크랩
server.post('/scrap', (req, res) => {
    routing_to.ScrapDraft(req.body, res)
        .catch((err) => { console.log(err)})
})
// 도안 스크랩 취소
server.delete('/scrap', (req, res) => {
    routing_to.unScrapDraft(req.body, res)
        .catch((err) => { console.log(err)})
})
// 타투이스트 팔로우
server.post('/follow', (req, res) => {
    routing_to.followTattooist(req.body, res)
        .catch((err) => { console.log(err)})
})

// 타투이스트 메인 페이지 - 작업물관리
server.get('/main/artworks/:filter/:page', (req, res) => {
    routing_to.MainArtworks(req.params, req.query, res)
        .catch((err) => { console.log(err)})
})
// 타투이스트 메인 페이지 - 도안관리
server.get('/main/my-draft/:filter/:page', (req, res) => {
    routing_to.MainMyDraft(req.params, req.query, res)
        .catch((err) => { console.log(err)})
})
// 타투이스트 메인 페이지 - 도안추가
server.post('/main/my-draft', (req, res) => {
    routing_to.newDraft(req.body, res)
        .catch((err) => { console.log(err)})
})
// 타투이스트 마이 페이지
server.get('/tattooist/my-page', (req, res) => {
    routing_to.tattooistMyPage(req.query, res)
        .catch((err) => { console.log(err)})
})
// 타투이스트 마이 페이지 : 정보수정
server.put('/tattooist/my-page', (req, res) => {
    routing_to.tattooistInfoEdit(req.body, res)
        .catch(() => { console.log('error') })
})
// 타투이스트 마이 페이지 : 이미지수정
server.put('/tattooist/my-page/image', (req, res) => {
    routing_to.tattooistImageEdit(req.body, res)
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

server.post('/test', (req, res) => {
    routing_to.test(req.body,res)
})

server.listen(port, () => {
    console.log('server opened')
})


