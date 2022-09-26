// 코드 목적 : Main Server 테스트 및 데이터 수동 조작을 수행한다.

const {User} = require("../DBModel/User")
const {Tattooist} = require("../DBModel/Tattooist")
const {Draft} = require('../DBModel/Draft')
const {Tattoo} = require('../DBModel/Tattoo')
const {Reservation} = require('../DBModel/Reservation')

const imageStorage = require("../module/imageStorage");
const blockchain = require("../module/blockchain");

// 유저 DB 초기화
exports.resetUser = async function() {
    await User.deleteMany({})
}

// 도안 DB 초기화
exports.resetDraft = async function() {
    await Draft.deleteMany({})
}

// 타투이스트 DB 초기화
exports.resetTattooist = async function() {
    await Tattooist.deleteMany({})
}

// 타투 DB 초기화 - 블록체인은 초기화 되지 않음
exports.resetTattoo = async function() {
    await Tattoo.deleteMany({})
}

// 예약 DB 초기화
exports.resetReservation = async function() {
    await Reservation.deleteMany({})
}

// DB를 초기 상태로 되돌린다.
exports.resetAll = async function() {
    await User.deleteMany({})
    await Draft.deleteMany({})
    await Tattooist.deleteMany({})
    await Tattoo.deleteMany({})
    await Reservation.deleteMany({})
}

// 모든 도안 정보 반환
exports.getDraft = async function() {
    return Draft.find()
}

// 모든 타투이스트 정보 반환
exports.getTattooist = async function() {
    return Tattooist.find()
}

// 모든 유저 정보 반환
exports.getUser = async function() {
    return User.find()
}

// 모든 예약 정보 반환
exports.getReservation = async function() {
    return Reservation.find()
}

// 블록체인에 데이터 기록
exports.invokeBlockchain = async function(params, body) {
    if(body.image !== "") {
        const imageStorage_params = { title : params.key, image : body.image, mime : body.mime }
        const image_url = await imageStorage.upload(imageStorage_params)

        body.image = image_url
    }

    await blockchain.invoke(params['function'], params.key, body)
}

// 블록체인에서 최근 Transaction 반환
exports.queryBlockchain = async function(params) {
    return await blockchain.getTattooInfo(params.key)
}

// 블록체인에서 모든 Transaction 반환
exports.historyBlockchain = async function(params) {
    return await blockchain.getTattooHistory(params.key)
}

// 블록체인에서 Side-effect 정보만 반환
exports.querySideEffectsBlockchain = async function(params) {
    return await blockchain.getTattooSideEffects(params.key)
}

