const {User} = require("./model/User.js")
const {Tattooist} = require("./model/Tattooist")
const {Draft} = require('./model/Draft')

const mongoose = require("mongoose");
const config = require('./config/key')
const imageStorage = require('./naverStorage')


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
            console.log(body.name, '회원가입')
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
        if(!isMatch) {
            console.log('login fail, wrong password')
            res.send({ success : false })
            return
        }

        const user_info = {
            user_id : String(user._id),
            name : user.name,
            location : user.location,
            isTattooist : user.isTattooist
        }
        console.log(user_info)
        res.send({ success : true, user_info : user_info })
    })
}

exports.tattooistEnroll = async function(body, res) {
    const user = await User.findOne({ _id : body.user_id })
    if(!user) {
        console.log('tattooistEnroll fail, no user')
        res.send({ success : false, message : 'no user' })
        return
    }
    if(user['isTattooist']) {
        console.log('tattooistEnroll fail, already enrolled')
        res.send({ success : false, message : 'already enrolled' })
        return
    }

    const new_tattooist = new Tattooist(body);
    new_tattooist.save()
        .then(() => {
            User.updateOne({ _id : body.user_id }, { $set : { isTattooist : new_tattooist._id }} )
        })
        .then(() => {
            console.log(body.nickname, '타투이스트 등록')
            res.send({ success : true })
        })

}

exports.newDraft = async function(body, res) {
    const tattooist = await Tattooist.findOne({ _id : body.tattooist_id })
    if(!tattooist) {
        console.log('newDraft fail, no tattooist')
        res.send({ success : false, message : 'no tattooist'})
        return
    }

    // body.image.data는 Base64 이므로 이를 이미지 DB에 저장하고 접근 url를 만들어야 한다.
    // return 값은 url이 되어야 한다.
    // body.image.data = url 로 변경한다.

    const new_draft = new Draft(body);
    new_draft.save()
        .then(() => {
            Tattooist.updateOne({ _id : body.tattooist}, {$push : { drafts : new_draft }})
        })
        .then(() => {
            console.log('새로운 도안 등록')
            res.send({ success : true })
        })
}

exports.browseDraft = async function(body, res) {

}

exports.likeDraft = async function(body, res) {

}


// 관리자용 함수
exports.users = function(body, res) {
    User.find().then(result => { res.send(result) })
}
exports.tattooists = function(body, res) {
    Tattooist.find().then(result => {res.send(result) })
}
exports.image_test = async function(body, res) {
    await imageStorage.imageUpload(body).then(() => { res.send('done') })
}