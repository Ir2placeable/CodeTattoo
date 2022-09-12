// 코드 목적 : Mongo DB Structure

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    email : {
        type: String
    },
    pwd : {
        type: String
    },
    nickname : {
        type: String
    },
    location : {
        type : String
    },
    image : {
        type : String
    },
    scraps : {
        type : [String]
    },
    follows : {
        type : [String]
    },
    tattoos : {
        type : [String]
    }
})

userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('pwd')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.pwd, salt, function (err, hash) {
                if (err) return next(err)
                user.pwd = hash
                next()
            });
        });
    } else {
        next();
    }
})

userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.pwd)
}
userSchema.methods.editPassword = async function(plainPassword) {
    const salt = await bcrypt.genSalt(saltRounds)
    const encryptedPassword = await bcrypt.hash(plainPassword, salt)

    return encryptedPassword
}

const User = mongoose.model('User', userSchema)

module.exports = { User }
