// 코드 목적 : Main Server 에서 사용되는 글로벌 변수를 등록한다.

const variable = {
    draftShowLimit : 12,
    tattooistShowLimit : 8,
    auctionShowLimit : 12,
    genres : [
        { filter : 'eyebrow', value : '눈썹문신'},
        { filter : 'scalp', value : '두피문신'},
        { filter : 'coverup', value : '커버업'},
        { filter : 'request', value : '도안요청'}
    ],
    blockchain_states : ["작업중지", "예약확정", "작업시작", "작업완료", "리터치", "커버업"]
}

module.exports = variable