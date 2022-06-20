const routing_to = require('./logic')
const express = require('express')
const server = express()
const port = 3001

const bodyParser = require('body-parser');
const cors = require('cors');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extends : true }))
server.use(cors());

// 엔트리
server.get('/', (req, res) => {
    routing_to.entry(res)
})
// 회원가입
server.post('/register', (req, res) => {
    routing_to.register(req.body, res)
        .catch(() => { console.log('error')})
})
// 로그인
server.post('/login', (req, res) => {
    routing_to.login(req.body, res)
        .catch(() => { console.log('error')})
})

// 유저 마이페이지
server.get('/user/my-page', (req, res) => {
    routing_to.userMyPage(req.query, res)
        .catch(() => { console.log('error')})
})
// 유저 마이페이지 정보 수정
server.put('/user/my-page', (req, res) => {
    routing_to.userInfoEdit(req.body, res)
        .catch(() => { console.log('error')})
})
// 유저 프로필 사진 변경
server.put('/user/my-page/image', (req, res) => {
    routing_to.userImageEdit(req.body, res)
        .catch(() => { console.log('error')})
})
// 유저 도안 좋아요
server.post('/user/scrap', (req, res) => {
    routing_to.userScrap(req.body, res)
        .catch(() => { console.log('error')})
})
// 유저 타투이스트 팔로우
server.post('/user/follow', (req, res) => {
    routing_to.userFollow(req.body, res)
        .catch(() => { console.log('error')})
})
// 유저 나의 타투 조회
server.get('/user/my-tattoo', (req, res) => {
    routing_to.userMyTattoo(req.query, res)
        .catch(() => { console.log('error')})
})
// 유저 나의 타투 이력조회
server.post('/user/my-tattoo/history', (req, res) => {
    routing_to.tattooHistory(req.body, res)
        .catch(() => { console.log('error')})
})
// 유저 타투 부작용 등록
server.post('/api/tattoo/side_effect', (req, res) => {
    routing_to.addSideEffect(req.body, res)
        .catch(() => { console.log('error')})
})

// 타투이스트 등록
server.post('/tattooist', (req, res) => {
    routing_to.tattooistEnroll(req.body, res)
        .catch(() => { console.log('error')})
})
// 타투이스트 리스트 조회
server.get('/tattooist', (req, res) => {
    routing_to.tattooistList(res)
        .catch(() => { console.log('error')})
})
// 타투이스트 마이페이지
server.get('/tattooist/my-page', (req, res) => {
    routing_to.tattooistMyPage(req.query, res)
        .catch(() => { console.log('error')})
})
// 타투이스트 마이페이지 정보 수정
server.put('/tattooist/my-page', (req, res) => {
    routing_to.tattooistInfoEdit(req.body, res)
        .catch(() => { console.log('error')})
})
// 타투이스트 프로필 사진 변경
server.put('/tattooist/my-page/image', (req, res) => {
    routing_to.tattooistImageEdit(req.body, res)
        .catch(() => { console.log('error')})
})

// 도안 생성
server.post('/draft', (req, res) => {
    routing_to.newDraft(req.body, res)
        .catch(() => { console.log('error')})
})
// 도안 조회
server.get('/api/draft/:filter/:page', (req, res) => {
    routing_to.browseDraft(req.params, res)
})

// 타투시술 예약
server.post('/imprint/reservation', (req, res) => {
    routing_to.imprintReservation(req.body, res)
        .catch(() => { console.log('error')})
})
// 타투시술 시작
server.post('/imprint', (req, res) => {
    routing_to.imprintStart(req.body, res)
        .catch(() => { console.log('error')})
})
// 타투시술 완료
server.put('/imprint/end', (req, res) => {
    routing_to.imprintEnd(req.body, res)
        .catch(() => { console.log('error')})
})
// 타투제거 예약
server.post('/remove/reservation', (req, res) => {
    routing_to.removeReservation(req.body, res)
        .catch(() => { console.log('error')})
})
// 타투제거 시작
server.post('/remove', (req, res) => {
    routing_to.removeStart(req.body, res)
        .catch(() => { console.log('error')})
})
// 타투제거 완료
server.put('/remove', (req, res) => {
    routing_to.removeEnd(req.body, res)
        .catch(() => { console.log('error')})
})





server.listen(port, () => {
    console.log('server opened')
})


