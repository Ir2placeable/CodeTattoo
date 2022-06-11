const {User} = require("./model/User.js")
const mongoose = require("mongoose");
const db_config = require('./config/url')

mongoose.connect(db_config)
    .then(() => { console.log('db connected')} )
    .catch(() => { console.log('db connect failed')} )


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

        const user_info = { name : isMatch.name, location : isMatch.location }
        res.send({ success : true, user_info : user_info })
    })
}

exports.entry = function(res) {
    res.send({ success : true, message : 'entry hello world' })
}