// 코드 목적 : Noti Server에 알림을 요청한다.
const serverList = require("../config/serverAddress")
const request = require('request')

// 알림 서버에 알림을 요청한다.
exports.requestNotification = async function(noti_case, params) {
    const destination = serverList.pushAPI + "push/" + noti_case

    request.post({
        headers : { 'content-type' : 'application/json' },
        url : destination,
        body : params,
        json : true
    }, function(err, res, success) {
        return success
    })
}

// 카톡 아이디 등록 요청
exports.requestRegister = async function(type, params) {
    const destination = serverList.pushAPI + "push/kakao/" + type

    request.post({
        headers : { 'content-type' : 'application/json' },
        url : destination,
        body : params,
        json : true
    }, function(err, res, success) {
        return success
    })
}

// 카톡 아이디 변경 요청
exports.requestModify = async function(type, params) {
    const destination = serverList.pushAPI + "push/kakao/" + type

    request.patch({
        headers : { 'content-type' : 'application/json' },
        url : destination,
        body : params,
        json : true
    }, function(err, res, success) {
        return success
    })
}

// 카톡 아이디 삭제 요청
exports.requestDelete = async function(type, params) {
    const destination = serverList.pushAPI + "push/delete/" + type

    request.post({
        headers : { 'content-type' : 'application/json' },
        url : destination,
        body : params,
        json : true
    }, function(err, res, success) {
        return success
    })
}