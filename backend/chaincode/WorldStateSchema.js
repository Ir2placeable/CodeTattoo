// 코드 목적 : Chaincode 가 저장한 데이터 구조를 이해하기 위함이다.

const mongoose = require('mongoose')

// TattooState
// 0 : "Suspend",
// 1 : "Created",
// 2 : "StartFirstTattoo",
// 3 : "EndFirstTattoo",
// 4 : "AddProcedure-Retouching",
// 5 : "AddProcedure-CoverUp",

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
    }
})
const tattooInfoSchema  = new mongoose.Schema({
    state : {
        type : Number
    },
    activator : {
        type : activatorSchema
    },
    timestamp : {
        type : Number
    },
    cost : {
        type : Number
    },
    image : {
        type : String
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
        type : [sideEffectSchema]
    }
})

const Activator = mongoose.model('Activator', activatorSchema)
const SideEffect = mongoose.model('SideEffect', sideEffectSchema)
const TattooInfo = mongoose.model('TattooInfo', tattooInfoSchema)

module.exports = { Activator, SideEffect, TattooInfo }