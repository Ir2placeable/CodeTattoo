const {User} = require("../model/User")
const {Tattooist} = require("../model/Tattooist")
const {Draft} = require('../model/Draft')
const {Tattoo} = require('../model/Tattoo')
const imageStorage = require('../module/imageStorage')

const Global = require('../GlobalVariable')
const ErrorTable = require('../ErrorTable')

exports.pageMyPage = async function(params) {
    const user = await User.findOne({ _id : params.id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    const user_info = {
        user_id : user['_id'],
        nickname : user['nickname'],
        location : user['location'],
        image : user['image']
    }

    let return_value = []
    // mock-up
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

    // Real logic
    // for await (let tattoo_id of user['tattoos']) {
    //     const tattoo = await Tattoo.findOne({ _id : tattoo_id })
    //
    //     const item = {
    //
    //     }
    // }

    return {user_info, return_value}
}

exports.userInfoEdit = async function(params, body) {
    await User.updateOne({ _id : params.id }, {$set : { nickname : body.nickname, location : body.location }}, (err, user) => {
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

    const drawer = await Tattooist.findOne({ _id : draft['drawer'] })
    let return_value = {
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

    let tattooist_info = {
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
    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    if (user['follows'].includes(tattooist['_id'])) {
        tattooist_info['isFollowed'] = true
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

exports.pageScrapCount = async function(params, query) {
    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    const draft_count = user['scraps'].length
    const tattooist_count = user['follows'].length

    return {draft_count, tattooist_count}
}

exports.pageScrapDraft = async function(params, query) {
    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    let drafts = []
    for await (let draft_id of user['scraps']) {
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
            isScraped : true
        }

        return_value.push(item)
    }

    return return_value
}

exports.pageScrapTattooist = async function(params, query) {
    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    let tattooists = []
    for await (let tattooist_id of user['follows']) {
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
            nickname: tattooist['nickname'],
            location: tattooist['location'],
            specialize: tattooist['specialize'],
            followers: tattooist['followers'],
            description: tattooist['description'],
            isFollowed : true
        }

        return_value.push(item)
    }

    return return_value
}
