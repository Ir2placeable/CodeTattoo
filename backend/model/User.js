const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String
    },
    pwd: {
        type: String
    },
    nickname: {
        type: String
    },
    image : {
        type : String
    },
    description : {
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

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.pwd, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema)

module.exports = { User }
