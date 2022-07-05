const {User} = require("./model/User")
const {Tattooist} = require("./model/Tattooist")
const {Draft} = require('./model/Draft')
const {Tattoo} = require('./model/Tattoo')
const {Reservaton} = require('./model/Reservation')

const blockchain = require('./blockchain')
const imageStorage = require('./imageStorage')

const mongoose = require("mongoose");
const config = require('./config/key')

const draftShowLimit = 12
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
            image : user.image,
            description : user.description
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
            image : tattooist.image,
            description : tattooist.description
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
// 회원탈퇴 : 유저
exports.userUnRegister = async function(body, res) {
    const user = await User.findOne({ email : body.email })

    user.comparePassword(body.pwd, (err, isMatch) => {
        if (!isMatch) {
            res.send({ success : false, error : 1 })
            return
        }
    })

    // 관련 정보 삭제
    const target_scraps = user.scraps
    const target_follows = user.follows

    await User.deleteOne({ email : body.email })
    for await (let draft_id of target_scraps) {
        await Draft.updateOne({ _id : draft_id }, {$inc : { like : -1 }})
    }
    for await (let tattooist_id of target_follows) {
        await Tattooist.updateOne({ _id : tattooist_id }, {$inc : { follower : -1 }})
    }

    res.send({ success : true })
}
// 회원탈퇴 : 타투이스트
exports.tattooistUnRegister = async function(body, res) {
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
    })

    // 관련 정보 삭제
    // const target_drafts = tattooist.drafts
    // await Draft.deleteOne({ _id : {$all : target_drafts }})
    // await User.updateMany({ scraps : {$all : target_drafts }}, {$pull :})

    res.send({ success : true })
}


// 메인 페이지 - 도안
exports.MainDraft = async function(params, query, res) {
    if (params.filter === 'init') {
        const count = await Draft.count()
        res.send({ success : true, count : count })
        return
    }

    const item_index_start = draftShowLimit * (parseInt(params.page)-1)

    let drafts = []
    if (params.filter === 'best') {
        drafts = await Draft.find().sort({ like : -1 }).skip(item_index_start).limit(draftShowLimit)
    } else if (params.filter === 'all') {
        drafts = await Draft.find().sort({ timestamp : -1 }).skip(item_index_start).limit(draftShowLimit);
    } else if (params.filter === 'search') {
        console.log('draft search')
        console.log(query)
        drafts = await Draft.find({ title : {$regex : query.title }})
        console.log(drafts)
    } else {
        res.send({ err : 'wrong filter'})
    }

    let return_value = []
    for (let draft of drafts) {
        const item = {
            draft_id : draft._id,
            image : draft.image,
            title : draft.title,
            like : draft.like,
            isScraped : false
        }
        return_value.push(item)
    }

    // 스크랩 여부 검사
    if (query.user_id !== undefined) {
        const user = await User.findOne({ _id : query.user_id })

        for (let draft of return_value) {
            if (user['scraps'].includes(String(draft.draft_id))) {
                draft['isScraped'] = true
            }
        }
    }

    res.send({ success : true, draft_list : return_value })
}
// 메인 페이지 - 타투이스트
exports.MainTattooist = async function(params, query, res) {
    console.log('1 : ', params)
    console.log('2 : ', query)

    if (params.filter === 'init') {
        const count = await Tattooist.count()
        res.send({ success : true, count : count })
        return
    }

    const item_index_start = tattooistShowLimit * (parseInt(params.page)-1)

    let tattooists = []
    if (params.filter === 'best') {
        tattooists = await Tattooist.find().sort({ follower : -1 }).skip(item_index_start).limit(tattooistShowLimit)
    } else if (params.filter === 'all') {
        tattooists = await Tattooist.find().skip(item_index_start).limit(tattooistShowLimit)
    } else if (params.filter === 'search') {
        tattooists = await Tattooist.find({ title : {$regex : query.nickname }})
    } else {
        res.send({ err : 'wrong filter'})
    }

    let return_value = []

    for (let tattooist of tattooists) {
        const item = {
            tattooist_id : tattooist._id,
            image : tattooist.image,
            nickname : tattooist.nickname,
            office : tattooist.office,
            contact : tattooist.contact,
            description : tattooist.description,
            specialize : tattooist.specialize,
            followers : tattooist.follower,
            isFollowed : false
        }
        return_value.push(item)
    }

    if (query.user_id !== undefined) {
        const user = await User.findOne({ _id : query.user_id })

        for (let draft of return_value) {
            if (user['follows'].includes(String(draft.draft_id))) {
                draft['isFollowed'] = true
            }
        }
    }


    res.send({ success : true, tattooist_list : return_value })
}
// 메인 페이지 - 스크랩
exports.MainScrap = async function(params, query, res) {
    if (query.user_id === undefined) {
        console.log('no user_id')
        res.send({ success : false, err : 'no user_id' })
        return
    }

    const user = await User.findOne({ _id : query.user_id })

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
        drafts = drafts.slice(item_index_start, (item_index_start + draftShowLimit))

        console.log('drafts : ', drafts)
        console.log('drafts length : ', drafts.length)
        if (drafts.length === 0) {
            console.log('no drafts')
            res.send({ success : false, err : 'no drafts' })
            return
        }

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
        tattooists = tattooists.slice(item_index_start, (item_index_start + tattooistShowLimit))

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
                description : tattooist.description,
                isFollowed : true
            }
            return_value.push(item)
        }

        res.send({ success : true, tattooist_list : return_value })
    } else {
        res.send({ err : 'wrong filter'})
    }

}
// 메인 페이지 - 마이타투
exports.MainMyTattoo = async function(query, res) {
    if (query.user_id === undefined) {
        console.log('no user_id')
        res.send({ success : false, err : 'no user_id' })
        return
    }
    const user = await User.findOne({ _id : query.user_id })

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
// 메인 페이지 - 작업물관리
exports.MainArtworks = async function(params, query, res) {
    const tattooist = await Tattooist.findOne({ _id : query.tattooist_id })

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
// 메인 페이지 - 도안관리
exports.MainMyDraft = async function(params, query, res) {
    const tattooist = await Tattooist.findOne({ _id : query.tattooist_id })

    if (params.filter === 'init') {
        res.send({ success : true, count : tattooist.drafts.length })
        return
    }

    let drafts = []
    for await (let draft_id of tattooist.drafts) {
        await Draft.findOne({ _id : draft_id }).then((draft) => { drafts.push(draft)})
    }

    if (drafts.length === 0) {
        console.log('no drafts')
        res.send({ success : false, err : 'no drafts' })
        return
    }

    const item_index_start = draftShowLimit * (parseInt(params.page)-1)
    drafts = drafts.slice(item_index_start, (item_index_start + draftShowLimit))

    let return_value = []
    for (let draft of drafts) {
        let item = {
            draft_id : draft._id,
            image : draft.image,
            title : draft.title,
            like : draft.like,
            timestamp : draft.timestamp,
            isScraped : true
        }

        return_value.push(item)
    }

    res.send({ success : true, draft_list : return_value })
}
// 메인 페이지 - 도안추가
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
// 메인 페이지 - 도안삭제
exports.deleteDraft = async function(query, res) {
    await Draft.deleteOne({ _id : query.draft_id })
    await Tattooist.updateOne({ _id : query.tattooist_id }, {$pull : { drafts : query.draft_id }})
    await User.updateMany({ scraps : {$eleMatch : query.draft_id }}, {$pull : { scraps : query.draft_id }})

    res.send({ success : true })
}


// 유저 예약확인 페이지
exports.userReservation = async function(query, res) {
    const reservations = await Reservaton.find({ customer_id : query.user_id })

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
    await User.updateOne({ _id : body.user_id }, {$set : { nickname : body.nickname, description : body.description }})

    res.send({ success : true })
}
// 유저 마이 페이지 : 이미지 수정 요청
exports.userImageEdit = async function(body, res) {
    console.log(body)
    const imageStorage_params = { title : body.user_id, image : body.image, mime : body.mime }
    const image_url = await imageStorage.upload(imageStorage_params)

    await User.updateOne({ _id : body.user_id }, {$set : { image : image_url }})

    res.send({ success : true })
}


// 타투이스트 마이 페이지
exports.tattooistMyPage = async function(query, res) {
    const tattooist = await Tattooist.findOne({ _id : query.user_id })

    const return_value = {
        tattooist_id : tattooist._id,
        nickname : tattooist.nickname,
        description : tattooist.description,
        image : tattooist.image,
        specialize : tattooist.specialize,
        office : tattooist.office,
        contact : tattooist.contact
    }

    res.send({ success : true, tattooist_info : return_value })
}
// 타투이스트 마이 페이지 : 정보 수정 요청
exports.tattooistInfoEdit = async function(body, res) {
    await Tattooist.updateOne({ _id : body.tattooist_id }, {$set : { nickname : body.nickname, description : body.description, specialize : body.specialize, office : body.office, contact : body.contact }})

    res.send({ success : true })
}
// 타투이스트 마이 페이지 : 이미지 수정 요청
exports.tattooistImageEdit = async function(body, res) {
    const imageStorage_params = { title : body.tattooist_id, image : body.image, mime : body.mime }
    const image_url = await imageStorage.upload(imageStorage_params)

    await Tattooist.updateOne({ _id : body.tattooist_id }, {$set : { image : image_url }})

    res.send({ success : true })
}


// 도안 스크랩 요청
exports.ScrapDraft = async function(body, res) {
    await User.updateOne({ _id : body.user_id }, {$push : { scraps : body.draft_id }})
    await Draft.updateOne({ _id : body.draft_id }, {$inc : { like : 1 }})

    res.send({ success : true })
}
// 도안 스크랩 취소요청
exports.unScrapDraft = async function(query, res) {
    await User.updateOne({ _id : query.user_id }, {$pull : { scraps : query.draft_id }})
    await Draft.updateOne({ _id : query.draft_id }, {$inc : { like : -1 }})

    res.send({ success : true })
}
// 타투이스트 팔로우요청
exports.followTattooist = async function(body, res) {
    await User.updateOne({ _id : body.user_id }, {$push : { follows : body.tattooist_id }})
    await Tattooist.updateOne({ _id : body.tattooist_id }, {$inc : { follower : 1 }})

    res.send({ success : true })
}
// 타투이스트 팔로우 취소요청
exports.unFollowTattooist = async function(query, res) {
    await User.updateOne({ _id : query.user_id }, {$pull : { follows : query.tattooist_id }})
    await Tattooist.updateOne({ _id : query.tattooist_id }, {$inc : { follower : -1 }})

    res.send({ success : true })
}


// 도안 세부 페이지
exports.draftDetail = async function(query, res) {
    const draft = await Draft.findOne({ _id : query.draft_id })
    const tattooist = await Tattooist.findOne({ _id : draft.drawer })

    let return_value = {
        image : draft.image,
        tattooist_id : draft.drawer,
        tattooist_nickname : tattooist.nickname,
        description : draft.description,
        isFollowed : false,
        isScraped : false
    }

    const user = await User.findOne({ _id : query.user_id })
    if (user) {
        if (user['follows'].includes(draft.drawer)) {
            return_value['isFollowed'] = true
        }
        if (user['scraps'].includes(query.draft_id)) {
            return_value['isScraped'] = true
        }
    }

    res.send({ success : true, draft_info : return_value })
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