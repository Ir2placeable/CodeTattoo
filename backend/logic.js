const {User} = require("./model/User.js")
const {Tattooist} = require("./model/Tattooist")
const mongoose = require("mongoose");
const db_config = require('./config/url')

mongoose.connect(db_config)
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
            user_id : isMatch._id,
            name : isMatch.name,
            location : isMatch.location,
            isTattooist : isMatch.isTattooist
        }
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
    if(user['isTattooist'] === true) {
        console.log('tattooistEnroll fail, already enrolled')
        res.send({ success : false, message : 'already enrolled' })
        return
    }

    User.updateOne({ _id : body.user_id }, { $set : { isTattooist : true }} )

    const new_tattooist = new Tattooist(body);
    new_tattooist.save()
        .then(() => {
            console.log(body.nickname, '타투이스트 등록')
            res.send({ success : true })
        })

}


// 관리자용 함수
exports.users = function(body, res) {
    User.find().then(result => { res.send(result) })
}
exports.tattooists = function(body, res) {
    Tattooist.find().then(result => {res.send(result) })
}