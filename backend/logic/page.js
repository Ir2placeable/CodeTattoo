const {Draft} = require("../DBModel/Draft");
const ErrorTable = require("../ErrorTable");
const Global = require("../GlobalVariable");
const {Tattooist} = require("../DBModel/Tattooist");
const {User} = require("../DBModel/User");
const blockchain = require('../module/blockchain')
const {Reservation} = require("../DBModel/Reservation");

exports.draft = async function(params, query) {
    let count
    let return_value

    if (params.page === '0') {
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

    // only for user view
    if (query.user_id) {
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
    }

    return {count, return_value}
}

exports.draftDetail = async function(params, query) {
    const draft = await Draft.findOne({ _id : params.id })
    if (!draft) {
        // 해당 도안 없음 오류
        console.log(ErrorTable["7"])
        throw 7
    }
    const tattooist = await Tattooist.findOne({ _id : draft['drawer'] })
    const return_value = {
        draft_id : draft['_id'],
        image : draft['image'],
        title : draft['title'],
        like : draft['like'],
        drawer_id : tattooist['_id'],
        drawer_nickname : tattooist['nickname'],
        drawer_location : tattooist['location'],
        genre : draft['genre'],
        keywords : draft['keywords'],
        isScraped : false,
        isFollowed : false
    }

    if (query.user_id) {
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
    }

    return return_value
}

exports.tattooist = async function(params, query) {
    let count
    let return_value

    if (params.page === '0') {
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
        tattooists = await Tattooist.find({ nickname : {$regex : query.nickname }})

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

    if (query.user_id) {
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
    }

    return {count, return_value}
}

exports.tattooistDetail = async function(params, query) {
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
    }

    if (query.user_id) {
        const user = await User.findOne({ _id : query.user_id })
        if (!user) {
            console.log(ErrorTable["10"])
            throw 10
        }

        if (user['follows'].includes(tattooist['_id'])) {
            tattooist_info['isFollowed'] = true
        }
    }

    // filter : draft
    let return_value = []
    if (params.filter === 'draft') {
        for await (let draft_id of tattooist['drafts']) {
            const draft = await Draft.findOne({ _id : draft_id })
            if (!draft) {
                continue
            }
            const item = {
                draft_id : draft['_id'],
                image : draft['image'],
                like : draft['like']
            }

            return_value.push(item)
        }
    }
    // filter : artwork
    else if (params.filter === 'artwork') {
        // mock-up
        return_value.push({
            artwork_id : "test_id",
            image : "test_image",
            cost : "test_cost",
            time : "test_time"
        })

        // for await (let artwork_id of tattooist['artworks']) {
        //     const artwork = await blockchain.getTattooInfo(artwork_id)
        //     const item = {
        //         artwork_id : artwork_id,
        //         image : artwork['image']
        //     }
        //
        //     return_value.push(item)
        // }
    }
    // filter : reservation
    else if (params.filter === 'reservation') {
        return_value = tattooist['unavailable']
    }
    // wrong filter
    else {
        console.log(ErrorTable['12'])
        throw 12
    }

    return {tattooist_info, return_value}
}

exports.scrap = async function(params, query) {
    // filter : draft
    if (params.filter === 'draft') {
        return await scrapDraft(params, query)
    }
    // filter : tattooist
    else if (params.filter === 'tattooist') {
        return await scrapTattooist(params, query)
    }
    // wrong filter
    else {
        throw 15
    }
}
const scrapDraft = async function(params, query) {
    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    let count
    let return_value;

    if (params.page === '0') {
        count = user['scraps'].length
        // 탐색 결과 없음 오류
        if(count === 0) {
            console.log(ErrorTable['5'])
            throw 5
        }

        return {count, return_value}
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
            isScraped : true
        }

        return_value.push(item)
    }

    drafts = return_value

    return {count, drafts}
}
const scrapTattooist = async function(params, query) {
    const user = await User.findOne({ _id : query.user_id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    let count
    let return_value

    if (params.page === '0') {
        count = user['follows'].length
        // 탐색 결과 없음 오류
        if(count === 0) {
            console.log(ErrorTable['5'])
            throw 5
        }

        return {count, return_value}
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
            isFollowed : true
        }

        return_value.push(item)
    }

    tattooists = return_value

    return {count, tattooists}
}

exports.reservation = async function(params, query) {
    const tattooist = await Tattooist.findOne({ _id : query.tattooist_id })
    if (!tattooist) {
        // 해당 타투이스트 없음 오류
        console.log(ErrorTable["8"])
        throw 8
    }

    let target_reservation;
    // filter : confirm
    if (params.filter === 'confirm') {
        target_reservation = tattooist['reservations']
    }
    // filter : request
    else if (params.filter === 'request') {
        target_reservation = tattooist['requests']
    }
    // wrong filter
    else {
        throw 15
    }

    let return_value = []

    for await (let object_id of target_reservation) {
        const reservation = await Reservation.findOne({ _id : object_id })
        if (!reservation) { continue }
        const user = await User.findOne({ _id : reservation['customer_id'] })

        const item = {
            reservation_id : reservation['_id'],
            image : reservation['image'],
            user_id : user['_id'],
            user_nickname : user['nickname'],
            date : reservation['date'],
            time_slot : reservation['time_slot'],
            cost : reservation['cost'],
            procedure_status : reservation['procedure_status']
        }
        return_value.push(item)
    }
    return return_value
}

exports.userMyPage = async function(params) {
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

    return {user_info, return_value}
}