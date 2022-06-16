const {User} = require("./model/User.js")
const {Tattooist} = require("./model/Tattooist")
const {Draft} = require('./model/Draft')

const mongoose = require("mongoose");
const config = require('./config/key')
const imageStorage = require('./naverStorage')

const showLimit = 16
let cache_DraftCount = Draft.count()

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
    await new_user.save()

    console.log(body.name, '회원가입 완료')
    res.send({ success : true })
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

    body.image.url = await imageStorage.upload(body)
    body.timestamp = Math.round(Date.now()/1000)
    const new_draft = new Draft(body);

    await new_draft.save();
    await Tattooist.updateOne({ _id : body.drawer }, {$push : { drafts : String(new_draft._id) }})

    console.log(tattooist.nickname, "도안 등록 완료")
    res.send({ success : true })

    // cache update
    cache_DraftCount += 1
}
exports.browseDraft = function(params, res) {
    const page_number = parseInt(params.page_number)
    const item_index_start = showLimit * (page_number-1)

    if (params.filter === 'init') {
        res.send({ success : true, count : cache_DraftCount })
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

// 관리자용 함수
exports.users = function(body, res) {
    User.find().then(result => { res.send(result) })
}
exports.tattooists = function(body, res) {
    Tattooist.find().then(result => {res.send(result) })
}
exports.drafts = function(body, res) {
    Draft.find().then(result => { res.send(result) })
}