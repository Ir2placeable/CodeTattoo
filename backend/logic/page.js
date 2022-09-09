const {Draft} = require("../DBModel/Draft");
const Global = require("../GlobalVariable");
const {Tattooist} = require("../DBModel/Tattooist");
const {User} = require("../DBModel/User");
const blockchain = require('../module/blockchain')
const {Reservation} = require("../DBModel/Reservation");

// 도안 페이지
exports.draft = async function(params, query) {
    let count
    let return_value

    if (params.page === '0') {
        count = await Draft.count()
        // 탐색 결과 없음 오류
        if(count === 0) { throw 10 }

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

        if (drafts.length === 0) { throw 11 }
    } else {
        throw 6
    }

    return_value = []
    for await (let draft of drafts) {
        const drawer = await Tattooist.findOne({ _id : draft.drawer })
        if (!drawer) { throw 2 }
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
        if (!user) { throw 1 }

        for (let draft of return_value) {
            if(user['scraps'].includes(String(draft['draft_id']))) {
                draft['isScraped'] = true
            }
        }
    }

    return {count, return_value}
}
// 도안 세부 페이지
exports.draftDetail = async function(params, query) {
    const draft = await Draft.findOne({ _id : params.id })
    if (!draft) { throw 3 }

    const tattooist = await Tattooist.findOne({ _id : draft['drawer'] })
    if(!tattooist) { throw 2 }

    const return_value = {
        draft_id : draft['_id'],
        image : draft['image'],
        title : draft['title'],
        cost : draft['cost'],
        like : draft['like'],
        drawer_id : tattooist['_id'],
        drawer_image : tattooist['image'],
        drawer_nickname : tattooist['nickname'],
        drawer_location : tattooist['location'],
        genre : draft['genre'],
        keywords : draft['keywords'],
        isScraped : false,
        isFollowed : false
    }

    if (query.user_id) {
        const user = await User.findOne({ _id : query.user_id })
        if (!user) { throw 1 }

        if (user['follows'].includes(draft['drawer'])) {
            return_value['isFollowed'] = true
        }
        if (user['scraps'].includes(draft['_id'])) {
            return_value['isScraped'] = true
        }
    }

    return return_value
}
// 타투이스트 페이지
exports.tattooist = async function(params, query) {
    let count
    let return_value

    if (params.page === '0') {
        count = await Tattooist.count()
        if(count === 0) { throw 10 }

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

        if (tattooists.length === 0) { throw 11 }
    } else { throw 6 }

    return_value = []
    for (let tattooist of tattooists) {
        const item = {
            tattooist_id : tattooist['_id'],
            image : tattooist['image'],
            nickname: tattooist['nickname'],
            location: tattooist['location'],
            specialize: tattooist['specialize'],
            followers: tattooist['follower'],
            description: tattooist['description'],
            isFollowed : false
        }

        return_value.push(item)
    }

    if (query.user_id) {
        const user = await User.findOne({ _id : query.user_id })
        if (!user) { throw 1 }

        for (let tattooist of return_value) {
            if (user['follows'].includes(String(tattooist['tattooist_id']))) {
                tattooist['isFollowed'] = true
            }
        }
    }

    return {count, return_value}
}
// 타투이스트 세부 페이지
exports.tattooistDetail = async function(params, query) {
    const tattooist = await Tattooist.findOne({ _id : params.id })
    if (!tattooist) { throw 2 }

    const tattooist_info = {
        tattooist_id : tattooist['_id'],
        image : tattooist['image'],
        nickname : tattooist['nickname'],
        office : tattooist['office'],
        contact : tattooist['contact'],
        location : tattooist['location'],
        description : tattooist['description'],
        specialize : tattooist['specialize'],
        followers : tattooist['follower'],
        isFollowed : false,
    }

    // Only User : follow 여부 확인
    if (query.user_id) {
        const user = await User.findOne({ _id : query.user_id })
        if (!user) { throw 1 }

        if (user['follows'].includes(tattooist['_id'])) {
            tattooist_info['isFollowed'] = true
        }
    }

    // filter : draft
    let return_value = []
    if (params.filter === 'draft') {
        for await (let draft_id of tattooist['drafts']) {
            const draft = await Draft.findOne({ _id : draft_id })
            if (!draft) { continue }

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
        // 블록체인에서 히스토리를 받아서 endTattoo / addProcedure 만 가져와야 함
        // 현재는 일차 구현 명목으로 최근 쿼리만 가져오고 있음

        for await (let tattoo_id of tattooist['artworks']) {
            const tattoo_info = await blockchain.getTattooInfo(tattoo_id)

            return_value.push({
                artwork_id : tattoo_id,
                image : tattoo_info['image'],
                cost : tattoo_info['cost'],
                timestamp : tattoo_info['timestamp']
            })
        }
    }
    // filter : reservation
    else if (params.filter === 'reservation') {
        const unavailable_list = tattooist['unavailable']

        for (let unavailable of unavailable_list) {
            if (unavailable.date !== parseInt(query.date)) { continue }

            return_value.push(unavailable['time_slot'])
        }
    }
    // wrong filter
    else { throw 6 }

    return {tattooist_info, return_value}
}
// 작업물 페이지
exports.artworkDetail = async function(params, query) {
    let info;
    let states = [];

    const tattooist = await Tattooist.findOne({ _id : query.tattooist_id })
    if (!tattooist) { throw 2 }

    const tattoo_history = await blockchain.getTattooHistory(params.id)
    if (!tattoo_history) { throw 30 }

    for (let tattoo_state of tattoo_history) {
        states.push(tattoo_state)
    }

    info = {
        image : states[2].image,
        date : states[2].date,
        taken_time : states[2].timestamp - states[1].timestamp,
        cost : states[2].cost,
        tattooist_nickname : tattooist['nickname'],
        body_part : states[2].body_part,
        inks : states[2].inks,
        machine : states[2].machine,
    }

    return {info, states}
}
// 예약 세부 페이지
exports.reservationDetail = async function(params) {
    let reservation_info;
    let procedure_info;

    const reservation = await Reservation.findOne({ _id : params.id })
    if (!reservation) { throw 4 }

    reservation_info = {
        date: reservation['date'],
        time_slot: reservation['time_slot'],
        cost: reservation['cost'],
        body_part: reservation['body_part'],
        confirmed: reservation['confirmed'],
        procedure_status : reservation['procedure_status'],
        image : reservation['image']
    }

    User.findOne({ _id : reservation['customer_id']}, (err, user) => {
        reservation_info['customer_id'] = user['_id']
        reservation_info['customer_nickname'] = user['nickname']
    })
    Tattooist.findOne({ _id : reservation['tattooist_id']}, (err, tattooist) => {
        reservation_info['tattooist_id'] = tattooist['_id']
        reservation_info['tattooist_nickname'] = tattooist['nickname']
    })

    // procedure_status = true 인 경우 -> 즉, 작업 시작이 된 경우
    if (reservation['procedure_status']) {
        const tattoo_id = reservation['tattoo_id']
        const blockchain_data = await blockchain.getTattooInfo(tattoo_id)

        procedure_info = {
            inks : blockchain_data['inks'],
            depth : blockchain_data['depth'],
            niddle : blockchain_data['niddle'],
            machine : blockchain_data['machine']
        }
    }

    return {reservation_info, procedure_info}
}

// 스크랩 페이지 (Only User)
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
    else { throw 6 }
}
const scrapDraft = async function(params, query) {
    const user = await User.findOne({ _id : query.user_id })
    if (!user) { throw 1 }

    let count
    let return_value;

    if (params.page === '0') {
        count = user['scraps'].length
        // 탐색 결과 없음 오류
        if(count === 0) { throw 10 }

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
        if (!drawer) { throw 2 }

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
    if (!user) { throw 1 }

    let count
    let return_value

    if (params.page === '0') {
        count = user['follows'].length
        if(count === 0) { throw 10 }

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
            followers: tattooist['follower'],
            description: tattooist['description'],
            isFollowed : true
        }

        return_value.push(item)
    }

    tattooists = return_value

    return {count, tattooists}
}
// 유저 마이페이지 (Only User)
exports.userMyPage = async function(params) {
    const user = await User.findOne({ _id : params.id })
    if (!user) { throw 1 }

    const user_info = {
        user_id : user['_id'],
        nickname : user['nickname'],
        location : user['location'],
        image : user['image']
    }

    let return_value = [] // 유저가 새긴 여러 개의 타투

    for await (let tattoo_id of user['tattoos']) {
        const tattoo_info = [] // 단일 타투의 히스토리
        const tattoo_history = await blockchain.getTattooHistory(tattoo_id)
        if (!tattoo_history) { throw 30 }

        for (let tattoo_state of tattoo_history) {
            tattoo_info.push(tattoo_state)
        }
        return_value.push(tattoo_info)
    }

    return {user_info, return_value}
}

// 예약 페이지 (Only Tattooist)
exports.reservation = async function(query) {
    const tattooist = await Tattooist.findOne({ _id : query.tattooist_id })
    if (!tattooist) { throw 2 }

    let return_value = []

    for (let reservation_id of tattooist['reservations']) {
        const reservation = await Reservation.findOne({ _id : reservation_id })
        if (!reservation) { continue }
        const user = await User.findOne({ _id : reservation['customer_id'] })
        if (!user) { throw 1 }

        const item = {
            reservation_id : reservation['_id'],
            image : reservation['image'],
            customer_id : user['_id'],
            customer_nickname : user['nickname'],
            date : reservation['date'],
            time_slot : reservation['time_slot'],
            cost : reservation['cost'],
            body_part : reservation['body_part'],
            procedure_status : reservation['procedure_status'],
            confirmed : reservation['confirmed']
        }

        return_value.push(item)
    }

    // 예약 일정 순으로 정렬할 것
    return_value.sort(function(a, b) {
        const target1 = Number(String(a.date)+String(a.time_slot))
        const target2 = Number(String(b.date)+String(b.time_slot))

        return target1 - target2
    })

    return return_value
}