// 코드 목적 : Noti Server에 알림을 요청한다.
const serverList = require("../config/serverAddress")
const request = require('request')

// 알림 서버에 알림을 요청한다.
exports.requestNotification = async function(noti_case, params) {
    const destination = serverList.notiAPI + "noti/" + noti_case

    request.post({
        headers : { 'content-type' : 'application/json' },
        url : destination,
        body : params,
        json : true
    }, function(err, res, success) {
        return success
    })
}