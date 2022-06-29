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


// 도안 스크랩
server.post('/scrap', (req, res) => {
    routing_to.draftScrap(req.body, res)
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










// // 유저 마이페이지
// server.get('/user/my-page', (req, res) => {
//     routing_to.userMyPage(req.query, res)
//         .then(() => { console.log('user mypage')})
//         .catch(() => { console.log('error')})
// })
// // 유저 마이페이지 정보 수정
// server.put('/user/my-page', (req, res) => {
//     routing_to.userInfoEdit(req.body, res)
//         .then(() => { console.log('user info edit')})
//         .catch(() => { console.log('error')})
// })
// // 유저 프로필 사진 변경
// server.put('/user/my-page/image', (req, res) => {
//     routing_to.userImageEdit(req.body, res)
//         .then(() => { console.log('user image edit')})
//         .catch(() => { console.log('error')})
// })
// // 유저 도안 좋아요
// server.post('/user/scrap', (req, res) => {
//     routing_to.userScrap(req.body, res)
//         .then(() => { console.log('user scrap')})
//         .catch(() => { console.log('error')})
// })
// // 유저 타투이스트 팔로우
// server.post('/user/follow', (req, res) => {
//     routing_to.userFollow(req.body, res)
//         .then(() => { console.log('user follow')})
//         .catch(() => { console.log('error')})
// })
// // 유저 나의 타투 조회
// server.get('/user/my-tattoo', (req, res) => {
//     routing_to.userMyTattoo(req.query, res)
//         .then(() => { console.log('user my tattoo')})
//         .catch(() => { console.log('error')})
// })
// // 유저 나의 타투 이력조회
// server.get('/user/my-tattoo/history', (req, res) => {
//     routing_to.tattooHistory(req.query, res)
//         .then(() => { console.log('user my tattoo history')})
//         .catch(() => { console.log('error')})
// })
// // 유저 타투 부작용 등록
// server.post('/user/my-tattoo/side_effect', (req, res) => {
//     routing_to.addSideEffect(req.body, res)
//         .then(() => { console.log('user my tattoo side effect')})
//         .catch(() => { console.log('error')})
// })
//
// // 타투이스트 등록
// server.post('/tattooist', (req, res) => {
//     routing_to.tattooistEnroll(req.body, res)
//         .then(() => { console.log('tattooist enroll')})
//         .catch(() => { console.log('error')})
// })
// // 타투이스트 리스트 조회
// server.get('/tattooist', (req, res) => {
//     routing_to.tattooistList(res)
//         .then(() => { console.log('tattooist list')})
//         .catch(() => { console.log('error')})
// })
// // 타투이스트 마이페이지
// server.get('/tattooist/my-page', (req, res) => {
//     routing_to.tattooistMyPage(req.query, res)
//         .then(() => { console.log('tattooist mypage')})
//         .catch(() => { console.log('error')})
// })
// // 타투이스트 마이페이지 정보 수정
// server.put('/tattooist/my-page', (req, res) => {
//     console.log('tattooist info edit')
//     console.log(req.body)
//     routing_to.tattooistInfoEdit(req.body, res)
//         .then(() => { console.log('tattooist mypage edit')})
//         .catch(() => { console.log('error')})
// })
// // 타투이스트 프로필 사진 변경
// server.put('/tattooist/my-page/image', (req, res) => {
//     routing_to.tattooistImageEdit(req.body, res)
//         .then(() => { console.log('tattooist image edit')})
//         .catch(() => { console.log('error')})
// })
//
// // 도안 생성
// server.post('/draft', (req, res) => {
//     routing_to.newDraft(req.body, res)
//         .then(() => { console.log('new draft')})
//         .catch(() => { console.log('error')})
// })
// // 도안 조회
// server.get('/draft/:filter/:page', (req, res) => {
//     routing_to.browseDraft(req.params, res)
//         .then(() => { console.log('draft browse')})
//         .catch(() => { console.log('error')})
// })

// // 타투시술 예약
// server.post('/imprint/reservation', (req, res) => {
//     routing_to.imprintReservation(req.body, res)
//         .then(() => { console.log('tattoo reservation')})
//         .catch(() => { console.log('error')})
// })
// 타투시술 시작
// server.post('/imprint', (req, res) => {
//     routing_to.imprintStart(req.body, res)
//         .then(() => { console.log('tattoo imprint start')})
//         .catch(() => { console.log('error')})
// })
// // 타투시술 완료
// server.put('/imprint', (req, res) => {
//     routing_to.imprintEnd(req.body, res)
//         .then(() => { console.log('tattoo imprint end')})
//         .catch(() => { console.log('error')})
// })
// // 타투제거 예약
// server.post('/remove/reservation', (req, res) => {
//     routing_to.removeReservation(req.body, res)
//         .then(() => { console.log('tattoo remove reservation')})
//         .catch(() => { console.log('error')})
// })
// // 타투제거 시작
// server.post('/remove', (req, res) => {
//     routing_to.removeStart(req.body, res)
//         .then(() => { console.log('tattoo remove start')})
//         .catch(() => { console.log('error')})
// })
// // 타투제거 완료
// server.put('/remove', (req, res) => {
//     routing_to.removeEnd(req.body, res)
//         .then(() => { console.log('tattoo remove end')})
//         .catch(() => { console.log('error')})
// })


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


