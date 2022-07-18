const {User} = require("../model/User")
const {Tattooist} = require("../model/Tattooist")
const {Draft} = require('../model/Draft')

const imageStorage = require('./module/imageStorage')
const Global = require('../GlobalVariable')
const ErrorTable = require('../ErrorTable')

exports.pageMyPage = async function(params) {
    const user = await User.findOne({ _id : params.id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    const return_value = {
        user_id : user['_id'],
        nickname : user['nickname'],
        description : user['description'],
        image : user['image']
    }

    return return_value
}

exports.userInfoEdit = async function(params, body) {
    await User.updateOne({ _id : params.id }, {$set : { nickname : body.nickname, description : body.nickname }}, (err, user) => {
        if(!user) {
            console.log(ErrorTable["10"])
            throw 10
        }
        if(err) {
            console.log(ErrorTable["9"])
            throw 9
        }
    })
}

exports.userImageEdit = async function(params, body) {
    const imageStorage_params = { title : params.id, image : body.image, mime : body.mime }
    const image_url = await imageStorage.upload(imageStorage_params)

    await User.updateOne({ _id : params.id }, {$set : { image : image_url }}, (err, user) => {
        if(!user) {
            console.log(ErrorTable["10"])
            throw 10
        }
        if(err) {
            console.log(ErrorTable["9"])
            throw 9
        }
    })
}

exports.pageDraft = async function(params, query) {
    const count = await Draft.count()
    // 탐색 결과 없음 오류
    if(count === 0) {
        console.log(ErrorTable['5'])
        throw 5
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

    let return_value = []
    for (let draft of drafts) {
        const item = {
            draft_id : draft['_id'],
            image : draft['image'],
            title : draft['title'],
            like : draft['like'],
            genre : draft['genre'],
            keywords : draft['keywords'],
            isScraped : 'unavailable'
        }

        return_value.push(item)
    }

    // 스크랩 여부 검사
    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    for (let draft of return_value) {
        if(user['scraps'].includes(String(draft['draft_id']))) {
            draft['isScraped'] = true
        }
    }

    return {count, return_value}
}

exports.pageDraftDetail = async function(params, query) {
    const draft = await Draft.findOne({ _id : params.id })
    if (!draft) {
        // 해당 도안 없음 오류
        console.log(ErrorTable["7"])
        throw 7
    }

    let return_value = {
        draft_id : draft['_id'],
        drawer : draft['drawer'],
        image : draft['image'],
        title : draft['title'],
        like : draft['like'],
        genre : draft['genre'],
        keywords : draft['keywords'],
        isScraped : 'unavailable',
        isFollowed : 'unavailable'
    }

    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    if (user['follows'].includes(draft['drawer'])) {
        return_value['isFollowed'] = true
    }
    if (user['scraps'].includes(draft['_id'])) {
        return_value['isScraped'] = true
    }

    return return_value
}

exports.pageTattooist = async function(params, query) {
    const count = await Tattooist.count()
    // 탐색 결과 없음 오류
    if(count === 0) {
        console.log(ErrorTable['5'])
        throw 5
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

    let return_value = []
    for (let tattooist of tattooists) {
        const item = {
            tattooist_id : tattooist['_id'],
            image : tattooist['image'],
            nickname: tattooist['nickname'],
            office: tattooist['office'],
            contact: tattooist['contact'],
            description: tattooist['description'],
            specialize: tattooist['specialize'],
            followers: tattooist['followers'],
            isFollowed : 'unavailable'
        }

        return_value.push(item)
    }

    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    for (let tattooist of return_value) {
        if (user['follows'].includes(String(tattooist['tattooist_id']))) {
            tattooist['isFollowed'] = true
        }
    }

    return {count, return_value}
}

exports.pageTattooistDetail = async function(params, query) {
    const tattooist = await Tattooist.findOne({ _id : params.id })
    if (!tattooist) {
        // 해당 타투이스트 없음 오류
        console.log(ErrorTable["8"])
        throw 8
    }

    const return_value = {
        tattooist_id : tattooist['_id'],
        image : tattooist['image'],
        nickname : tattooist['nickname'],
        office : tattooist['office'],
        contact : tattooist['contact'],
        description : tattooist['description'],
        specialize : tattooist['specialize'],
        followers : tattooist['followers'],
        isFollowed : 'unavailable',
        schedules : 'mocked-up'
    }

    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    if (user['follows'].includes(tattooist['_id'])) {
        return_value['isFollowed'] = true
    }

    return return_value
}

exports.pageScrapDraft = async function(params, query) {
    const count = await Draft.count()
    if (count === 0) {
        console.log(ErrorTable["5"])
        throw 5
    }

    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    let drafts = []
    for await (let draft_id of user.scraps) {
        const draft = await Draft.findOne({ _id : draft_id })
        if(!draft) {
            await User.updateOne({ _id : query.user_id }, {$pull : { scraps : draft_id }})
            continue
        }

        drafts.push(draft)
    }

    const item_index_start = Global.draftShowLimit * (parseInt(params.page)-1)
    drafts = drafts.slice(item_index_start, (item_index_start + Global.draftShowLimit))

    let return_value = []
    for (let draft of drafts) {
        const item = {
            draft_id : draft['_id'],
            image : draft['image'],
            title : draft['title'],
            like : draft['like'],
            genre : draft['genre'],
            keywords : draft['keywords'],
            isScraped : true
        }

        return_value.push(item)
    }

    return {count, return_value}
}

exports.pageScrapTattooist = async function(params, query) {
    const count = await Tattooist.count()
    if (count === 0) {
        console.log(ErrorTable["5"])
        throw 5
    }

    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    let tattooists = []
    for await (let tattooist_id of user.follows) {
        const tattooist = await Tattooist.findOne({ _id : tattooist_id })
        if(!tattooist) {
            await User.updateOne({ _id : query.user_id }, {$pull : { follows : tattooist_id }})
            continue
        }

        tattooists.push(tattooist)
    }

    const item_index_start = Global.tattooistShowLimit * (parseInt(params.page)-1)
    tattooists = tattooists.slice(item_index_start, (item_index_start + Global.tattooistShowLimit))

    let return_value = []
    for (let tattooist of tattooists) {
        const item = {
            tattooist_id : tattooist['_id'],
            image : tattooist['image'],
            nickname : tattooist['nickname'],
            office : tattooist['office'],
            contact : tattooist['contact'],
            specialize : tattooist['specialize'],
            followers : tattooist['followers'],
            description : tattooist['description'],
            isFollowed : true
        }

        return_value.push(item)
    }

    return {count, return_value}
}

exports.pageMyTattoo = async function(query) {
    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    // 탐색 결과 없음 오류
    // if (user['tattoos'].length === 0) {
    //     console.log(ErrorTable["5"])
    //     throw 5
    // }

    // mock-up data
    // original : interact with blockchain
    let return_value = []
    let tattoo1 = []
    const state1 = { tattoo_id : "test_tattoo", state : "created", ink : "black, red", niddle : "niddle123", tattooist_id : "test_id_1", customer_id : "test_id_1" }
    const state2 = { tattoo_id : "test_tattoo", state : "imprinting", ink : "black, red", niddle : "niddle123", tattooist_id : "test_id_1", customer_id : "test_id_1" }
    const state3 = { tattoo_id : "test_tattoo", state : "imprinted", ink : "black, red", niddle : "niddle123", tattooist_id : "test_id_1", customer_id : "test_id_1" }
    let tattoo2 = []
    const state4 = { tattoo_id : "test_tattoo2", state : "created", ink : "black, red", niddle : "niddle123", tattooist_id : "test_id_1", customer_id : "test_id_1" }
    const state5 = { tattoo_id : "test_tattoo2", state : "imprinting", ink : "black, red", niddle : "niddle123", tattooist_id : "test_id_1", customer_id : "test_id_1" }
    const state6 = { tattoo_id : "test_tattoo2", state : "imprinted", ink : "black, red", niddle : "niddle123", tattooist_id : "test_id_1", customer_id : "test_id_1" }
    const state7 = { tattoo_id : "test_tattoo2", state : "side-effected", ink : "black, red", niddle : "niddle123", tattooist_id : "test_id_1", customer_id : "test_id_1" }

    tattoo1.push(state1, state2, state3)
    tattoo2.push(state4, state5, state6, state7)
    return_value.push(tattoo1, tattoo2)

    return return_value
}

exports.pageMyTattooDetail = async function(params, query) {
    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    return "have not coded yet"
}