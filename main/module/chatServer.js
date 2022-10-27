// 코드 목적 : Chat Server 와 통신하여 필요한 데이터를 반환한다.

const {User} = require("../DBModel/User");
const {Tattooist} = require("../DBModel/Tattooist");
const {Reservation} = require("../DBModel/Reservation")
const serverList = require("../config/serverAddress")
const chatAPI = serverList.chatAPI
const request = require('sync-request')

exports.chatIsAlive = async function() {
    const destination = serverList.chatIsAlive

    const ret = await request('POST', destination, {
        json : { test : "test" }
    })
    return JSON.parse(ret.getBody('utf8')).success
}

// 채팅 목록에 필요한 상대방의 정보 및 채팅방 정보를 반환한다.
exports.getProfile = async function(params, query) {
    let profile
    let reservation_id
    let confirmed

    const user = await User.findOne({ _id : query.user_id })
    if (!user) { throw 1 }
    const tattooist = await Tattooist.findOne({ _id : query.tattooist_id })
    if (!tattooist) { throw 2 }

    if (params.type === 'user') {
        profile = {
            nickname : tattooist['nickname'],
            image : tattooist['image']
        }
    } else if (params.type === 'tattooist') {
        profile = {
            nickname : user['nickname'],
            image : user['image']
        }
    } else { throw 6 }

    const reservation = await Reservation.findOne({ customer_id : query.user_id, tattooist_id : query.tattooist_id })
    if (!reservation) { throw 4 }

    reservation_id = reservation['_id']
    confirmed = reservation['confirmed']

    return {profile, reservation_id, confirmed}
}

// 채팅방 생성을 요청한다.
exports.createChat = async function(params) {
    const destination = chatAPI + "create"

    const ret = await request('POST', destination, {
        json : params
    })
    return JSON.parse(ret.getBody('utf8')).success
}

// 채팅방 삭제를 요청한다.
exports.deleteChat = async function(params) {
    const destination = chatAPI + "delete"

    const ret = await request('POST', destination, {
        json : params
    })
    return JSON.parse(ret.getBody('utf8')).success
}

// 채팅방에 마이타투 이력 전송을 요청한다.
exports.myTattooSendRequest = async function(params) {
    const destination = chatAPI + "my-tattoo"

    const ret = await request('POST', destination, {
        json : params
    })
    return JSON.parse(ret.getBody('utf8')).success
}
