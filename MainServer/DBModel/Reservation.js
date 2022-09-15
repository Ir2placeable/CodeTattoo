// 코드 목적 : Mongo DB Structure

const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    date : {
        type : Number
    },
    time_slot : {
        type : Number
    },
    customer_id : {
        type : String
    },
    tattooist_id : {
        type : String
    },
    image : {
        type : String
    },
    cost : {
        type : Number
    },
    body_part : {
        type : String
    },
    procedure_status : {
        type : Boolean,
        default : false
    },
    confirmed : {
        type : Boolean,
        default : false
    },
    tattoo_id : {
        type : String
    }
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = { Reservation }