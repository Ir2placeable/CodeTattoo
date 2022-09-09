const {User} = require("../DBModel/User");
const {Tattooist} = require("../DBModel/Tattooist");
const {Reservation} = require("../DBModel/Reservation")

exports.getProfile = async function(params, query) {
    let profile
    let reservation_id
    let confirmed

    const user = await User.findOne({ _id : query.user_id })
    if (!user) { throw 1 }
    const tattooist = await Tattooist.findOne({ _id : query.tattooist_id })
    if (!tattooist) { throw 2 }

    if (params.type === 'user') {
        profile = {
            nickname : tattooist['nickname'],
            image : tattooist['image']
        }
    } else if (params.type === 'tattooist') {
        profile = {
            nickname : user['nickname'],
            image : user['image']
        }
    } else { throw 6 }

    const reservation = await Reservation.findOne({ customer_id : query.user_id, tattooist_id : query.tattooist_id })
    if (!reservation) { throw 4 }

    reservation_id = reservation['_id']
    confirmed = reservation['confirmed']

    return {profile, reservation_id, confirmed}
}