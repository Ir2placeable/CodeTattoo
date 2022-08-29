const ErrorTable = require("../ErrorTable");
const {User} = require("../DBModel/User");
const {Reservation} = require("../DBModel/Reservation")
const imageStorage = require("../module/imageStorage");
const {Draft} = require("../DBModel/Draft");
const {Tattooist} = require("../DBModel/Tattooist");
const {Tattoo} = require("../DBModel/Tattoo")
const blockchain = require("../module/blockchain")

exports.userLogin = async function(body) {
    console.log('test')
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
            description: user['description'],
            location : user['location']
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
exports.userPasswordEdit = async function(params, body) {
    User.updateOne({ _id : params.id }, {$set : { pwd : body.pwd }}, (err, user) => {
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
            description : tattooist['description'],
            specialize : tattooist['specialize'],
            location : tattooist['location']
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
exports.tattooistPasswordEdit = async function(params, body) {
    Tattooist.updateOne({ _id : params.id }, {$set : { pwd : body.pwd }}, (err, tattooist) => {
        if(!tattooist) {
            console.log(ErrorTable["4"])
            throw 10
        }
        if(err) {
            console.log(ErrorTable["9"])
            throw 9
        }
    })
}

exports.userInfoEdit = async function(params, body) {
    User.updateOne({ _id : params.id }, {$set : { nickname : body.nickname, location : body.location }}, (err, user) => {
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

    User.updateOne({ _id : params.id }, {$set : { image : image_url }}, (err, user) => {
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

exports.tattooistInfoEdit = async function(params, body) {
    Tattooist.updateOne({ _id : params.id }, {$set : { nickname : body.nickname, location : body.location, specialize : body.specialize, description : body.description }}, (err, tattooist) => {
        if(!tattooist) {
            console.log(ErrorTable["10"])
            throw 10
        }
        if(err) {
            console.log(ErrorTable["9"])
            throw 9
        }
    })
}
exports.tattooistImageEdit = async function(params, body) {
    const imageStorage_params = { title : params.id, image : body.image, mime : body.mime }
    const image_url = await imageStorage.upload(imageStorage_params)

    Tattooist.updateOne({ _id : params.id }, {$set : { image : image_url }}, (err, tattooist) => {
        if(!tattooist) {
            console.log(ErrorTable["10"])
            throw 10
        }
        if(err) {
            console.log(ErrorTable["9"])
            throw 9
        }
    })
}

exports.createDraft = async function(params, body) {
    const tattooist = await Tattooist.findOne({ _id : params.id })
    if (!tattooist) {
        // 해당 타투이스트 없음 오류
        console.log(ErrorTable["8"])
        throw 8
    }

    const imageStorage_params = { title : body.title, image : body.image, mime : body.mime }
    const image_url = await imageStorage.upload(imageStorage_params)

    const draft_schema = {
        drawer : tattooist['_id'],
        title : body['title'],
        image : image_url,
        genre : body['genre'],
        keywords : body['keywords'],
        cost : body['cost'],
        timestamp : Math.floor(Date.now() / 1000)
    }

    const new_draft = new Draft(draft_schema)
    await new_draft.save()

    await Tattooist.updateOne({ _id : params.id }, {$push : { drafts : new_draft._id }})
}
exports.removeDraft = async function(params, body) {
    await Tattooist.updateOne({ _id : params.id }, {$pull : { drafts : body.draft_id }})
    await Draft.deleteOne({ _id : body.draft_id })
}
exports.editDraft = async function(params, body) {
    Draft.updateOne({ _id : params.id }, { title : body.title, genre : body.genre, keywords : body.keywords, cost : body.cost }, (err, draft) => {
        if(!draft) {
            console.log(ErrorTable["10"])
            throw 10
        }
        if(err) {
            console.log(ErrorTable["9"])
            throw 9
        }
    })
}

exports.scrapDraft = async function(params, body) {
    await Draft.updateOne({ _id : body.draft_id }, {$inc : { like : 1 }})
    await User.updateOne({ _id : params.id }, {$push : { scraps : body.draft_id }})
}
exports.unScrapDraft = async function(params, body) {
    await Draft.updateOne({ _id : body.draft_id }, {$inc : { like : -1 }})
    await User.updateOne({ _id : params.id }, {$pull : { scraps : body.draft_id }})
}

exports.followTattooist = async function(params, body) {
    await Tattooist.updateOne({ _id : body.tattooist_id }, {$inc : { follower : 1 }})
    await User.updateOne({ _id : params.id }, {$push : { follows : body.tattooist_id }})
}
exports.unFollowTattooist = async function(params, body) {
    await Tattooist.updateOne({ _id : body.tattooist_id }, {$inc : { follower : -1 }})
    await User.updateOne({ _id : params.id }, {$pull : { follows : body.tattooist_id }})
}

exports.createUnavailable = async function(params, body) {
    const tattooist = await Tattooist.findOne({ _id : params.id })
    if(!tattooist) {
        // 해당 tattooist 없음 오류
        console.log(ErrorTable["4"])
        throw 4
    }

    for await (let unavailable of body['unavailable']) {
        await Tattooist.updateOne({ _id : params.id }, {$push : { unavailable : unavailable }})
    }
}
exports.deleteUnavailable = async function(params, body) {
    const tattooist = await Tattooist.findOne({ _id : params.id })
    if(!tattooist) {
        // 해당 tattooist 없음 오류
        console.log(ErrorTable["4"])
        throw 4
    }

    for await (let unavailable of body['unavailable']) {
        await Tattooist.updateOne({ _id : params.id }, {$pull : { unavailable : unavailable }})
    }
}

exports.createReservation = async function(body) {
    let new_reservation = new Reservation(body)

    await new_reservation.save()
    await Tattooist.updateOne({ _id : body.tattooist_id }, {$push : { reservations : new_reservation['_id'] }})

    // 유저와 타투이스트 채팅 생성하기
}
exports.editReservation = async function(params, body) {
    // date, time_slot, cost 수정 Only
    await Reservation.updateOne({ _id : params.id }, {$set : { date : body.date, time_slot : body.time_slot, cost : body.cost, body_part : body.body_part }})
}
exports.editReservationImage = async function(params, body) {
    // image 수정 Only
    const imageStorage_params = { title : params.id, image : body.image, mime : body.mime }
    const image_url = await imageStorage.upload(imageStorage_params)

    await Reservation.updateOne({ _id : params.id }, {$set : { image : image_url }})
}
exports.confirmReservation = async function(params, body) {
    await Reservation.updateOne({ _id : params.id }, {$set : { confirmed : true }}, (err, reservation) => {
        if (err) { throw 20 }
        if (!reservation) { throw 'wrong reservation' }
    })

    // body.tattooist_id 이용 -> 해당 타투이스트에게 알림 전송
    // body.user_id 이용 -> 해당 유저에게 알림 전송
}
exports.rejectReservation = async function(params, body) {
    await Reservation.deleteOne({ _id : params.id })
    await Tattooist.updateOne({ _id : body.tattooist_id }, {$pull : { requests : params.id }})

    // body.tattooist_id 이용 -> 해당 타투이스트에게 알림 전송
    // body.user_id 이용 -> 해당 유저에게 알림 전송
}

exports.beginProcedure = async function(params, body) {
    await Reservation.updateOne({ _id : params.id }, {$set : { procedure_status : true }})

    let new_tattoo = new Tattoo()
    new_tattoo['owner'] = body.user_id

    await User.updateOne({ _id : body.user_id }, {$push : { tattoos : new_tattoo['_id'] }})
    await Tattooist.updateOne({ _id : body.tattooist_id }, {$push : { artworks : new_tattoo['_id'] }})

    const user = await User.findOne({ _id : body.user_id })
    const tattooist = await Tattooist.findOne({ _id : body.tattooist_id })
    const reservation = await Reservation.findOne({ _id : params.id })

    let blockchain_params = {
        owner_info : {
            id : user['_id'],
            nickname : user['nickname']
        }
    }
    await blockchain.invoke("newTattoo", new_tattoo['_id'], blockchain_params)

    blockchain_params['tattooist_info'] = { id : tattooist['_id'], nickname : tattooist['nickname']}
    blockchain_params['cost'] = reservation['cost']
    blockchain_params['image'] = reservation['image']
    blockchain_params['body_part'] = reservation['body_part']
    blockchain_params['inks'] = body['inks']
    blockchain_params['niddle'] = body['niddle']
    blockchain_params['depth'] = body['depth']
    blockchain_params['machine'] = body['machine']

    await blockchain.invoke("startTattoo", new_tattoo['_id'], blockchain_params)

    return new_tattoo['_id']
}
exports.finishProcedure = async function(params, body) {
    const tattooist = await Tattooist.findOne({ _id : body.tattooist_id })
    const reservation = await Reservation.findOne({ _id : params.id })

    const blockchain_params = {
        tattooist_info : {
            id : tattooist['_id'],
            nickname : tattooist['nickname'],
        },
        cost : reservation['cost'],
        image : reservation['image'],
        body_part : reservation['body_part'],
        inks : body['inks'],
        niddle : body['niddle'],
        depth : body['depth'],
        machine : body['machine']
    }

    await blockchain.invoke("endTattoo", body.tattoo_id, blockchain_params)

    await Reservation.deleteOne({ _id : params.id })
}