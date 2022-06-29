const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    customer_id : {
        type : String
    },
    tattooist_id : {
        type : String
    },
    draft_id : {
        type : String
    },
    date : {
        type : Date
    },
    cost : {
        type : Number
    }
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = { Reservation }