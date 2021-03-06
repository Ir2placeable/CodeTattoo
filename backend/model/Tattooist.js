const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const tattooistSchema = mongoose.Schema({
    email: {
        type: String
    },
    pwd: {
        type: String
    },
    nickname: {
        type: String
    },
    specialize : {
        type : String
    },
    contact : {
        type : String
    },
    location : {
        type : String
    },
    office_detail : {
        type : String
    },
    image : {
        type : String
    },
    description : {
        type : String
    },
    artworks : {
        type : [String]
    },
    drafts : {
        type : [String]
    },
    follower : {
        type : Number
    },
    schedules : {
        type : [String]
    }
})

tattooistSchema.pre('save', function (next) {
    var tattooist = this;

    if (tattooist.isModified('pwd')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(tattooist.pwd, salt, function (err, hash) {
                if (err) return next(err)
                tattooist.pwd = hash
                next()
            });
        });
    } else {
        next();
    }
})

tattooistSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.pwd, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const Tattooist = mongoose.model('Tattooist', tattooistSchema)

module.exports = { Tattooist }
