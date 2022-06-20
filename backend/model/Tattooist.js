const mongoose = require('mongoose');

const tattooistSchema = mongoose.Schema({
    nickname : {
        type : String
    },
    specialize : {
        type : String
    },
    office : {
        name : {
            type : String
        },
        location : {
            type : String
        },
        contact : {
            type : String
        }
    },
    // 실제 수행한 작업물
    artworks : {
        type : [String]
    },
    // 등록한 도안
    drafts : {
        type : [String]
    },
    medallion : {
        type : String
    },
    profile : {
        description : {
            type : String
        },
        image : {
            type : String
        }
    },
    followers : {
        type : Number
    }
})



const Tattooist = mongoose.model('Tattooist', tattooistSchema)

module.exports = { Tattooist }