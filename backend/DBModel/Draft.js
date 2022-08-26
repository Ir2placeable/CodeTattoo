const mongoose = require('mongoose');

const draftSchema = mongoose.Schema({
    drawer : {
        type : String
    },
    title : {
        type : String
    },
    image : {
        type : String
    },
    like : {
        type : Number,
        default : 0
    },
    cost : {
        type : Number
    },
    genre : {
        type : String
    },
    keywords : {
        type : [String]
    },
    timestamp : {
        type : Number
    },
})

const Draft = mongoose.model('Draft', draftSchema)

module.exports = { Draft }
