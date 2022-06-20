const {User} = require("./model/User")
const {Tattooist} = require("./model/Tattooist")
const {Draft} = require('./model/Draft')
const {Tattoo} = require('./model/Tattoo')
const blockchain = require('./blockchainFiles/blockchain')

const mongoose = require("mongoose");
const config = require('./config/key')
const imageStorage = require('./imageStorage')

const showLimit = 16

mongoose.connect(config.mongoURI)
    .then(() => { console.log('db connected')} )
    .catch(() => { console.log('db connect failed')} )

exports.entry = function(res) {
    res.send({ success : true, message : 'entry hello world' })
}
exports.register = async function(body, res) {
    const user = await User.findOne({ email : body.email })
    if (user) {
        console.log('register fail, email existed')
        res.send({ success : false, message : 'already existed email'})
        return
    }

    const new_user = new User(body);
    new_user.save()
        .then(() => {
            console.log(body.name, '회원가입 완료')
            res.send({ success : true })
        })
}
exports.login = async function(body, res) {
    const user = await User.findOne({ email : body.email })
    if(!user) {
        console.log('login fail, no user')
        res.send({ success : false })
        return
    }

    user.comparePassword(body.pwd, (err, isMatch) => {
        if (!isMatch) {
            console.log('login fail, wrong password')
            res.send({ success : false })
            return
        }

        // user_info for browser cookie
        const user_info = {
            user_id : String(user._id),
            name : user.name,
            location : user.location,
            isTattooist : user.isTattooist
        }
        console.log(user.name, "로그인 성공")
        res.send({ success : true, user_info : user_info })
    })
}

exports.tattooistEnroll = async function(body, res) {
    const user = await User.findOne({ _id : body.user_id })
    // 유저 입력값 오류
    if(!user) {
        console.log('tattooistEnroll fail, no user')
        res.send({ success : false, message : 'no user' })
        return
    }
    // 이미 등록된 타투이스트
    if(user['isTattooist'] !== "") {
        console.log('tattooistEnroll fail, already enrolled')
        res.send({ success : false, message : 'already enrolled' })
        return
    }

    const new_tattooist = new Tattooist(body);
    await new_tattooist.save();

    await User.updateOne({ _id : body.user_id }, { $set : { isTattooist : String(new_tattooist._id) }} )
    console.log(user.name, " (", body.nickname, ") 타투이스트 등록 완료")
    res.send({ success : true, tattooist_id : String(new_tattooist._id) })
}
exports.newDraft = async function(body, res) {
    const tattooist = await Tattooist.findOne({ _id : body.drawer })
    // 타투이스트 등록하지 않음
    if(tattooist === "") {
        console.log('newDraft fail, no tattooist')
        res.send({ success : false, message : 'no tattooist'})
        return
    }

    const params = { title : body.title, image : body.image.data, mime : body.image.mime }

    body.image.url = await imageStorage.upload(params)
    body.timestamp = Math.round(Date.now()/1000)
    const new_draft = new Draft(body);

    await new_draft.save();
    await Tattooist.updateOne({ _id : body.drawer }, {$push : { drafts : String(new_draft._id) }})

    console.log(tattooist.nickname, "도안 등록 완료")
    res.send({ success : true })
}
exports.browseDraft = function(params, res) {
    const page_number = parseInt(params.page_number)
    const item_index_start = showLimit * (page_number-1)

    if (params.filter === 'init') {
        Draft.count().then((count) => {
            res.send({ success : true, count : count})
        })
    } else if (params.filter === 'best') {
        browseDraft_best(item_index_start, res)
            .catch(() => { res.send({ success : false , message : 'unexpected error'})})
    } else if (params.filter === 'recent') {
        browseDraft_recent(item_index_start, res)
            .catch(() => { res.send({ success : false , message : 'unexpected error'})})
    } else if (params.filter === 'all') {
        browseDraft_all(item_index_start, res)
            .catch(() => { res.send({ success : false , message : 'unexpected error'})})
    } else {
        res.send({ success : false, message : "wrong filter" })
    }
}
const browseDraft_best = async function(item_index_start, res) {
    await Draft.find().sort({ like : -1 }).skip(item_index_start).limit(showLimit)
        .then((drafts) => { res.send({ success : true, drafts : drafts })})
}
const browseDraft_recent = async function(item_index_start, res) {
    await Draft.find().sort({ timestamp : -1 }).skip(item_index_start).limit(showLimit)
        .then((drafts) => { res.send({ success : true, drafts : drafts })})
}
const browseDraft_all = async function(item_index_start, res) {
    await Draft.find().skip(item_index_start).limit(showLimit)
        .then((drafts) => { res.send({ success : true, drafts : drafts })})
}
exports.likeDraft = async function(body, res) {
    await User.updateOne({ _id : body.user_id}, {$push : { scraps : body.draft_id }})
    await Draft.updateOne({ _id : body.draft_id}, {$inc : { like : 1 }})

    res.send({ success : true })
}
exports.followTattooist = async function(body, res) {
    await User.updateOne({ _id : body.user_id }, {$push : { follow : body.tattooist_id }})

    res.send({ success : true })
}
exports.tattooistPage = async function(body, res) {
    const tattooist = await Tattooist.findOne({ _id : body.tattooist_id })
    if(!tattooist) {
        console.log('tattooist page fail, no tattooist')
        res.send({ success : false, message : 'no tattooist'})
        return
    }

    let promise_list = []
    let draft_info_list = []
    tattooist.drafts.forEach((draft_id) => {
        promise_list.push(
            Draft.findOne({ _id : draft_id })
                .then((draft) => {
                    const draft_info = {
                        _id : draft._id,
                        title : draft.title,
                        image : draft.image,
                        timestamp : draft.timestamp
                    }
                    draft_info_list.push(draft_info)
                })
        )
    })
    Promise.all(promise_list).then(() => {
        const tattooist_info = {
            nickname : tattooist.nickname,
            specialize : tattooist.specialize,
            location : tattooist.office.location,
            contact : tattooist.office.contact,
            drafts : draft_info_list,
            profile : tattooist.profile
        }
        console.log(tattooist.nickname, "타투이스트 마이페이지 입장")
        res.send({ success : true, tattooist_info : tattooist_info })
    })
}
exports.tattooistEdit = async function(body, res) {
    const tattooist = await Tattooist.findOne({ _id : body.tattooist_id })
    if(!tattooist) {
        console.log('tattooist profile fail, no tattooist')
        res.send({ success : false, message : 'no tattooist'})
        return
    }

    const params = { title : body.tattooist_id, image : body.edit_data.profile.image, mime : body.edit_data.profile.mime}
    body.edit_data.profile.image = await imageStorage.upload(params)

    await Tattooist.updateOne({ _id : body.tattooist_id }, {$set :
            { nickname : body.edit_data.nickname, specialize : body.edit_data.specialize,
                office : body.edit_data.office, profile : body.edit_data.profile }})

    console.log(tattooist.nickname, "프로필 설정 완료")
    res.send({ success : true })
}
exports.reservation = async function(body, res) {
    const tattooist = await Tattooist.findOne({ _id : body.tattooist_id })
    if(!tattooist) {
        console.log('tattoo reservation fail, no tattooist')
        res.send({ success : false, message : 'no tattooist'})
        return
    }
    const user = await Tattooist.findOne({ _id : body.user_id })
    if(!user) {
        console.log('tattoo reservation fail, no user')
        res.send({ success : false, message : 'no user'})
        return
    }


    res.send({ message : 'prototype'})
}
exports.tattooists = async function(res) {
    await Tattooist.find().sort({ followers : -1 })
        .then((tattooists) => { res.send({ success : true, tattooist_list : tattooists })})
}

exports.imprintStart = async function(body, res) {
    const new_tattoo = new Tattoo()
    new_tattoo.owner_id = body.user_id;

    // new_tattoo.save()
    // await User.updateOne({ _id : body.user_id }, {$push : { tattoos : new_tattoo }})

    await blockchain.invoke('newTattoo', new_tattoo._id, body.user_id)

    const procedure = [ body.tattooist_id, body.using_items, Math.round(Date.now()/1000) ]
    await blockchain.invoke('startImprint', new_tattoo._id, procedure)

    res.send({ success : true, tattoo_id : new_tattoo._id })
}
exports.imprintEnd = async function(body, res) {
    const procedure = [ body.tattooist_id ]
    await blockchain.invoke('endImprint', body.tattoo_id, procedure)

    res.send({ success : true })
}
exports.removeStart = async function(body, res) {
    const procedure = [ body.hospital_id, body.using_items, Math.round(Date.now()/1000) ]
    await blockchain.invoke('startRemove', body.tattoo_id, procedure)

    res.send({ success : true })
}
exports.removeEnd = async function(body, res) {
    const procedure = [ body.hospital_id ]
    await blockchain.invoke('endRemove', body.tattoo_id, procedure)

    res.send({ success : true })
}
exports.addSideEffect = async function(body, res) {
    const side_effect = [ body.activator_id, body.symptom ]
    await blockchain.invoke('addSideEffect', body.tattoo_id, side_effect)

    res.send({ success : true })
}
exports.tattooInfo = async function(body, res) {
    const tattoo_info = await blockchain.query(body.tattoo_id)
    res.send({ success : true, tattoo_info : tattoo_info })
}
exports.tattooHistory = async function(body, res) {
    const tattoo_history = await blockchain.history(body.tattoo_id)
    res.send({ success : true, tattoo_history : tattoo_history })
}