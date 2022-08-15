const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
    0 : "Created",
    1 : "Reserved",
    2 : "Tattooing",
    3 : "Tattooed",
    4 : "Retouched",
    5 : "Covered-up",
    6 : "Suspended"
})

const activatorSchema = new mongoose.Schema({
    id : {
        type : String
    },
    nickname : {
        type : String
    }
})

const sideEffectSchema = new mongoose.Schema({
    image : {
        type : String
    },
    symptom : {
        type : String
    },
    date : {
        type : Number
    }
})

const tattooInfoSchema  = new mongoose.Schema({
    state : {
        type : String
    },
    activator : {
        type : Activator
    },
    timestamp : {
        type : Number
    },
    cost : {
        type : Number
    },
    image : {
        type : [String]
    },
    body_part : {
        type : String
    },
    inks : {
        type : [String]
    },
    niddle : {
        type : [String]
    },
    depth : {
        type : Number
    },
    machine : {
        type : String
    },
    side_effects : {
        type : [SideEffect]
    }
})

const TattooState = mongoose.model('TattooState', stateSchema)
const Activator = mongoose.model('TattooState', activatorSchema)
const SideEffect = mongoose.model('TattooState', sideEffectSchema)
const TattooInfo = mongoose.model('TattooState', tattooInfoSchema)

module.exports = { TattooState, Activator, SideEffect, TattooInfo }