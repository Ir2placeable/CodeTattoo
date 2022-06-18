const mongoose = require('mongoose');

const office = mongoose.Schema({
    name : {
        type : String
    },
    location : {
        type : String
    },
    contact : {
        type : String
    }
})

const tattooistSchema = mongoose.Schema({
    nickname : {
        type : String
    },
    specialize : {
        type : String
    },
    office : {
        type : office
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
    }
})



const Tattooist = mongoose.model('Tattooist', tattooistSchema)

module.exports = { Tattooist }