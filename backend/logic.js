const {User} = require("./model/User")
const {Tattooist} = require("./model/Tattooist")
const {Draft} = require('./model/Draft')
const {Tattoo} = require('./model/Tattoo')
const blockchain = require('./blockchain')

const mongoose = require("mongoose");
const config = require('./config/key')
const imageStorage = require('./imageStorage')

const showLimit = 16

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
exports.mainDraft = async function(params, res) {
    if (params.filter === 'init') {
        const count = await Draft.count()
        res.send({ success : true, count : count })
        return
    }

    const user = await User.findOne({ _id : params.user_id })

    const item_index_start = showLimit * (parseInt(params.page)-1)

    let drafts = []
    if (params.filter === 'best') {
        drafts = await Draft.find().sort({ like : -1 }).skip(item_index_start).limit(showLimit)
    } else if (params.filter === 'recent') {
        drafts = await Draft.find().sort({ timestamp : -1 }).skip(item_index_start).limit(showLimit);
    } else if (params.filter === 'all') {
        drafts = await Draft.find().skip(item_index_start).limit(showLimit)
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
            scraped : isScraped
        }
        return_value.push(item)
    }

    res.send({ success : true, draft_list : return_value })
}
// 도안 스크랩
exports.draftScrap = async function(body, res) {
    User.updateOne({ _id : body.user_id }, {$push : { scraps : body.draft_id }})
    Draft.updateOne({ _id : body.draft_id }, {$inc : { like : 1 }})

    res.send({ success : true })
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

// exports.userMyPage = async function(query, res) {
//     console.log(query)
//     const user = await User.findOne({ _id : query.user_id })
//     if(!user) {
//         res.send({ success : false, error : 'wrong user_id' })
//         return
//     }
//
//     const user_info = {
//         user_id : String(user._id),
//         name : user.name,
//         location : user.location,
//         description : user.description,
//         image : user.image,
//     }
//
//     let promise_list = []
//     let scraps = []
//     user.scraps.forEach((draft_id) => {
//         promise_list.push(Draft.findOne({ _id : draft_id }).then(async (draft) => {
//             const tattooist = await Tattooist.findOne({ _id : draft.drawer })
//
//             const temp = {
//                 _id : draft._id,
//                 tattooist_id : tattooist._id,
//                 tattooist_nickname : tattooist.nickname,
//                 tattooist_image : tattooist.image,
//                 title : draft.title,
//                 image : draft.image,
//                 timestamp : draft.timestamp
//             }
//             scraps.push(temp)
//         }))
//     })
//     Promise.all(promise_list).then(() => {
//         res.send({ success : true, user_info : user_info, drafts : scraps })
//     })
// }
// exports.userInfoEdit = async function(body, res) {
//     await User.updateOne({ _id : body.user_id }, {$set : { name : body.name, location : body.location, description : body.description }})
//
//     res.send({ success : true })
// }
// exports.userImageEdit = async function(body, res) {
//     const params = { title : body.user_id, image : body.image, mime : body.mime }
//     const url = await imageStorage.upload(params)
//
//     await User.updateOne({ _id : body.user_id }, {$set : { image : url }})
//
//     res.send({ success : true })
// }
// exports.userScrap = async function(body, res) {
//     await User.updateOne({ _id : body.user_id }, {$push : { scraps : body.draft_id }})
//     await Draft.updateOne({ _id : body.draft_id}, {$inc : { like : 1 }})
//
//     res.send({ success : true })
// }
// exports.userFollow = async function(body, res) {
//     await User.updateOne({ _id : body.user_id }, {$push : { follow : body.tattooist_id }})
//
//     res.send({ success : true })
// }
// exports.userMyTattoo = async function(body, res) {
//     const tattoo_list = await Tattoo.find({ _id : body.user_id })
//
//     let tattoo_info_list = []
//     for (let tattoo of tattoo_list) {
//         let tattoo_info = {}
//         tattoo_info['tattoo_id'] = tattoo._id
//         tattoo_info['tattoo_info'] = await blockchain.query(tattoo._id)
//         tattoo_info_list.push(tattoo_info)
//     }
//
//     res.send({ success : true, tattoo_info_list : tattoo_info_list })
// }
// exports.tattooHistory = async function(query, res) {
//     const tattoo_history = await blockchain.history(query.tattoo_id)
//     res.send({ success : true, tattoo_history : tattoo_history })
// }
// exports.addSideEffect = async function(query, res) {
//     const side_effect = [ query.user_id, query.symptom ]
//     await blockchain.invoke('addSideEffect', query.tattoo_id, side_effect)
//
//     res.send({ success : true })
// }
//
//
// exports.tattooistEnroll = async function(body, res) {
//     const user = await User.findOne({ _id : body.user_id })
//     // 유저 입력값 오류
//     if(!user) {
//         res.send({ success : false, error : 'wrong user_id' })
//         return
//     }
//     // 이미 등록된 타투이스트
//     if(user['isTattooist'] !== "") {
//         res.send({ success : false, error : 'already enrolled' })
//         return
//     }
//
//     const new_tattooist = new Tattooist(body);
//     await new_tattooist.save();
//
//     await User.updateOne({ _id : body.user_id }, { $set : { isTattooist : String(new_tattooist._id) }} )
//     res.send({ success : true, tattooist_id : String(new_tattooist._id) })
// }
// exports.tattooistList = async function(res) {
//     const tattooist_list = await Tattooist.find().sort({ followers : -1 })
//
//     res.send({ success : true, tattooist_list : tattooist_list })
// }
// exports.tattooistMyPage = async function(query, res) {
//     const tattooist = await Tattooist.findOne({ _id : query.tattooist_id })
//     if(!tattooist) {
//         res.send({ success : false, error : 'wrong tattooist id'})
//         return
//     }
//
//     let promise_list = []
//     let draft_info_list = []
//     tattooist.drafts.forEach((draft_id) => {
//         promise_list.push(
//             Draft.findOne({ _id : draft_id })
//                 .then(async (draft) => {
//                     const tattooist = await Tattooist.findOne({ _id : draft.drawer })
//
//                     const draft_info = {
//                         _id : draft._id,
//                         tattooist_id : tattooist._id,
//                         tattooist_nickname : tattooist.nickname,
//                         tattooist_image : tattooist.image,
//                         title : draft.title,
//                         image : draft.image,
//                         timestamp : draft.timestamp
//                     }
//                     draft_info_list.push(draft_info)
//                 })
//         )
//     })
//     Promise.all(promise_list).then(() => {
//         const tattooist_info = {
//             nickname : tattooist.nickname,
//             specialize : tattooist.specialize,
//             location : tattooist.office.location,
//             contact : tattooist.office.contact,
//             drafts : draft_info_list,
//             description : tattooist.description,
//             image : tattooist.image
//         }
//         res.send({ success : true, tattooist_info : tattooist_info })
//     })
// }
// exports.tattooistInfoEdit = async function(body, res) {
//     console.log(body)
//     await Tattooist.updateOne({ _id : body.tattooist_id }, {$set : { nickname : body.nickname, specialize : body.specialize, office : { location : body.location, contact : body.contact }, description : body.description }})
//
//     res.send({ success : true })
// }
// exports.tattooistImageEdit = async function(body, res) {
//     const params = { title : body.tattooist_id, image : body.image, mime : body.mime }
//     const url = await imageStorage.upload(params)
//
//     await Tattooist.updateOne({ _id : body.tattooist_id }, {$set : { image : url }})
//
//     res.send({ success : true })
// }
//
//
// exports.newDraft = async function(body, res) {
//     const tattooist = await Tattooist.findOne({ _id : body.drawer })
//     if(tattooist === "") {
//         res.send({ success : false, error : 'not enrolled tattooist'})
//         return
//     }
//
//     const params = { title : body.title, image : body.image, mime : body.mime }
//     body.image = await imageStorage.upload(params)
//
//     const new_draft = new Draft(body);
//     new_draft.timestamp = Math.round(Date.now()/1000)
//
//     await new_draft.save();
//     await Tattooist.updateOne({ _id : body.drawer }, {$push : { drafts : String(new_draft._id) }})
//
//     res.send({ success : true })
// }
// exports.browseDraft = async function(params, res) {
//     const page_number = parseInt(params.page)
//     const item_index_start = showLimit * (page_number-1)
//
//     let draft_list;
//     if (params.filter === 'init') {
//         Draft.count().then((count) => {
//             res.send({ success : true, count : count })
//         })
//         return
//     } else if (params.filter === 'best') {
//         draft_list = await browseDraft_best(item_index_start)
//     } else if (params.filter === 'recent') {
//         draft_list = await browseDraft_recent(item_index_start)
//     } else if (params.filter === 'all') {
//         draft_list = await browseDraft_all(item_index_start)
//     } else {
//         res.send({ success : false, error : "wrong filter" })
//         return
//     }
//
//     let drafts = []
//     for(let draft of draft_list) {
//         const tattooist = await Tattooist.findOne({ _id : draft.drawer })
//         const draft_info = {
//             _id : draft._id,
//             tattooist_id : tattooist._id,
//             tattooist_nickname : tattooist.nickname,
//             tattooist_image : tattooist.image,
//             title : draft.title,
//             image : draft.image,
//             timestamp : draft.timestamp
//         }
//         drafts.push(draft_info)
//     }
//     res.send({ success : true, drafts : drafts })
// }
//
//
// exports.imprintReservation = async function(body, res) {
//     const tattooist = await Tattooist.findOne({ _id : body.tattooist_id })
//     if(!tattooist) {
//         res.send({ success : false, error : 'no tattooist'})
//         return
//     }
//     const user = await Tattooist.findOne({ _id : body.user_id })
//     if(!user) {
//         res.send({ success : false, error : 'no user'})
//         return
//     }
//
//     res.send({ error : 'prototype'})
// }
// exports.imprintStart = async function(body, res) {
//     const new_tattoo = new Tattoo()
//     new_tattoo.owner_id = body.user_id;
//
//     // await new_tattoo.save()
//     // await User.updateOne({ _id : body.user_id }, {$push : { tattoos : new_tattoo }})
//
//     await blockchain.invoke('newTattoo', new_tattoo._id, body.user_id)
//
//     const procedure = [ body.tattooist_id, body.using_items, Math.round(Date.now()/1000) ]
//     await blockchain.invoke('startImprint', new_tattoo._id, procedure)
//
//     res.send({ success : true, tattoo_id : new_tattoo._id })
// }
// exports.imprintEnd = async function(body, res) {
//     const procedure = [ body.tattooist_id, Math.round(Date.now()/1000) ]
//     await blockchain.invoke('endImprint', body.tattoo_id, procedure)
//
//     res.send({ success : true })
// }
// exports.removeReservation = async function(body, res) {
//     res.send({ error : 'prototype'})
// }
// exports.removeStart = async function(body, res) {
//     const procedure = [ body.hospital_id, body.using_items, Math.round(Date.now()/1000) ]
//     await blockchain.invoke('startRemove', body.tattoo_id, procedure)
//
//     res.send({ success : true })
// }
// exports.removeEnd = async function(body, res) {
//     const procedure = [ body.hospital_id, Math.round(Date.now()/1000) ]
//     await blockchain.invoke('endRemove', body.tattoo_id, procedure)
//
//     res.send({ success : true })
// }

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