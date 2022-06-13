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
    artworks : {
        type : [String]
    },
    draft : {
        type : [String]
    },
    medallion : {
        type : String
    }
})



const Tattooist = mongoose.model('Tattooist', tattooistSchema)

module.exports = { Tattooist }