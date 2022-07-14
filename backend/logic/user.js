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