const {User} = require("../DBModel/User");
const {Tattooist} = require("../DBModel/Tattooist");


exports.getProfile = async function(params) {
    let nickname
    let image

    if (params.type === 'user') {
        const user = await User.findOne({ _id : params.id })
        if (!user) { throw 1 }

        nickname = user['nickname']
        image = user['image']
    } else if (params.type === 'tattooist') {
        const tattooist = await Tattooist.findOne({ _id : params.id })
        if (!tattooist) { throw 1 }

        nickname = tattooist['nickname']
        image = tattooist['image']
    } else {
        throw 6
    }

    return {nickname, image}
}