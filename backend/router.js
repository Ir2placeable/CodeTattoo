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
// Page : 타투이스트 페이지
server.post('/api/tattooist/mypage', (req, res) => {
    console.log('tattooist page')
    routing_to.tattooistPage(req.body, res)
        .catch(() => { console.log('tattooist page function error')})
})
// Page : 타투이스트 프로필 이미지 등록
server.post('/api/tattooist/mypage/edit', (req, res) => {
    console.log('tattooist page edit')
    routing_to.tattooistEdit(req.body, res)
        .catch(() => { console.log('tattooist page edit function error')})
})
// Page : 타투 예약 페이지
server.post('/api/reservation', (req, res) => {
    console.log('tattoo reservation profile')
    routing_to.reservation(req.body, res)
        .catch(() => { console.log('tattoo reservation function error')})
})
// Page : 타투이스트 리스트 보기
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

