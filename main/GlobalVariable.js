// 코드 목적 : Main Server 에서 사용되는 글로벌 변수를 등록한다.

const variable = {
    draftShowLimit : 12,
    tattooistShowLimit : 6,
    auctionShowLimit : 12,
    genres : [
        { filter : 'eyebrow', value : '눈썹문신'},
        { filter : 'scalp', value : '두피문신'},
        { filter : 'coverup', value : '흉터커버'},
        { filter : 'request', value : '도안요청'}
    ]
}

module.exports = variable