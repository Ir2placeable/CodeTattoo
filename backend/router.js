const page = require('./logic/page')
const admin = require('./logic/admin')
const command = require('./logic/command')

const mongoose = require("mongoose");
const config = require('./config/key')

const express = require('express')
const server = express()
const PORT = 3001

let connections;

const bodyParser = require('body-parser');
server.use(bodyParser.json({ limit : "10mb" }));
server.use(bodyParser.urlencoded({ limit : "10mb", extended : true }))

const cors = require('cors');
server.use(cors());

server.use('/', (req, res, next) => {
    connections += 1
    console.log('\n')
    console.log('url : ', req.url)
    console.log('query : ', req.query)
    console.log('body : ', req.body)
    next()
})

// 페이지 모음
// 페이지 : 도안
server.get('/drafts/:filter/:page', (req, res) => {
    console.log('Page : Draft')

    page.draft(req.params, req.query)
        .then((returned) => {
            res.send({ success : true, count : returned.count, drafts : returned.return_value })
        })
        .catch((errCode) => {
            res.send({ success : false, err : errCode })
        })
})
// 페이지 : 도안 세부
server.get('/draft/:id', (req, res) => {
    console.log('Page : Draft detail')

    page.draftDetail(req.params, req.query)
        .then((returned) => {
            res.send({ success : true, draft : returned })
        })
})
// 페이지 : 타투이스트
server.get('/tattooists/:filter/:page', (req, res) => {
    console.log('Page : Tattooist')

    page.tattooist(req.params, req.query)
        .then((returned) => {
            res.send({ success : true, count : returned.count, tattooists : returned.return_value })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 페이지 : 타투이스트 세부
server.get('/tattooist/:id/:filter', (req, res) => {
    console.log('Page : Tattooist detail')

    page.tattooistDetail(req.params, req.query)
        .then((returned) => {
            res.send({ success : true, tattooist : returned.tattooist_info, data : returned.return_value })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 페이지 : 스크랩
server.get('/scraps/:filter/:page', (req, res) => {
    console.log('Page : User Scrap')

    page.scrap(req.params, req.query)
        .then((returned) => {
            res.send({ success : true, count : returned.count, drafts : returned.drafts, tattooists : returned.tattooists })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 페이지 : 예약
server.get('/reservations/:id', (req, res) => {
    console.log('Page : Tattooist Reservation')

    page.reservation(req.params)
        .then((returned) => {
            res.send({ success : true, reservations : returned})
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// (미개발) 페이지 : 유저 채팅 박스
server.get('/user/direct/inbox', (req, res) => {
    console.log('Page : User Chatting Page')

    res.send({ success : false, code : 'not developed' })
})

// 페이지 : 유저 마이페이지
server.get('/user/my-page/:id', (req, res) => {
    console.log('page : User My page')

    page.userMyPage(req.params)
        .then((returned) => {
            res.send({ success : true, user_info : returned.user_info, tattoos : returned.return_value })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})

// 명령 모음
// 명령 : 회원가입
server.post('/register/:type', (req, res) => {
    console.log('command : register for', req.params.type)

    // user view
    if (req.params.type === 'user') {
        command.userRegister(req.body)
            .then(() => {
                res.send({ success : true })
            })
            .catch((err) => {
                console.log(err)
                res.send({ success : false, code : err })
            })
    }
    // tattooist view
    else if (req.params.type === 'tattooist') {
        command.tattooistRegister(req.body)
            .then(() => {
                res.send({ success : true })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // wrong type error
    else {
        res.send({ success : false, code : 12 })
    }
})
// 명령 : 로그인
server.post('/login/:type', (req, res) => {
    console.log('command : login for ', req.params.type)

    // user view
    if (req.params.type === 'user') {
        command.userLogin(req.body)
            .then((returned) => {
                res.send({success : true, user_info : returned })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // tattooist view
    else if (req.params.type === 'tattooist') {
        command.tattooistLogin(req.body)
            .then((returned) => {
                res.send({ success : true, tattooist_info : returned })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // wrong type error
    else {
        res.send({ success : false, code : 12 })
    }
})
// 명령 : 회원탈퇴
server.post('/sign-out/:type', (req, res) => {
    console.log('command : sign-out for ', req.params.type)

    // user view
    if (req.params.type === 'user') {
        command.userSignOut(req.body)
            .then((returned) => {
                res.send({ success : true })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // tattooist view
    else if (req.params.type === 'tattooist') {
        command.tattooistSignOut(req.body)
            .then((returned) => {
                res.send({ success : true })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // wrong type error
    else {
        res.send({ success : false, code : 12 })
    }
})
// 명령 : 유저 정보수정
server.patch('/user/my-page/:id', (req, res) => {
    console.log('command : User Info Edit')

    command.userInfoEdit(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 명령 : 유저 이미지수정
server.post('/user/my-page/:id', (req, res) => {
    console.log('command : User Image Edit')

    command.userImageEdit(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 명령 : 도안 스크랩
server.post('/scrap/:id', (req, res) => {
    console.log('command : User Scrap Draft')

    command.scrapDraft(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 명령 : 도안 스크랩 취소
server.post('/unscrap/:id', (req, res) => {
    console.log('command : User UnScrap Draft')

    command.unScrapDraft(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 명령 : 타투이스트 팔로우
server.post('/follow/:id', (req, res) => {
    console.log('command : User Follow Tattooist')

    command.followTattooist(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 명령 : 타투이스트 언팔로우
server.post('/unfollow/:id', (req, res) => {
    console.log('command : User UnFollow Tattooist')

    command.unFollowTattooist(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 명령 : 타투이스트 정보수정
server.patch('/tattooist/my-page/:id', (req, res) => {
    console.log('command : Tattooist Info Edit')

    command.tattooistInfoEdit(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 명령 : 타투이스트 이미지수정
server.post('/tattooist/my-page/:id', (req, res) => {
    console.log('command : Tattooist Image Edit')

    command.tattooistImageEdit(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 명령 : 도안 생성
server.post('/create/draft/:id', (req, res) => {
    console.log('command : Create draft')

    command.createDraft(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 명령 : 도안 삭제
server.post('/remove/draft/:id', (req, res) => {
    console.log('command : Remove draft')

    command.removeDraft(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 명령 : 도안 수정
server.patch('/draft/:id', (req, res) => {
    console.log('command : edit draft detail')

    command.editDraft(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
            console.log(err)
        })
})
// 명령 : 예약 생성
server.post('/create/reservation/:id', (req, res) => {
    console.log('command : Create reservation')

    command.createReservation(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 명령 : 비밀번호 변경
server.patch('/edit/pwd/:type/:id', (req, res) => {
    if (req.params.type === 'user') {
        console.log('command : user edit password')

        command.userPasswordEdit(req.params, req.body)
            .then((returned) => {
                res.send({ success : true })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    } else if (req.params.type === 'tattooist') {
        console.log('command : tattooist edit password')

        command.tattooistPasswordEdit(req.params, req.body)
            .then((returned) => {
                res.send({ success : true })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    } else {
        res.send({ success : false, code : "wrong filter" })
    }
})


// 관리자 명령 모음
// User 초기화
server.get('/reset/user', (req, res) => {
    admin.resetUser()
        .then(() => { res.send({ success : true })})
})
// Draft 초기화
server.get('/reset/draft', (req, res) => {
    admin.resetDraft()
        .then(() => { res.send({ success : true })})
})
// Tattooist 초기화
server.get('/reset/tattooist', (req, res) => {
    admin.resetUser()
        .then(() => { res.send({ success : true })})
})
// Tattoo 초기화
server.get('/reset/tattoo', (req, res) => {
    admin.resetTattoo()
        .then(() => { res.send({ success : true })})
})
// Draft 찾기
server.get('/get/draft', (req, res) => {
    admin.getDraft().then((result) => { res.send({ drafts : result}) })
})
// Tattooist 찾기
server.get('/get/tattooist', (req, res) => {
    admin.getTattooist().then((result) => { res.send({ tattooists : result}) })
})
// User 찾기
server.get('/get/user', (req, res) => {
    admin.getUser().then((result) => { res.send({ users : result}) })
})
// 블록체인에 데이터 기록 요청
server.post('/blockchain/invoke/:function_name/:key', (req, res) => {
    admin.invokeBlockchain(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 블록체인에서 데이터 반환 요청
server.get('/blockchain/query/:key', (req, res) => {
    admin.queryBlockchain(req.params, req.body)
        .then((returned) => {
            res.send({ success : true, tattoo_info : returned })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 블록체인에서 히스토리 반환 요청
server.get('/blockchain/history/:key', (req, res) => {
    admin.historyBlockchain(req.params)
        .then((returned) => {
            res.send({ success : true, tattoo_history : returned })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 블록체인에서 부작용 데이터 반환 요청
server.get('/blockchain/side-effects/:key', (req, res) => {
    admin.querySideEffectsBlockchain(req.params)
        .then((returned) => {
            res.send({ success : true, tattoo_side_effects : returned })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})


server.listen(PORT, () => {
    console.log('server opened')
    mongoose.connect(config.mongoURI)
        .then(() => { console.log('db connected')} )
        .catch(() => { console.log('db connect failed')} )
})
