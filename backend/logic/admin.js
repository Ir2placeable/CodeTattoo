const {User} = require("../DBModel/User")
const {Tattooist} = require("../DBModel/Tattooist")
const {Draft} = require('../DBModel/Draft')
const {Tattoo} = require('../DBModel/Tattoo')
const imageStorage = require("../module/imageStorage");
const blockchain = require("../module/blockchain");

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

exports.invokeBlockchain = async function(params, body) {
    if(body.image) {
        const imageStorage_params = { title : params.key, image : body.image, mime : body.mime }
        const image_url = await imageStorage.upload(imageStorage_params)

        body.image = image_url
    }

    await blockchain.invoke(params.function_name, params.key, body)
}

exports.queryBlockchain = async function(params) {
    return await blockchain.getTattooInfo(params.key)
}

exports.historyBlockchain = async function(params) {
    return await blockchain.getTattooHistory(params.key)
}

exports.querySideEffectsBlockchain = async function(params) {
    return await blockchain.getTattooSideEffects(params.key)
}