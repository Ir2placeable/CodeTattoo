const {User} = require("../DBModel/User")
const {Tattooist} = require("../DBModel/Tattooist")
const {Draft} = require('../DBModel/Draft')
const {Tattoo} = require('../DBModel/Tattoo')

exports.resetUser = async function() {
    await User.deleteMany({})
}
exports.resetDraft = async function() {
    await Draft.deleteMany({})
}
exports.resetTattooist = async function() {
    await Tattooist.deleteMany({})
}
exports.resetTattoo = async function() {
    await Tattoo.deleteMany({})
}

exports.getDraft = async function() {
    return Draft.find()
}

exports.getTattooist = async function() {
    return Tattooist.find()
}

exports.getUser = async function() {
    return User.find()
}