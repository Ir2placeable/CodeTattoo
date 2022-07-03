const {User} = require("./model/User")
const {Tattooist} = require("./model/Tattooist")
const {Draft} = require('./model/Draft')
const {Tattoo} = require('./model/Tattoo')
const {Reservaton} = require('./model/Reservation')

const blockchain = require('./blockchain')
const imageStorage = require('./imageStorage')

const mongoose = require("mongoose");
const config = require('./config/key')

const draftShowLimit = 16
const tattooistShowLimit = 8

mongoose.connect(config.mongoURI)
    .then(() => { console.log('db connected')} )
    .catch(() => { console.log('db connect failed')} )

// 엔트리
exports.entry = function(res) {
    res.send({ success : true })
}
// 로그인 : 유저
exports.userLogin = async function(body, res) {
    const user = await User.findOne({ email : body.email })
    if(!user) {
        res.send({ success : false, error : 1 })
        return
    }

    user.comparePassword(body.pwd, (err, isMatch) => {
        if (!isMatch) {
            res.send({ success : false, error : 1 })
            return
        }

        const return_value = {
            user_id : String(user._id),
            nickname : user.nickname,
        }
        res.send({ success : true, user_info : return_value })
    })
}
// 로그인 : 타투이스트
exports.tattooistLogin = async function(body, res) {
    const tattooist = await Tattooist.findOne({ email : body.email })
    if(!tattooist) {
        res.send({ success : false, error : 1 })
        return
    }

    tattooist.comparePassword(body.pwd, (err, isMatch) => {
        if (!isMatch) {
            res.send({ success : false, error : 1 })
            return
        }

        const return_value = {
            tattooist_id : String(tattooist._id),
            nickname : tattooist.nickname,
        }
        res.send({ success : true, tattooist_info : return_value })
    })
}
// 회원가입 : 유저
exports.userRegister = async function(body, res) {
    const user = await User.findOne({ email : body.email })
    if (user) {
        res.send({ success : false, error : 1})
        return
    }

    const new_user = new User(body);
    new_user.save()
        .then(() => {
            res.send({ success : true })
        })
}
// 회원가입 : 타투이스트
exports.tattooistRegister = async function(body, res) {
    const tattooist = await Tattooist.findOne({ email : body.email })
    if (tattooist) {
        res.send({ success : false, error : 1 })
        return
    }

    const new_tattooist = new Tattooist(body);
    new_tattooist.save()
        .then(() => {
            res.send({ success : true })
        })
}


// 유저 메인 페이지 - 도안
exports.MainDraft = async function(params, res) {
    if (params.filter === 'init') {
        const count = await Draft.count()
        res.send({ success : true, count : count })
        return
    }

    const user = await User.findOne({ _id : params.user_id })

    const item_index_start = draftShowLimit * (parseInt(params.page)-1)

    let drafts = []
    if (params.filter === 'best') {
        drafts = await Draft.find().sort({ like : -1 }).skip(item_index_start).limit(draftShowLimit)
    } else if (params.filter === 'all') {
        drafts = await Draft.find().sort({ timestamp : -1 }).skip(item_index_start).limit(draftShowLimit);
    } else if (params.filter === 'search') {
        drafts = await Draft.find({ title : {$regex : params.title }})
    } else {
        res.send({ err : 'wrong filter'})
    }

    let return_value = []
    for (let draft of drafts) {
        let isScraped = false
        if (user.scraps.includes(draft._id)) {
            isScraped = true
        }

        const item = {
            draft_id : draft._id,
            image : draft.image,
            title : draft.title,
            like : draft.like,
            isScraped : isScraped
        }
        return_value.push(item)
    }

    res.send({ success : true, draft_list : return_value })
}
// 유저 메인 페이지 - 타투이스트
exports.MainTattooist = async function(params, res) {
    if (params.filter === 'init') {
        const count = await Tattooist.count()
        res.send({ success : true, count : count })
        return
    }

    const user = await User.findOne({ _id : params.user_id })

    const item_index_start = tattooistShowLimit * (parseInt(params.page)-1)

    let tattooists = []
    if (params.filter === 'best') {
        tattooists = await Tattooist.find().sort({ follower : -1 }).skip(item_index_start).limit(tattooistShowLimit)
    } else if (params.filter === 'all') {
        tattooists = await Tattooist.find().skip(item_index_start).limit(tattooistShowLimit)
    } else if (params.filter === 'search') {
        tattooists = await Tattooist.find({ title : {$regex : params.nickname }})
    } else {
        res.send({ err : 'wrong filter'})
    }

    let return_value = []
    for (let tattooist of tattooists) {
        let isFollowed = false
        if (user.follows.includes(tattooist._id)) {
            isFollowed = true
        }

        const item = {
            tattooist_id : tattooist._id,
            image : tattooist.image,
            nickname : tattooist.nickname,
            office : tattooist.office,
            contact : tattooist.contact,
            description : tattooist.description,
            specialize : tattooist.specialize,
            followers : tattooist.follower,
            isFollowed : isFollowed
        }
        return_value.push(item)
    }

    res.send({ success : true, tattooist_list : return_value })
}
// 유저 메인 페이지 - 스크랩
exports.MainScrap = async function(params, res) {
    const user = await User.findOne({ _id : params.user_id })

    if (params.filter === 'init') {
        res.send({ success : true, draft_count : user.scraps.length, tattooist_count : user.follows.length })
        return
    }

    if (params.filter === 'draft') {
        let drafts = []
        for await (let draft_id of user.scraps) {
            await Draft.findOne({ _id : draft_id }).then((draft) => { drafts.push(draft) })
        }

        const item_index_start = draftShowLimit * (parseInt(params.page)-1)
        drafts = drafts[item_index_start, (item_index_start + draftShowLimit)]

        let return_value = []
        for (let draft of drafts) {
            const item = {
                draft_id : draft._id,
                image : draft.image,
                title : draft.title,
                like : draft.like,
                isScraped : true
            }
            return_value.push(item)
        }

        res.send({ success : true, draft_list : return_value })
    } else if (params.filter === ' tattooist') {
        let tattooists = []
        for await (let tattooist_id of user.follows) {
            await Tattooist.findOne({ _id : tattooist_id }).then((tattooist) => { tattooists.push(tattooist) })
        }

        const item_index_start = tattooistShowLimit * (parseInt(params.page)-1)
        tattooists = tattooists[item_index_start, (item_index_start + tattooistShowLimit)]

        let return_value = []
        for (let tattooist of tattooists) {
            const item = {
                tattooist_id : tattooist._id,
                image : tattooist.image,
                nickname : tattooist.nickname,
                office : tattooist.office,
                contact : tattooist.contact,
                specialize : tattooist.specialize,
                followers : tattooist.followers,
                isFollowed : true
            }
            return_value.push(item)
        }

        res.send({ success : true, tattooist_list : return_value })
    } else {
        res.send({ err : 'wrong filter'})
    }

}
// 유저 메인 페이지 - 마이타투
exports.MainMyTattoo = async function(params, res) {
    const user = await User.findOne({ _id : params.user_id })

    // 블록체인에서 타투 이력 조회
    let tattoo_histories = []
    for await (let tattoo_id of user.tattoos) {
        await blockchain.history(tattoo_id).then((histories) => { tattoo_histories.push(histories) })
    }

    // 타투 이력 데이터 가공
    let return_value = []
    for (let history of tattoo_histories) {

    }

    res.send({ success : true, tattoo_list : return_value })
}
// 유저 예약확인 페이지
exports.userReservation = async function(params, res) {
    const reservations = await Reservaton.find({ customer_id : params.user_id })

    if (!reservations) {
        res.send({ success : false, err : 1 })
        return
    }

    let return_value = []
    for await (let reservation of reservations) {
        const draft = await Draft.findOne({ _id : reservation.draft_id })
        const tattooist = await Tattooist.findOne({ _id : reservation.tattooist_id })

        const item = {
            image : draft.image,
            date : reservation.date,
            tattooist_nickname : tattooist.nickname,
            office : tattooist.office,
            contact : tattooist.contact,
            cost : reservation.cost
        }

        return_value.push(item)
    }

    res.send({ success : true, reservation_list : return_value })
}
// 유저 마이 페이지
exports.userMyPage = async function(query, res) {
    const user = await User.findOne({ _id : query.user_id })

    const return_value = {
        user_id : user._id,
        nickname : user.nickname,
        description : user.description,
        image : user.image
    }

    res.send({ success : true, user_info : return_value })
}
// 유저 마이 페이지 : 정보 수정 요청
exports.userInfoEdit = async function(body, res) {
    User.updateOne({ _id : body.user_id }, {$set : { nickname : body.nickname, description : body.description }})

    res.send({ success : true })
}
// 유저 마이 페이지 : 이미지 수정 요청
exports.userImageEdit = async function(body, res) {
    const imageStorage_params = { title : body.user_id, image : body.image, mime : body.mime }
    const image_url = await imageStorage.upload(imageStorage_params)

    User.updateOne({ _id : body.user_id }, {$set : { image : image_url }})

    res.send({ success : true })
}



// 도안 스크랩
exports.ScrapDraft = async function(body, res) {
    User.updateOne({ _id : body.user_id }, {$push : { scraps : body.draft_id }})
    Draft.updateOne({ _id : body.draft_id }, {$inc : { like : 1 }})

    res.send({ success : true })
}
// 도안 스크랩 취소
exports.unScrapDraft = async function(body, res) {
    User.updateOne({ _id : body.user_id }, {$pull : { scrap : body.draft_id }})
    Draft.updateOne({ _id : body.draft_id }, {$inc : { like : -1 }})

    res.send({ success : true })
}
// 타투이스트 팔로우
exports.followTattooist = async function(body, res) {
    User.updateOne({ _id : body.user_id }, {$push : { follows : body.tattooist_id }})
    Tattooist.updateOne({ _id : body.tattooist_id }, {$inc : { follower : 1 }})

    res.send({ success : true })
}
// 타투이스트 팔로우 취소
exports.unFollowTattooist = async function(body, res) {
    User.updateOne({ _id : body.user_id }, {$pull : { follows : body.tattooist_id }})
    Tattooist.updateOne({ _id : body.tattooist_id }, {$inc : { follower : -1 }})

    res.send({ success : true })
}


// 타투이스트 메인 페이지 - 작업물관리
exports.MainArtworks = async function(params, res) {
    const tattooist = await Tattooist.findOne({ _id : params.tattooist_id })

    if (params.filter === 'init') {
        res.send({ success : true, count : tattooist.artworks.length })
        return
    }

    let drafts = []
    for await (let draft_id of tattooist.artworks) {
        await Draft.findOne({ _id : draft_id }).then((draft) => { drafts.push(draft)})
    }

    const item_index_start = draftShowLimit * (parseInt(params.page)-1)
    drafts = drafts[item_index_start, (item_index_start + draftShowLimit)]

    let return_value = []
    for (let draft of drafts) {
        let item = {
            image : "test_image",
            date : draft.timestamp,
            customer_nickname : "test_nickname",
            cost : "test_cost"
        }

        return_value.push(item)
    }

    res.send({ success : true, artwork_list : return_value })
}
// 타투이스트 메인 페이지 - 도안관리
exports.MainMyDraft = async function(params, res) {
    const tattooist = await Tattooist.findOne({ _id : params.tattooist_id })

    if (params.filter === 'init') {
        res.send({ success : true, count : tattooist.drafts.length })
        return
    }

    let drafts = []
    for await (let draft_id of tattooist.drafts) {
        await Draft.findOne({ _id : draft_id }).then((draft) => { drafts.push(draft)})
    }

    const item_index_start = draftShowLimit * (parseInt(params.page)-1)
    drafts = drafts[item_index_start, (item_index_start + draftShowLimit)]

    let return_value = []
    for (let draft of drafts) {
        let item = {
            draft_id : draft._id,
            image : draft.timestamp,
            title : draft.title,
            like : draft.like
        }

        return_value.push(item)
    }

    res.send({ success : true, artwork_list : return_value })
}
// 타투이스트 메인 페이지 - 도안추가
exports.newDraft = async function(body, res) {
    const imageStorage_params = { title : body.title, image : body.image, mime : body.mime }
    const image_url = await imageStorage.upload(imageStorage_params)

    const new_draft = new Draft({
        drawer : body.tattooist_id,
        title : body.title,
        image : image_url,
        description : body.description,
        timestamp : Math.floor(+ new Date() / 1000)
    })

    await new_draft.save()
    await Tattooist.updateOne({ _id : body.tattooist_id }, {$push : { drafts : new_draft._id }})

    res.send({ success : true })
}



// 관리자함수
exports.resetUser = async function() {
    await User.deleteMany({})
}
exports.resetDraft = async function() {
    await Draft.deleteMany({})
}
exports.resetTattooist = async function() {
    await Tattooist.deleteMany({})
}
exports.resetTattoo = async function() {
    await Tattoo.deleteMany({})
}