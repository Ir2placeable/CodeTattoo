// 코드 목적 : Mongo DB Structure

const mongoose = require('mongoose');

const tattooSchema = mongoose.Schema({
    owner : {
        type : String
    }
})

const Tattoo = mongoose.model('Tattoo', tattooSchema)

module.exports = { Tattoo }