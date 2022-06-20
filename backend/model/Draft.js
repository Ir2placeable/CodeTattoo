const mongoose = require('mongoose');

const draftSchema = mongoose.Schema({
    drawer : {
        type : String
    },
    title : {
        type : String
    },
    image : {
        url : {
            type : String
        },
        width : {
            type : Number
        },
        height : {
            type : Number
        }
    },
    like : {
        type : Number
    },
    timestamp :{
        type : Number
    }
})

const Draft = mongoose.model('Draft', draftSchema)

module.exports = { Draft }