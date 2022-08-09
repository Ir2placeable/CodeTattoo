const guest = require('./logic/guest')
const user = require('./logic/user')
const tattooist = require('./logic/tattooist')
const admin = require('./logic/admin')

const mongoose = require("mongoose");
const config = require('./config/key')

const express = require('express')
const server = express()
const PORT = 3001

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended : true }))

const cors = require('cors');
server.use(cors());

// 엔트리 페이지
server.get('/entry', (req, res) => {
    console.log('\n')
    console.log('page : entry')

    guest.pageEntry()
    res.send({ success : true })
})

// 회원가입
server.post('/register/:type', (req, res) => {
    console.log('\n')
    console.log('command : register for', req.params.type)
    console.log('body : ', req.body)

    // user view
    if (req.params.type === 'user') {
        guest.userRegister(req.body)
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
        guest.tattooistRegister(req.body)
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
// 로그인
server.post('/login/:type', (req, res) => {
    console.log('\n')
    console.log('command : login for ', req.params.type)
    console.log('body : ', req.body)

    // user view
    if (req.params.type === 'user') {
        guest.userLogin(req.body)
            .then((returned) => {
                res.send({success : true, user_info : returned })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // tattooist view
    else if (req.params.type === 'tattooist') {
        guest.tattooistLogin(req.body)
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
// 회원탈퇴
server.post('/sign-out/:type', (req, res) => {
    console.log('\n')
    console.log('command : sign-out for ', req.params.type)
    console.log('body : ', req.body)

    // user view
    if (req.params.type === 'user') {
        guest.userSignOut(req.body)
            .then((returned) => {
                res.send({ success : true })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // tattooist view
    else if (req.params.type === 'tattooist') {
        guest.tattooistSignOut(req.body)
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

// 도안 페이지
server.get('/drafts/:filter/:page', (req, res) => {
    console.log('\n')
    console.log('page : Draft')
    console.log('params : ', req.params)
    console.log('query : ', req.query)

    // user view
    if (req.query['user_id']) {
        console.log('user view')
        user.pageDraft(req.params, req.query)
            .then((returned) => {
                res.send({ success : true, count : returned.count, drafts : returned.return_value })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // tattooist view
    else if (req.query['tattooist_id']) {
        console.log('tattooist view')
        tattooist.pageDraft(req.params, req.query)
            .then((returned) => {
                res.send({ success : true, count : returned.count, drafts : returned.return_value })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // guest view
    else {
        console.log('guest view')
        guest.pageDraft(req.params, req.query)
            .then((returned) => {
                res.send({ success : true, count : returned.count, drafts : returned.return_value })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
})
// 도안 세부페이지
server.get('/draft/:id', (req, res) => {
    console.log('\n')
    console.log('page : Draft detail')
    console.log('params : ', req.params)

    // user view
    if (req.query['user_id']) {
        console.log('query : ', req.query)
        console.log('user view')
        user.pageDraftDetail(req.params, req.query)
            .then((returned) => {
                res.send({ success : true, draft : returned })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // tattooist view
    else if (req.query['tattooist_id']) {
        console.log('query : ', req.query)
        console.log('tattooist view')
        tattooist.pageDraftDetail(req.params, req.query)
            .then((returned) => {
                res.send({ success : true, draft : returned })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // guest view
    else {
        console.log('guest view')
        guest.pageDraftDetail(req.params)
            .then((returned) => {
                res.send({ success : true, draft : returned })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
})
// 타투이스트 페이지
server.get('/tattooists/:filter/:page', (req, res) => {
    console.log('\n')
    console.log('page : Tattooist')
    console.log('params : ', req.params)
    console.log('query : ', req.query)

    // user view
    if (req.query['user_id']) {
        console.log('user view')
        user.pageTattooist(req.params, req.query)
            .then((returned) => {
                res.send({ success : true, count : returned.count, tattooists : returned.return_value })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // tattooist view
    else if (req.query['tattooist_id']) {
        console.log('tattooist view')
        tattooist.pageTattooist(req.params, req.query)
            .then((returned) => {
                res.send({ success : true, count : returned.count, tattooists : returned.return_value })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // guest view
    else {
        console.log('guest view')
        guest.pageTattooist(req.params, req.query)
            .then((returned) => {
                res.send({ success : true, count : returned.count, tattooists : returned.return_value })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
})
// 타투이스트 세부 페이지
server.get('/tattooist/:id/:filter', (req, res) => {
    console.log('\n')
    console.log('page : Tattooist detail')
    console.log('params : ', req.params)

    // user view
    if (req.query['user_id']) {
        console.log('query : ', req.query)
        console.log('user view')
        user.pageTattooistDetail(req.params, req.query)
            .then((returned) => {
                res.send({ success : true, tattooist : returned.tattooist_info, data : returned.return_value })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // tattooist view
    else if (req.query['tattooist_id']) {
        console.log('query : ', req.query)
        console.log('tattooist view')
        tattooist.pageTattooistDetail(req.params, req.query)
            .then((returned) => {
                res.send({ success : true, tattooist : returned.tattooist_info, data : returned.return_value })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // guest view
    else {
        console.log('guest view')
        guest.pageTattooistDetail(req.params)
            .then((returned) => {
                res.send({ success : true, tattooist : returned.tattooist_info, data : returned.return_value })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
})
// 스크랩 페이지
server.get('/scraps/:filter/:page', (req, res) => {
    console.log('\n')
    console.log('command : User Scrap Page')
    console.log('params : ', req.params)
    console.log('body : ', req.query)

    // scrap : draft menu
    if (req.params.filter === 'draft') {
        user.pageScrapDraft(req.params, req.query)
            .then((returned) => {
                res.send({ success : true, count : returned.count, drafts : returned.return_value })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // scrap : tattooist menu
    else if (req.params.filter === 'tattooist') {
        user.pageScrapTattooist(req.params, req.query)
            .then((returned) => {
                res.send({ success : true, count : returned.count, tattooists : returned.return_value })
            })
            .catch((err) => {
                res.send({ success : false, code : err })
            })
    }
    // wrong filter error
    else {
        res.send({ success : false, code : 12 })
    }

})
// 예약 페이지
server.get('/reservations', (req, res) => {

})

// 유저 채팅 리스트 페이지
server.get('/user/direct/inbox', (req, res) => {
    console.log('\n')
    console.log('Page : User Chatting Page')
    console.log('params : ', req.params)
    console.log('body : ', req.query)

    res.send({ success : false, code : 'not developed' })
})
// 유저 마이페이지
server.get('/user/my-page/:id', (req, res) => {
    console.log('\n')
    console.log('page : User My page')
    console.log('params : ', req.params)

    user.pageMyPage(req.params)
        .then((returned) => {
            res.send({ success : true, user_info : returned.user_info, tattoos : returned.return_value })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 유저 정보 수정
server.patch('/user/my-page/:id', (req, res) => {
    console.log('\n')
    console.log('command : User Info Edit')
    console.log('params : ', req.params)
    console.log('body : ', req.body)

    user.userInfoEdit(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 유저 이미지 수정
server.post('/user/my-page/:id', (req, res) => {
    console.log('\n')
    console.log('command : User Image Edit')
    console.log('params : ', req.params)
    console.log('body : ', req.body)

    user.userImageEdit(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 유저 도안 스크랩
server.post('/scrap/:id', (req, res) => {
    console.log('\n')
    console.log('command : User Scrap Draft')
    console.log('params : ', req.params)
    console.log('body : ', req.body)

    user.scrapDraft(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 유저 도안 스크랩 취소
server.post('/unscrap/:id', (req, res) => {
    console.log('\n')
    console.log('command : User UnScrap Draft')
    console.log('params : ', req.params)
    console.log('body : ', req.body)

    user.unScrapDraft(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 유저 타투이스트 팔로우
server.post('/follow/:id', (req, res) => {
    console.log('\n')
    console.log('command : User Follow Tattooist')
    console.log('params : ', req.params)
    console.log('body : ', req.body)

    user.followTattooist(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 유저 타투이스트 언팔로우
server.post('/unfollow/:id', (req, res) => {
    console.log('\n')
    console.log('command : User UnFollow Tattooist')
    console.log('params : ', req.params)
    console.log('body : ', req.body)

    user.unFollowTattooist(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})

// 타투이스트 정보 수정
server.patch('/tattooist/my-page/:id', (req, res) => {
    console.log('\n')
    console.log('command : Tattooist Info Edit')
    console.log('params : ', req.params)
    console.log('body : ', req.body)

    tattooist.tattooistInfoEdit(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 타투이스트 이미지 수정
server.post('/tattooist/my-page/:id', (req, res) => {
    console.log('\n')
    console.log('command : Tattooist Image Edit')
    console.log('params : ', req.params)
    console.log('body : ', req.body)

    tattooist.tattooistImageEdit(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 타투이스트 도안 생성
server.post('/create/draft/:id', (req, res) => {
    console.log('\n')
    console.log('command : Create draft')
    console.log('params : ', req.params)

    tattooist.createDraft(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
// 타투이스트 도안 삭제
server.post('/remove/draft/:id', (req, res) => {
    console.log('\n')
    console.log('command : Remove draft')
    console.log('params : ', req.params)
    console.log('body : ', req.body)

    tattooist.removeDraft(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})

// admin
// entry page 접속자 수 확인
server.get('/connections', (req, res) => {
    const connections = guest.getConnections()
    res.send({ connections : connections })
})
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

server.listen(PORT, () => {
    console.log('server opened')
    mongoose.connect(config.mongoURI)
        .then(() => { console.log('db connected')} )
        .catch(() => { console.log('db connect failed')} )
})
