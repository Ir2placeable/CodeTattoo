const mongoose = require('mongoose');

const tattooSchema = mongoose.Schema({
    owner_id : {
        type : String
    }
})

const Tattoo = mongoose.model('Tattoo', tattooSchema)

module.exports = { Tattoo }