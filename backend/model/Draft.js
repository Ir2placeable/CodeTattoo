const mongoose = require('mongoose');

const image = mongoose.Schema({
    url : {
        type : String
    },
    width : {
        type : Number
    },
    height : {
        type : Number
    }
})
const draftSchema = mongoose.Schema({
    drawer : {
        type : String
    },
    title : {
        type : String
    },
    image : {
        type : image
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