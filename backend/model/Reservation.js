const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    year : {
        type : Number
    },
    month : {
        type : Number
    },
    day : {
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
    }
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = { Reservation }