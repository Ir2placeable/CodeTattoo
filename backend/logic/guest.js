const {User} = require("../model/User")
const {Tattooist} = require("../model/Tattooist")
const {Draft} = require('../model/Draft')
const Global = require('../GlobalVariable')
const ErrorTable = require('../ErrorTable')

let connections = 0

exports.userLogin = async function(body) {
    const user = await User.findOne({ email : body.email })
    if(!user) {
        // 해당 user 없음 오류
        console.log(ErrorTable["3"])
        throw 3
    }

    user.comparePassword(body.pwd, (err, isMatch) => {
        if(!isMatch) {
            // pwd 불일치 오류
            console.log(ErrorTable["2"])
            throw 2
        }

        const return_value = {
            user_id : user['_id'],
            nickname : user['nickname'],
            image : user['image'],
            description : user['description']
        }

        return return_value
    })
}
exports.userRegister = async function(body) {
    const user = await User.findOne({ email : body.email })
    if (user) {
        // email 중복 오류
        console.log(ErrorTable["1"])
        throw 1
    }

    const new_user = new User(body)
    await new_user.save()
}
exports.userSignOut = async function(body) {
    const user = await User.findOne({ email : body.email })
    if(!user) {
        // 해당 user 없음 오류
        console.log(ErrorTable["3"])
        throw 3
    }

    user.comparePassword(body.pwd, (err, isMatch) => {
        if(!isMatch) {
            // pwd 불일치 오류
            console.log(ErrorTable["2"])
            throw 2
        }
    })

    for await (let draft_id of user['scraps']) {
        await Draft.updateOne({ _id : draft_id }, {$inc : { like : -1 }})
    }
    for await (let tattooist_id of user['follows']) {
        await Tattooist.updateOne({ _id : tattooist_id }, {$inc : { follower : -1 }})
    }

    await User.deleteOne({ email : body.email })
}

exports.tattooistLogin = async function(body) {
    const tattooist = await Tattooist.findOne({ email : body.email })
    if(!tattooist) {
        // 해당 tattooist 없음 오류
        console.log(ErrorTable["4"])
        throw 4
    }

    tattooist.comparePassword(body.pwd, (err, isMatch) => {
        if(!isMatch) {
            // pwd 불일치 오류
            console.log(ErrorTable["2"])
            throw 2
        }

        const return_value = {
            tattooist_id : tattooist['_id'],
            nickname : tattooist['nickname'],
            image : tattooist['image'],
            description : tattooist['description']
        }

        return return_value
    })
}
exports.tattooistRegister = async function(body) {
    const tattooist = await Tattooist.findOne({ email : body.email })
    if (tattooist) {
        // email 중복 오류
        console.log(ErrorTable["1"])
        throw 1
    }

    const new_tattooist = new Tattooist(body)
    await new_tattooist.save()
}
exports.tattooistSignOut = async function(body) {
    const tattooist = await Tattooist.findOne({ email : body.email })
    if(!tattooist) {
        // 해당 tattooist 없음 오류
        console.log(ErrorTable["4"])
        throw 4
    }

    tattooist.comparePassword(body.pwd, (err, isMatch) => {
        if(!isMatch) {
            // pwd 불일치 오류
            console.log(ErrorTable["2"])
            throw 2
        }
    })

    for await (let draft_id of tattooist['drafts']) {
        await Draft.deleteOne({ _id : draft_id })
    }

    await Tattooist.deleteOne({ email : body.email })
}


exports.pageEntry = function() {
    connections += 1
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

    return count, return_value
}
exports.pageDraftDetail = function() {

}
exports.pageTattooist = async function() {
    const count = await Tattooist.count()
}
exports.pageTattooistDetail = function() {

}

