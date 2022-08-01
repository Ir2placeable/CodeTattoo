const {Draft} = require("../model/Draft");
const ErrorTable = require("../ErrorTable");
const Global = require("../GlobalVariable");
const {Tattooist} = require("../model/Tattooist");

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


exports.pageMyPage = async function(params) {
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
