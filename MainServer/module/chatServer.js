// 코드 목적 : Chat Server 와 통신하여 필요한 데이터를 반환한다.

const {User} = require("../DBModel/User");
const {Tattooist} = require("../DBModel/Tattooist");
const {Reservation} = require("../DBModel/Reservation")
const chatServer = require("../config/serverAddress")
const request = require('request')

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
    const destination = chatServer.chatAPI + "chat/create"

    return requestPost(destination, params)
}

// 채팅방 삭제를 요청한다.
exports.deleteChat = async function(params) {
    const destination = chatServer.chatAPI + "chat/delete"

    return requestPost(destination, params)
}

// POST 요청 보내기
const requestPost = function(destination, body) {
    request.post({
        headers : {'content-type' : 'application/json'},
        url : destination,
        body : body,
        json : true
    }, function(err, res, success) {
        return success
    })
}