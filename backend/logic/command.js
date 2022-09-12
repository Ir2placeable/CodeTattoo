// 코드 목적 : Main Server 로 요청한 명령을 처리하는 Business logic 을 수행한다.

const {User} = require("../DBModel/User");
const {Reservation} = require("../DBModel/Reservation")
const imageStorage = require("../module/imageStorage");
const {Draft} = require("../DBModel/Draft");
const {Tattooist} = require("../DBModel/Tattooist");
const {Tattoo} = require("../DBModel/Tattoo")
const blockchain = require("../module/blockchain")
const chatServer = require("../module/chatting")

// 유저 로그인
exports.userLogin = async function(body) {
    // 입력한 email 데이터 존재 여부 확인
    const user = await User.findOne({ email : body.email })
    if (!user) { throw 21 }

    // hashed password 일치 여부 확인
    return await user.comparePassword(body.pwd).then((isMatch) => {
        if (!isMatch) { throw 22 }

        // hashed password 일치하는 경우 Cookie 로 사용될 데이터 반환
        return {
            user_id: String(user['_id']),
            nickname: user['nickname'],
            image: user['image'],
            description: user['description'],
            location : user['location'],
            email : user['email']
        }
    });
}
// 유저 회원가입
exports.userRegister = async function(body) {
    // email 중복 확인
    const user = await User.findOne({ email : body.email })
    if (user) { throw 20 }

    // email 중복 통과, DB에 새로운 유저 정보 생성
    const new_user = new User(body)
    await new_user.save()
}
// 유저 회원탈퇴
exports.userSignOut = async function(body) {
    // 입력한 email 데이터 존재 여부 확인
    const user = await User.findOne({ email : body.email })
    if (!user) { throw 21 }

    // hashed password 일치 여부 확인
    await user.comparePassword(body.pwd, (err, isMatch) => {
        if (!isMatch) { throw 22 }
    })

    // 유저가 스크랩한 도안의 좋아요 수 감소
    for await (let draft_id of user['scraps']) {
        await Draft.updateOne({ _id : draft_id }, {$inc : { like : -1 }})
    }
    // 유저가 팔로우한 타투이스트의 팔로우 수 감소
    for await (let tattooist_id of user['follows']) {
        await Tattooist.updateOne({ _id : tattooist_id }, {$inc : { follower : -1 }})
    }

    // 유저 데이터 삭제
    await User.deleteOne({ email : body.email })
}
// 유저 비밀번호 변경
exports.userPasswordEdit = async function(params, body) {
    // 유저 DB 검색
    const user = await User.findOne({ _id : params.id })
    if (!user) { throw 1 }

    // hashed password 생성
    const new_password = await user.editPassword(body.pwd)
    // 유저 데이터 변경
    await User.updateOne({ _id : params.id }, {$set : { pwd : new_password }})
}

// 타투이스트 로그인
exports.tattooistLogin = async function(body) {
    // 입력한 email 데이터 존재 여부 확인
    const tattooist = await Tattooist.findOne({ email : body.email })
    if (!tattooist) { throw 2 }

    // hashed password 일치 여부 확인
    return await tattooist.comparePassword(body.pwd).then((isMatch) => {
        if (!isMatch) { throw 22 }

        // hashed password 일치하는 경우 Cookie 로 사용될 데이터 반환
        return {
            tattooist_id : String(tattooist['_id']),
            nickname : tattooist['nickname'],
            image : tattooist['image'],
            description : tattooist['description'],
            specialize : tattooist['specialize'],
            location : tattooist['location'],
            email : tattooist['email']
        }
    })
}
// 타투이스트 회원가입
exports.tattooistRegister = async function(body) {
    // email 중복 파악
    const tattooist = await Tattooist.findOne({ email : body.email })
    if (tattooist) { throw 20 }

    // email 중복 통과 시, 입력된 데이터를 DB에 저장
    const new_tattooist = new Tattooist(body)
    await new_tattooist.save()
}
// 타투이스트 회원탈퇴
exports.tattooistSignOut = async function(body) {
    // 입력한 email 데이터 존재 여부 확인
    const tattooist = await Tattooist.findOne({ email : body.email })
    if (!tattooist) { throw 2 }

    // hashed password 일치 여부 확인
    await tattooist.comparePassword(body.pwd, (err, isMatch) => {
        if (!isMatch) { throw 22 }
    })

    // 타투이스트가 생성한 도안 데이터 삭제
    for await (let draft_id of tattooist['drafts']) {
        await Draft.deleteOne({ _id : draft_id })
    }

    // 타투이스트 데이터 삭제
    await Tattooist.deleteOne({ email : body.email })
}
// 타투이스트 비밀번호 변경
exports.tattooistPasswordEdit = async function(params, body) {
    const tattooist = await Tattooist.findOne({ _id : params.id })
    if (!tattooist) { throw 2 }

    // hashed password 생성
    const new_password = await tattooist.editPassword(body.pwd)
    // 타투이스트 데이터 변경
    await Tattooist.updateOne({ _id : params.id }, {$set : { pwd : new_password }})
}

// 유저 정보 변경
exports.userInfoEdit= async function(params, body) {
    // 유저 데이터 변경
    User.updateOne({ _id : params.id }, {$set : { nickname : body.nickname, location : body.location }}, (err, user) => {
        if (!user) { throw 1 }
        if (err) { throw 23 }
    })
}
// 유저 이미지 변경
exports.userImageEdit = async function(params, body) {
    // ImageStorage 사용 파라미터 준비
    const imageStorage_params = { title : params.id, image : body.image, mime : body.mime }
    // 이미지 업로드 후, url 반환
    const image_url = await imageStorage.upload(imageStorage_params)

    // 유저 데이터 변경
    User.updateOne({ _id : params.id }, {$set : { image : image_url }}, (err, user) => {
        if (!user) { throw 1 }
        if (err) { throw 23 }
    })

    // 기존 유저 이미지 삭제
    await imageStorage.delete(params.id)

    return image_url
}

// 타투이스트 정보 변경
exports.tattooistInfoEdit= async function(params, body) {
    // 타투이스트 데이터 변경
    Tattooist.updateOne({ _id : params.id }, {$set : { nickname : body.nickname, location : body.location, specialize : body.specialize, description : body.description }}, (err, tattooist) => {
        if (!tattooist) { throw 2 }
        if (err) { throw 23 }
    })
}
// 타투이스트 이미지 변경
exports.tattooistImageEdit = async function(params, body) {
    // ImageStorage 사용 파라미터 준비
    const imageStorage_params = { title : params.id, image : body.image, mime : body.mime }
    // 이미지 업로드 후, url 반환
    const image_url = await imageStorage.upload(imageStorage_params)

    // 타투이스트 데이터 변경
    Tattooist.updateOne({ _id : params.id }, {$set : { image : image_url }}, (err, tattooist) => {
        if (!tattooist) { throw 2 }
        if (err) { throw 23 }
    })

    // 기존 이미지 삭제
    await imageStorage.delete(params.id)

    return image_url
}

// 도안 생성
exports.createDraft = async function(params, body) {
    // DB 타투이스트 검색
    const tattooist = await Tattooist.findOne({ _id : params.id })
    if (!tattooist) { throw 2 }

    // 생성할 도안 정보 스키마
    const draft_schema = {
        drawer : tattooist['_id'],
        title : body['title'],
        image : "",
        genre : body['genre'],
        keywords : body['keywords'],
        cost : body['cost'],
        timestamp : Math.floor(Date.now() / 1000)
    }

    // 새로운 도안 생성
    let new_draft = new Draft(draft_schema)

    // ImageStorage 사용 파라미터 준비
    const imageStorage_params = { title : String(new_draft['_id']), image : body.image, mime : body.mime }
    // 이미지 업로드 후, url 반환
    const image_url = await imageStorage.upload(imageStorage_params)
    // 도안 Object 에 image url 추가
    new_draft['image'] = image_url

    // DB에 도안 저장
    await new_draft.save()

    // 타투이스트 데이터 변경
    await Tattooist.updateOne({ _id : params.id }, {$push : { drafts : new_draft._id }})
}
// 도안 삭제
exports.removeDraft= async function(params, body) {
    Tattooist.updateOne({ _id : params.id }, {$pull : { drafts : body.draft_id }}, (err, tattooist) => {
        if (!tattooist) { throw 2 }
        if (err) { throw 23 }
    })
    Draft.deleteOne({ _id : body.draft_id }, (err, draft) => {
        if (!draft) { throw 2 }
        if (err) { throw 23 }
    })
}
// 도안 정보 수정
exports.editDraft= async function(params, body) {
    Draft.updateOne({ _id : params.id }, { title : body.title, genre : body.genre, keywords : body.keywords, cost : body.cost }, (err, draft) => {
        if (!draft) { throw 3 }
        if (err) { throw 23 }
    })
}

// 도안 스크랩
exports.scrapDraft= async function(params, body) {
    Draft.updateOne({ _id : body.draft_id }, {$inc : { like : 1 }}, (err, draft) => {
        if (!draft) { throw 3 }
        if (err) { throw 23 }
    })
    User.updateOne({ _id : params.id }, {$push : { scraps : body.draft_id }}, (err, user) => {
        if (!user) { throw 1 }
        if (err) { throw 23 }
    })
}
// 도안 스크랩 취소
exports.unScrapDraft= async function(params, body) {
    Draft.updateOne({ _id : body.draft_id }, {$inc : { like : -1 }}, (err, draft) => {
        if (!draft) { throw 3 }
        if (err) { throw 23 }
    })
    User.updateOne({ _id : params.id }, {$pull : { scraps : body.draft_id }}, (err, user) => {
        if (!user) { throw 1 }
        if (err) { throw 23 }
    })
}

// 타투이스트 팔로우
exports.followTattooist= async function(params, body) {
    Tattooist.updateOne({ _id : body.tattooist_id }, {$inc : { follower : 1 }}, (err, tattooist) => {
        if (!tattooist) { throw 2 }
        if (err) { throw 23 }
    })
    User.updateOne({ _id : params.id }, {$push : { follows : body.tattooist_id }}, (err, user) => {
        if (!user) { throw 1 }
        if (err) { throw 23 }
    })
}
// 타투이스트 팔로우 취소
exports.unFollowTattooist= async function(params, body) {
    Tattooist.updateOne({ _id : body.tattooist_id }, {$inc : { follower : -1 }}, (err, tattooist) => {
        if (!tattooist) { throw 2 }
        if (err) { throw 23 }
    })
    User.updateOne({ _id : params.id }, {$pull : { follows : body.tattooist_id }}, (err, user) => {
        if (!user) { throw 1 }
        if (err) { throw 23 }
    })
}

// 일정 비활성화
exports.createUnavailable = async function(params, body) {
    const tattooist = await Tattooist.findOne({ _id : params.id })
    if (!tattooist) { throw 2 }

    for await (let unavailable of body['unavailable']) {
        await Tattooist.updateOne({ _id : params.id }, {$push : { unavailable : unavailable }})
    }
}
// 일정 비활성화 취소
exports.deleteUnavailable = async function(params, body) {
    const tattooist = await Tattooist.findOne({ _id : params.id })
    if (!tattooist) { throw 2 }

    for await (let unavailable of body['unavailable']) {
        await Tattooist.updateOne({ _id : params.id }, {$pull : { unavailable : unavailable }})
    }
}

// 예약 생성 (= 상담 요청)
exports.createReservation = async function(body) {
    let new_reservation = new Reservation(body)

    await new_reservation.save()
    await Tattooist.updateOne({ _id : body.tattooist_id }, {$push : { reservations : new_reservation['_id'] }})

    // 채팅 서버로 새로운 채팅 생성요청
    const chat_params = {
        user_id : body.customer_id,
        tattooist_id : body.tattooist_id,
        reservation_id : new_reservation['_id']
    }
    await chatServer.createChat(chat_params)
}
// 예약 정보 수정 : date, time_slot, cost 수정 Only
exports.editReservation= async function(params, body) {
    Reservation.updateOne({ _id : params.id }, {$set : { date : body.date, time_slot : body.time_slot, cost : body.cost, body_part : body.body_part }}, (err, reservation) => {
        if (!reservation) { throw 4 }
        if (err) { throw 23 }
    })
}
// 예약 도안 수정 : image 수정 Only
exports.editReservationImage = async function(params, body) {
    // ImageStorage 사용 파라미터 준비
    const imageStorage_params = { title : params.id, image : body.image, mime : body.mime }
    // 이미지 업로드 후, url 반환
    const image_url = await imageStorage.upload(imageStorage_params)
    await Reservation.updateOne({ _id : params.id }, {$set : { image : image_url }})

    // 기존 도안 삭제
    await imageStorage.delete(params.id)
}
// 예약 확정
exports.confirmReservation= async function(params, body) {
    Reservation.updateOne({ _id : params.id }, {$set : { confirmed : true }}, (err, reservation) => {
        if (!reservation) { throw 4 }
        if (err) { throw 23 }
    })

    // ***body.tattooist_id 이용 -> 해당 타투이스트에게 알림 전송 구현 필요***
    // ***body.user_id 이용 -> 해당 유저에게 알림 전송 구현 필요***
}
// 예약 거절
exports.rejectReservation= async function(params, body) {
    Reservation.deleteOne({ _id : params.id }, (err, reservation) => {
        if (!reservation) { throw 4 }
        if (err) { throw 23 }
    })
    Tattooist.updateOne({ _id : body.tattooist_id }, {$pull : { requests : params.id }}, (err, tattooist) => {
        if (!tattooist) { throw 2 }
        if (err) { throw 23 }
    })

    // ***body.tattooist_id 이용 -> 해당 타투이스트에게 알림 전송 구현 필요***
    // ***body.user_id 이용 -> 해당 유저에게 알림 전송 구현 필요***
}

// 타투 작업 시작
exports.beginProcedure = async function(params, body) {
    let new_tattoo = new Tattoo()
    new_tattoo['owner'] = body.user_id

    const user = await User.findOne({ _id : body.user_id })
    if (!user) { throw 1 }
    const tattooist = await Tattooist.findOne({ _id : body.tattooist_id })
    if (!tattooist) { throw 2 }
    const reservation = await Reservation.findOne({ _id : params.id })
    if (!reservation) { throw 4 }

    let blockchain_params = {
        owner_info : {
            id : user['_id'],
            nickname : user['nickname']
        }
    }
    await blockchain.invoke("newTattoo", new_tattoo['_id'], blockchain_params)

    blockchain_params['tattooist_info'] = { id : tattooist['_id'], nickname : tattooist['nickname']}
    blockchain_params['cost'] = reservation['cost']
    blockchain_params['image'] = reservation['image']
    blockchain_params['body_part'] = reservation['body_part']
    blockchain_params['inks'] = body['inks']
    blockchain_params['niddle'] = body['niddle']
    blockchain_params['depth'] = body['depth']
    blockchain_params['machine'] = body['machine']

    await blockchain.invoke("startTattoo", new_tattoo['_id'], blockchain_params)

    await new_tattoo.save()
    await Reservation.updateOne({ _id : params.id }, {$set : { procedure_status : true,  tattoo_id : new_tattoo['_id'] }})
    await User.updateOne({ _id : body.user_id }, {$push : { tattoos : new_tattoo['_id'] }})
}
// 타투 작업 완료
exports.finishProcedure = async function(params, body) {
    const tattooist = await Tattooist.findOne({ _id : body.tattooist_id })
    if (!tattooist) { throw 2 }
    const reservation = await Reservation.findOne({ _id : params.id })
    if (!reservation) { throw 4 }

    const blockchain_params = {
        tattooist_info : {
            id : tattooist['_id'],
            nickname : tattooist['nickname'],
        },
        cost : reservation['cost'],
        image : reservation['image'],
        body_part : reservation['body_part'],
        inks : body['inks'],
        niddle : body['niddle'],
        depth : body['depth'],
        machine : body['machine']
    }

    await blockchain.invoke("endTattoo", reservation['tattoo_id'], blockchain_params)
    await Tattooist.updateOne({ _id : body.tattooist_id }, {$push : { artworks : reservation['tattoo_id'] }})
    await Reservation.deleteOne({ _id : params.id })
}