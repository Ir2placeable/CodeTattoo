// 코드 목적 : Mongo DB Structure

const mongoose = require('mongoose');

const bidderSchema = mongoose.Schema({
    bidder_id : {
        type : String
    },
    image : {
        type : String
    },
    cost : {
        type : Number
    }
})

const auctionSchema = mongoose.Schema({
    creator : {
        type : String
    },
    image : {
        type : String
    },
    genre : {
        type : String
    },
    cost : {
        type : Number
    },
    bidders : {
        type : [bidderSchema]
    },
    finished : {
        type : Boolean,
        default : false
    },
    winner : {
        type : String
    }
})

const Auction = mongoose.model('Auction', auctionSchema)

module.exports = { Auction }
