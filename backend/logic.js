const {User} = require("./model/User")
const {Tattooist} = require("./model/Tattooist")
const {Draft} = require('./model/Draft')
const {Tattoo} = require('./model/Tattoo')
const blockchain = require('./blockchainFiles/blockchain')

const mongoose = require("mongoose");
const config = require('./config/key')
const imageStorage = require('./imageStorage')

const showLimit = 16

mongoose.connect(config.mongoURI)
    .then(() => { console.log('db connected')} )
    .catch(() => { console.log('db connect failed')} )



exports.entry = function(res) {
    res.send({ success : true, error : 'entry hello world' })
}
exports.register = async function(body, res) {
    const user = await User.findOne({ email : body.email })
    if (user) {
        res.send({ success : false, error : 'already existed email'})
        return
    }

    const new_user = new User(body);
    new_user.save()
        .then(() => {
            res.send({ success : true })
        })
}
exports.login = async function(body, res) {
    const user = await User.findOne({ email : body.email })
    if(!user) {
        res.send({ success : false, error : 'wrong email' })
        return
    }

    user.comparePassword(body.pwd, (err, isMatch) => {
        if (!isMatch) {
            res.send({ success : false, errorr : 'wrong password' })
            return
        }

        const user_info = {
            user_id : String(user._id),
            name : user.name,
            location : user.location,
            isTattooist : user.isTattooist
        }
        res.send({ success : true, user_info : user_info })
    })
}

exports.userMyPage = async function(query, res) {
    const user = await User.findOne({ _id : query.user_id })
    if(!user) {
        res.send({ success : false, error : 'wrong user_id' })
        return
    }

    const user_info = {
        user_id : String(user._id),
        name : user.name,
        location : user.location,
        isTattooist : user.isTattooist
    }
    const profile = {
        description : user.profile.description,
        image : user.profile.image
    }
    res.send({ success : true, user_info : user_info, profile : profile })
}
exports.userInfoEdit = async function(body, res) {
    await User.updateOne({ _id : body.user_id }, {$set : { name : body.name, location : body.location, profile : { description : body.description }}})

    res.send({ success : true })
}
exports.userImageEdit = async function(body, res) {
    const params = { title : body.user_id, image : body.image, mime : body.mime }
    const url = await imageStorage.upload(params)

    await User.updateOne({ _id : body.user_id }, {$set : { profile : { image : url }}})

    res.send({ success : true })
}
exports.userScrap = async function(body, res) {
    await User.updateOne({ _id : body.user_id }, {$push : { scraps : body.draft_id }})
    await Draft.updateOne({ _id : body.draft_id}, {$inc : { like : 1 }})

    res.send({ success : true })
}
exports.userFollow = async function(body, res) {
    await User.updateOne({ _id : body.user_id }, {$push : { follow : body.tattooist_id }})

    res.send({ success : true })
}
exports.userMyTattoo = async function(body, res) {
    // const tattoo_info = await blockchain.query(body.tattoo_id)
    // res.send({ success : true, tattoo_info : tattoo_info })


    //prototype
}
exports.tattooHistory = async function(body, res) {
    const tattoo_history = await blockchain.history(body.tattoo_id)
    res.send({ success : true, tattoo_history : tattoo_history })
}
exports.addSideEffect = async function(body, res) {
    const side_effect = [ body.user_id, body.symptom ]
    await blockchain.invoke('addSideEffect', body.tattoo_id, side_effect)

    res.send({ success : true })
}


exports.tattooistEnroll = async function(body, res) {
    const user = await User.findOne({ _id : body.user_id })
    // 유저 입력값 오류
    if(!user) {
        res.send({ success : false, error : 'wrong user_id' })
        return
    }
    // 이미 등록된 타투이스트
    if(user['isTattooist'] !== "") {
        res.send({ success : false, error : 'already enrolled' })
        return
    }

    const new_tattooist = new Tattooist(body);
    await new_tattooist.save();

    await User.updateOne({ _id : body.user_id }, { $set : { isTattooist : String(new_tattooist._id) }} )
    res.send({ success : true, tattooist_id : String(new_tattooist._id) })
}
exports.tattooistList = async function(res) {
    const tattooist_list = await Tattooist.find().sort({ followers : -1 })

    res.send({ success : true, tattooist_list : tattooist_list })
}
exports.tattooistMyPage = async function(query, res) {
    const tattooist = await Tattooist.findOne({ _id : query.tattooist_id })
    if(!tattooist) {
        res.send({ success : false, error : 'wrong tattooist id'})
        return
    }

    let promise_list = []
    let draft_info_list = []
    tattooist.drafts.forEach((draft_id) => {
        promise_list.push(
            Draft.findOne({ _id : draft_id })
                .then((draft) => {
                    const draft_info = {
                        _id : draft._id,
                        title : draft.title,
                        image : draft.image,
                        timestamp : draft.timestamp
                    }
                    draft_info_list.push(draft_info)
                })
        )
    })
    Promise.all(promise_list).then(() => {
        const tattooist_info = {
            nickname : tattooist.nickname,
            specialize : tattooist.specialize,
            location : tattooist.office.location,
            contact : tattooist.office.contact,
            drafts : draft_info_list,
            profile : tattooist.profile
        }
        res.send({ success : true, tattooist_info : tattooist_info })
    })
}
exports.tattooistInfoEdit = async function(body, res) {
    await Tattooist.updateOne({ _id : body.tattooist_id }, {$set : { nickname : body.nickname, specialize : body.specialize, office : { location : body.location, contact : body.contact }, profile : { description : body.description } }})

    res.send({ success : true })
}
exports.tattooistImageEdit = async function(body, res) {
    const params = { title : body.tattooist_id, image : body.image, mime : body.mime }
    const url = await imageStorage.upload(params)

    await Tattooist.updateOne({ _id : body.tattooist_id }, {$set : { profile : { image : url }}})

    res.send({ success : true })
}


exports.newDraft = async function(body, res) {
    const tattooist = await Tattooist.findOne({ _id : body.drawer })
    if(tattooist === "") {
        res.send({ success : false, error : 'not enrolled tattooist'})
        return
    }

    const params = { title : body.title, image : body.image, mime : body.mime }
    body.image = await imageStorage.upload(params)

    const new_draft = new Draft(body);
    new_draft.timestamp = Math.round(Date.now()/1000)

    await new_draft.save();
    await Tattooist.updateOne({ _id : body.drawer }, {$push : { drafts : String(new_draft._id) }})

    res.send({ success : true })
}
exports.browseDraft = function(params, res) {
    const page_number = parseInt(params.page)
    const item_index_start = showLimit * (page_number-1)

    if (params.filter === 'init') {
        Draft.count().then((count) => {
            res.send({ success : true, count : count })
        })
    } else if (params.filter === 'best') {
        browseDraft_best(item_index_start, res)
            .catch(() => { res.send({ success : false , error : 'unexpected error'})})
    } else if (params.filter === 'recent') {
        browseDraft_recent(item_index_start, res)
            .catch(() => { res.send({ success : false , error : 'unexpected error'})})
    } else if (params.filter === 'all') {
        browseDraft_all(item_index_start, res)
            .catch(() => { res.send({ success : false , error : 'unexpected error'})})
    } else {
        res.send({ success : false, error : "wrong filter" })
    }
}
const browseDraft_best = async function(item_index_start, res) {
    await Draft.find().sort({ like : -1 }).skip(item_index_start).limit(showLimit)
        .then((drafts) => { res.send({ success : true, drafts : drafts })})
}
const browseDraft_recent = async function(item_index_start, res) {
    await Draft.find().sort({ timestamp : -1 }).skip(item_index_start).limit(showLimit)
        .then((drafts) => { res.send({ success : true, drafts : drafts })})
}
const browseDraft_all = async function(item_index_start, res) {
    await Draft.find().skip(item_index_start).limit(showLimit)
        .then((drafts) => { res.send({ success : true, drafts : drafts })})
}


exports.imprintReservation = async function(body, res) {
    const tattooist = await Tattooist.findOne({ _id : body.tattooist_id })
    if(!tattooist) {
        res.send({ success : false, error : 'no tattooist'})
        return
    }
    const user = await Tattooist.findOne({ _id : body.user_id })
    if(!user) {
        res.send({ success : false, error : 'no user'})
        return
    }


    res.send({ error : 'prototype'})
}
exports.imprintStart = async function(body, res) {
    const new_tattoo = new Tattoo()
    new_tattoo.owner_id = body.user_id;

    // new_tattoo.save()
    // await User.updateOne({ _id : body.user_id }, {$push : { tattoos : new_tattoo }})

    await blockchain.invoke('newTattoo', new_tattoo._id, body.user_id)

    const procedure = [ body.tattooist_id, body.using_items, Math.round(Date.now()/1000) ]
    await blockchain.invoke('startImprint', new_tattoo._id, procedure)

    res.send({ success : true, tattoo_id : new_tattoo._id })
}
exports.imprintEnd = async function(body, res) {
    const procedure = [ body.tattooist_id ]
    await blockchain.invoke('endImprint', body.tattoo_id, procedure)

    res.send({ success : true })
}
exports.removeReservation = async function(body, res) {
    res.send({ error : 'prototype'})
}
exports.removeStart = async function(body, res) {
    const procedure = [ body.hospital_id, body.using_items, Math.round(Date.now()/1000) ]
    await blockchain.invoke('startRemove', body.tattoo_id, procedure)

    res.send({ success : true })
}
exports.removeEnd = async function(body, res) {
    const procedure = [ body.hospital_id ]
    await blockchain.invoke('endRemove', body.tattoo_id, procedure)

    res.send({ success : true })
}
