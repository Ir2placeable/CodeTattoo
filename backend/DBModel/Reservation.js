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
    procedure_status : {
        type : Boolean,
        default : false
    },
    confirmed : {
        type : Boolean,
        default : false
    }
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = { Reservation }