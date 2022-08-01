const {User} = require("../model/User")
const {Tattooist} = require("../model/Tattooist")
const {Draft} = require('../model/Draft')
const {Tattoo} = require('../model/Tattoo')

const Global = require('../GlobalVariable')
const ErrorTable = require('../ErrorTable')

let connections = 0

exports.userLogin = async function(body) {
    // 입력한 email 데이터 존재 여부 확인
    const user = await User.findOne({ email : body.email })
    if(!user) {
        // 해당 user 없음 오류
        console.log(ErrorTable["3"])
        throw 3
    }

    // hashed password 일치 여부 확인
    return await user.comparePassword(body.pwd).then((isMatch) => {
        if (!isMatch) {
            // hashed password 불일치 오류
            console.log(ErrorTable["2"])
            throw 2
        }

        // hashed password 일치하는 경우 Cookie로 사용될 데이터 반환
        return {
            user_id: String(user['_id']),
            nickname: user['nickname'],
            image: user['image'],
            description: user['description']
        }
    });
}
exports.userRegister = async function(body) {
    // email 중복 파악하기
    const user = await User.findOne({ email : body.email })
    if (user) {
        // email 중복 오류 시 Return Error Code
        console.log(ErrorTable["1"])
        throw 1
    }

    // email 중복이 없는 경우에는, 입력된 데이터를 DB에 저장
    const new_user = new User(body)
    await new_user.save()
}
exports.userSignOut = async function(body) {
    // 입력한 email 데이터 존재 여부 확인
    const user = await User.findOne({ email : body.email })
    if(!user) {
        // 해당 user 없음 오류
        console.log(ErrorTable["3"])
        throw 3
    }

    // hashed password 일치 여부 확인
    await user.comparePassword(body.pwd, (err, isMatch) => {
        if(!isMatch) {
            // pwd 불일치 오류
            console.log(ErrorTable["2"])
            throw 2
        }
    })

    // 유저가 스크랩한 도안의 좋아요 수 감소
    for await (let draft_id of user['scraps']) {
        await Draft.updateOne({ _id : draft_id }, {$inc : { like : -1 }})
    }
    // 유저가 팔로우한 타투이스트의 팔로우 수 감소
    for await (let tattooist_id of user['follows']) {
        await Tattooist.updateOne({ _id : tattooist_id }, {$inc : { follower : -1 }})
    }

    // 유저 데이터 삭제
    await User.deleteOne({ email : body.email })
}

exports.tattooistLogin = async function(body) {
    // 입력한 email 데이터 존재 여부 확인
    const tattooist = await Tattooist.findOne({ email : body.email })
    if(!tattooist) {
        // 해당 tattooist 없음 오류
        console.log(ErrorTable["4"])
        throw 4
    }

    // hashed password 일치 여부 확인
    return await tattooist.comparePassword(body.pwd).then((isMatch) => {
        if (!isMatch) {
            // pwd 불일치 오류
            console.log(ErrorTable["2"])
            throw 2
        }

        // hashed password 일치하는 경우 Cookie로 사용될 데이터 반환
        return {
            tattooist_id : String(tattooist['_id']),
            nickname : tattooist['nickname'],
            image : tattooist['image'],
            description : tattooist['description']
        }
    });
}
exports.tattooistRegister = async function(body) {
    // email 중복 파악하기
    const tattooist = await Tattooist.findOne({ email : body.email })
    if (tattooist) {
        // email 중복 오류 시 Return Error Code
        console.log(ErrorTable["1"])
        throw 1
    }

    // email 중복이 없는 경우에는, 입력된 데이터를 DB에 저장
    const new_tattooist = new Tattooist(body)
    await new_tattooist.save()
}
exports.tattooistSignOut = async function(body) {
    // 입력한 email 데이터 존재 여부 확인
    const tattooist = await Tattooist.findOne({ email : body.email })
    if(!tattooist) {
        // 해당 tattooist 없음 오류
        console.log(ErrorTable["4"])
        throw 4
    }

    // hashed password 일치 여부 확인
    await tattooist.comparePassword(body.pwd, (err, isMatch) => {
        if(!isMatch) {
            // pwd 불일치 오류
            console.log(ErrorTable["2"])
            throw 2
        }
    })

    // 타투이스트가 생성한 도안 데이터 삭제
    for await (let draft_id of tattooist['drafts']) {
        await Draft.deleteOne({ _id : draft_id })
    }

    // 타투이스트 데이터 삭제
    await Tattooist.deleteOne({ email : body.email })
}

exports.pageEntry = function() {
    // 접속자 수 파악을 위한 변수 connections
    connections += 1
}
exports.pageDraft = async function(params, query) {
    let count
    let return_value

    if (params.filter === 'count') {
        count = await Draft.count()
        // 탐색 결과 없음 오류
        if(count === 0) {
            console.log(ErrorTable['5'])
            throw 5
        }

        return {count, return_value}
    }

    const item_index_start = Global.draftShowLimit * (parseInt(params.page)-1)

    let drafts;
    if (params.filter === 'best') {
        drafts = await Draft.find().sort({ like : -1 }).skip(item_index_start).limit(Global.draftShowLimit)
    } else if (params.filter === 'all') {
        drafts = await Draft.find().sort({ timestamp : -1 }).skip(item_index_start).limit(Global.draftShowLimit);
    } else if (params.filter === 'search') {
        drafts = await Draft.find({ title : {$regex : query.title }})

        // 검색 결과 없음 오류
        if (drafts.length === 0) {
            console.log(ErrorTable['6'])
            throw 6
        }
    } else {
        // filter 입력 오류
        console.log(ErrorTable["12"])
        throw 12
    }

    return_value = []
    for await (let draft of drafts) {
        const drawer = await Tattooist.findOne({ _id : draft.drawer })
        const item = {
            draft_id : draft['_id'],
            image : draft['image'],
            title : draft['title'],
            like : draft['like'],
            drawer_id : drawer['_id'],
            drawer_image : drawer['image'],
            drawer_nickname : drawer['nickname'],
            isScraped : false
        }

        return_value.push(item)
    }

    return {count, return_value}
}
exports.pageDraftDetail = async function(params) {
    const draft = await Draft.findOne({ _id : params.id })
    if (!draft) {
        // 해당 도안 없음 오류
        console.log(ErrorTable["7"])
        throw 7
    }
    const drawer = await Tattooist.findOne({ _id : draft['drawer'] })
    const return_value = {
        draft_id : draft['_id'],
        image : draft['image'],
        title : draft['title'],
        like : draft['like'],
        drawer_id : drawer['_id'],
        drawer_nickname : drawer['nickname'],
        drawer_location : drawer['location'],
        genre : draft['genre'],
        keywords : draft['keywords'],
        isScraped : false,
        isFollowed : false
    }

    return return_value
}
exports.pageTattooist = async function(params, query) {
    let count
    let return_value

    if (params.filter === 'count') {
        count = await Tattooist.count()
        // 탐색 결과 없음 오류
        if(count === 0) {
            console.log(ErrorTable['5'])
            throw 5
        }

        return {count, return_value}
    }

    const item_index_start = Global.tattooistShowLimit * (parseInt(params.page)-1)

    let tattooists;
    if (params.filter === 'best') {
        tattooists = await Tattooist.find().sort({ follower : -1 }).skip(item_index_start).limit(Global.tattooistShowLimit)
    } else if (params.filter === 'all') {
        tattooists = await Tattooist.find().skip(item_index_start).limit(Global.tattooistShowLimit);
    } else if (params.filter === 'search') {
        tattooists = await Tattooist.find({ title : {$regex : query.title }})

        // 검색 결과 없음 오류
        if (tattooists.length === 0) {
            console.log(ErrorTable['6'])
            throw 6
        }
    } else {
        // filter 입력 오류
        console.log(ErrorTable["12"])
        throw 12
    }

    return_value = []
    for (let tattooist of tattooists) {
        const item = {
            tattooist_id : tattooist['_id'],
            image : tattooist['image'],
            nickname: tattooist['nickname'],
            location: tattooist['location'],
            specialize: tattooist['specialize'],
            followers: tattooist['followers'],
            description: tattooist['description'],
            isFollowed : false
        }

        return_value.push(item)
    }

    return {count, return_value}
}
exports.pageTattooistDetail = async function(params) {
    const tattooist = await Tattooist.findOne({ _id : params.id })
    if (!tattooist) {
        // 해당 타투이스트 없음 오류
        console.log(ErrorTable["8"])
        throw 8
    }

    const tattooist_info = {
        tattooist_id : tattooist['_id'],
        image : tattooist['image'],
        nickname : tattooist['nickname'],
        office : tattooist['office'],
        contact : tattooist['contact'],
        description : tattooist['description'],
        specialize : tattooist['specialize'],
        followers : tattooist['followers'],
        isFollowed : false,
        schedules : 'mocked-up'
    }

    let return_value = []
    if (params.filter === 'draft') {
        for await (let draft_id of tattooist['drafts']) {
            const draft = await Draft.findOne({ _id : draft_id })
            const item = {
                draft_id : draft['_id'],
                image : draft['image'],
                like : draft['like']
            }

            return_value.push(item)
        }
    } else if (params.filter === 'artwork') {
        // mock-up
        return_value.push({
            artwork_id : "test_id",
            image : "test_image",
            cost : "test_cost",
            time : "test_time"
        })

        // for await (let artwork_id of tattooist['artworks']) {
        //     const artwork = await Tattoo.findOne({ _id : artwork_id })
        //     const item = {
        //         artwork_id : artwork['_id'],
        //         image : artwork['image'],
        //         cost : artwork['cost'],
        //         time : artwork['time']
        //     }
        //
        //     return_value.push(item)
        // }
    } else if (params.filter === 'reservation') {
        return_value = tattooist['schedules']
    } else {
        console.log(ErrorTable['12'])
        throw 12
    }

    return {tattooist_info, return_value}
}

exports.getConnections = function() {
    console.log('connections : ', connections)
    return connections
}
