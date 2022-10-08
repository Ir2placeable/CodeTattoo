// 코드 목적 : 메인 서버가 처리할 수 있는 API 와 business logic 을 연결한다.

const page = require('./logic/page')
const admin = require('./logic/admin')
const command = require('./logic/command')
const chatServer = require('./module/chatServer')

const express = require('express')
const server = express()
const PORT = 3001

const mongoose = require("mongoose");
const config = require('./config/key')

const bodyParser = require('body-parser');
server.use(bodyParser.json({ limit : "10mb" }));
server.use(bodyParser.urlencoded({ limit : "10mb", extended : true }))

const cors = require('cors');
server.use(cors());

const ErrorMessage = require('./ErrorControl')
const ErrorLogging = function(errCode) {
    console.log(errCode)
    let response = { success : false, code : 199 }

    const expectedError = ErrorMessage[errCode]
    if (expectedError) {
        console.log(expectedError)
        response.code = errCode
    } else {
        console.log('***UNEXPECTED ERROR***\n', errCode)
    }

    return response
}

// 처리 횟수 카운팅
let connections = 0
server.use('/', (req, res, next) => {
    connections += 1
    console.log('------------------ ', connections ,' -----------------------------')
    console.log('url : ', req.url)
    console.log('query : ', req.query)
    console.log('body : ', req.body)
    next()
})

// 페이지 모음
// 페이지 : 도안
server.get('/drafts/:filter/:genre/:page', (req, res) => {
    console.log('Page : Draft')

    page.draft(req.params, req.query)
        .then((returned) => {
            res.send({ success : true, count : returned.count, drafts : returned.return_value })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})
// 페이지 : 도안 세부
server.get('/draft/:id', (req, res) => {
    console.log('Page : Draft detail')

    page.draftDetail(req.params, req.query)
        .then((returned) => {
            res.send({ success : true, draft : returned })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
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
            res.send(ErrorLogging(err))
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
            res.send(ErrorLogging(err))
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
            res.send(ErrorLogging(err))
        })

})
// 페이지 : 유저 마이페이지
server.get('/user/my-page/:id', (req, res) => {
    console.log('page : User My page')

    page.userMyPage(req.params)
        .then((returned) => {
            res.send({ success : true, user_info : returned.user_info, tattoos : returned.tattoos })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })

})
// 페이지 : 작업물 세부
server.get('/artwork/:id', (req, res) => {
    console.log('page : Artwork Detail')

    page.artworkDetail(req.params, req.query)
        .then((returned) => {
            res.send({ success : true, image : returned.image, artwork_info : returned.info, states : returned.states })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})
// 페이지 : 예약
server.get('/reservations', (req, res) => {
    console.log('Page : Tattooist Reservation')

    page.reservation(req.query)
        .then((returned) => {
            res.send({ success : true, reservations : returned })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })

})
// 페이지 : 예약 세부 및 작업
server.get('/reservation/:id', (req, res) => {
    console.log('Page : Reservation Detail')

    page.reservationDetail(req.params)
        .then((returned) => {
            res.send({ success : true, reservation : returned.reservation_info, procedure_info : returned.procedure_info  })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})
// 페이지 : 경매
server.get('/auctions/:filter/:page', (req, res) => {
    console.log('Page : Auctions')

    page.auction(req.params)
        .then((returned) => {
            res.send({ success : true, count : returned.count, auctions : returned.return_value })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})
// 페이지 : 경매 세부
server.get('/auction/:id', (req, res) => {
    console.log('Page : Auction Detail')

    page.auctionDetail(req.params, req.query)
        .then((returned) => {
            res.send({ success : true, auction : returned.return_value})
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
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
                console.log(ErrorMessage[err])
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
                console.log(ErrorMessage[err])
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
                console.log(ErrorMessage[err])
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
                console.log(ErrorMessage[err])
                res.send({ success : false, code : err })
            })
    }
    // wrong type error
    else {
        console.log(ErrorMessage["6"])
        res.send({ success : false, code : 6 })
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
                console.log(ErrorMessage[err])
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
                console.log(ErrorMessage[err])
                res.send({ success : false, code : err })
            })
    }
    // wrong type error
    else {
        console.log(ErrorMessage["6"])
        res.send({ success : false, code : 6 })
    }
})
// 명령 : 비밀번호 변경
server.patch('/:type/pwd/:id', (req, res) => {
    if (req.params.type === 'user') {
        console.log('command : user edit password')

        command.userPasswordEdit(req.params, req.body)
            .then((returned) => {
                res.send({ success : true })
            })
            .catch((err) => {
                console.log(ErrorMessage[err])
                res.send({ success : false, code : err })
            })
    } else if (req.params.type === 'tattooist') {
        console.log('command : tattooist edit password')

        command.tattooistPasswordEdit(req.params, req.body)
            .then((returned) => {
                res.send({ success : true })
            })
            .catch((err) => {
                console.log(ErrorMessage[err])
                res.send({ success : false, code : err })
            })
    } else {
        console.log(ErrorMessage["6"])
        res.send({ success : false, code : 6 })
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
            res.send(ErrorLogging(err))
        })

})
// 명령 : 유저 이미지수정
server.post('/user/my-page/:id', (req, res) => {
    console.log('command : User Image Edit')

    command.userImageEdit(req.params, req.body)
        .then((returned) => {
            res.send({ success : true, image : returned })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
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
            res.send(ErrorLogging(err))
        })

})
// 명령 : 타투이스트 이미지수정
server.post('/tattooist/my-page/:id', (req, res) => {
    console.log('command : Tattooist Image Edit')

    command.tattooistImageEdit(req.params, req.body)
        .then((returned) => {
            res.send({ success : true, image : returned })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
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
            res.send(ErrorLogging(err))
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
            res.send(ErrorLogging(err))
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
            res.send(ErrorLogging(err))
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
            res.send(ErrorLogging(err))
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
            res.send(ErrorLogging(err))
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
            res.send(ErrorLogging(err))
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
            res.send(ErrorLogging(err))
        })

})
// 명령 : 타투이스트 일정 비활성화
server.post('/create/unavailable/:id', (req, res) => {
    command.createUnavailable(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})
// 명령 : 타투이스트 일정 비활성화 취소
server.post('/remove/unavailable/:id', (req, res) => {
    command.deleteUnavailable(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})
// 명령 : 경매 등록
server.post('/create/auction/:id', (req, res) => {
    console.log('command : create auction')

    command.createAuction(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})
// 명령 : 경매 삭제
server.post('/remove/auction/:id', (req, res) => {
    console.log('command : delete auction')

    command.deleteAuction(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})
// 명령 : 경매 응찰
server.post('/auction/:id', (req, res) => {
    console.log('command : reply auction')

    command.bidAuction(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})
// 명령 : 경매 입찰
server.patch('/auction/:id', (req, res) => {
    console.log('command : finish auction')

    command.finishAuction(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})


// 타투 작업 시나리오 명령 모음
// 명령 : 작업 요청 = 예약 생성
server.post('/create/reservation', (req, res) => {
    console.log('command : Create reservation')

    command.createReservation(req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})
// 명령 : 예약 정보 수정
server.patch('/reservation/:id', (req, res) => {
    console.log('command : Edit reservation Info')

    command.editReservation(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })

})
// 명령 : 예약 도안 수정
server.post('/reservation/:id', (req, res) => {
    console.log('command : Edit reservation Image')

    command.editReservationImage(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })

})
// 명령 : 예약 확정
server.post('/confirm/reservation/:id', (req, res) => {
    console.log('command : Confirm reservation')

    command.confirmReservation(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })

})
// 명령 : 예약 불발
server.post('/reject/reservation/:id', (req, res) => {
    console.log('command : Reject reservation')

    command.rejectReservation(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })

})
// 명령 : 작업 시작
server.post('/procedure/:id', (req, res) => {
    console.log('command : Begin Procedure')

    command.beginProcedure(req.params, req.body)
        .then((returned) => {
            res.send({ success : true, tattoo_id : returned })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})
// 명령 : 작업 완료
server.patch('/procedure/:id', (req, res) => {
    console.log('command : Begin Procedure')

    command.finishProcedure(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})
// 명령 : 유저 이력 조회
server.get('/user/my-tattoo/:id', (req, res) => {
    console.log('command : my tattoo querying')
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
// Reservation 초기화
server.get('/reset/reservation', (req, res) => {
    admin.resetReservation()
        .then(() => { res.send({ success : true })})
})
// DB 전체 초기화
server.get('/reset/all', (req, res) => {
    admin.resetAll()
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
    admin.getUser().then((result) => { res.send({ users : result }) })
})
// Reservation 찾기
server.get('/get/reservation', (req, res) => {
    admin.getReservation().then((result) => { res.send({ reservations : result }) })
})
// Auction 찾기
server.get('/get/auction', (req, res) => {
    admin.getAuction().then((result) => { res.send({ auctions : result }) })
})

// 블록체인 직접 요청
// 블록체인에 데이터 기록 요청
server.post('/blockchain/invoke/:function/:key', (req, res) => {
    admin.invokeBlockchain(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })

})
// 블록체인에서 데이터 반환 요청
server.get('/blockchain/query/:key', (req, res) => {
    admin.queryBlockchain(req.params, req.body)
        .then((returned) => {
            res.send({ success : true, tattoo_info : returned })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })

})
// 블록체인에서 히스토리 반환 요청
server.get('/blockchain/history/:key', (req, res) => {
    admin.historyBlockchain(req.params)
        .then((returned) => {
            res.send({ success : true, tattoo_history : returned })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })

})
// 블록체인에서 부작용 데이터 반환 요청
server.get('/blockchain/side-effects/:key', (req, res) => {
    admin.querySideEffectsBlockchain(req.params)
        .then((returned) => {
            res.send({ success : true, tattoo_side_effects : returned })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })

})

// 채팅 서버 명령 모음
// 유저 닉네임 리스트 반환
server.get('/chat/profile/:type', (req, res) => {
    console.log('command : get profile for chatting')

    chatServer.getProfile(req.params, req.query)
        .then((returned) => {
            res.send({ success : true, profile : returned.profile, reservation_id : returned.reservation_id, confirmed : returned.confirmed })
        })
        .catch((err) => {
            res.send(ErrorLogging(err))
        })
})


server.listen(PORT, () => {
    console.log('server opened')

    mongoose.connect(config.mongoURI)
        .then(() => { console.log("MongoDB connected") })
        .catch(() => { console.log("MongoDB connect failed") })
})