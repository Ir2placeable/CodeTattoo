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
    image : {
        type : String
    },
    description : {
        type : String
    },
    specialize : {
        type : String
    },
    contact : {
        type : String
    },
    office : {
        type : String
    },
    medallion : {
        type : Boolean
    },
    artworks : {
        type : [String],
        default : []
    },
    drafts : {
        type : [String],
        default : []
    },
    follower : {
        type : Number
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
