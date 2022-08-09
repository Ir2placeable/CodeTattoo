const {User} = require("../model/User")
const {Tattooist} = require("../model/Tattooist")
const {Draft} = require('../model/Draft')
const {Tattoo} = require('../model/Tattoo')

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