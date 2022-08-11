const ErrorTable = require("../ErrorTable");
const {User} = require("../model/User");
const {Reservation} = require("../model/Reservation")
const imageStorage = require("../module/imageStorage");

exports.createReservation = async function(params, body) {
    const user = await User.findOne({ _id : params.id })
    if (!user) {
        console.log(ErrorTable["10"])
        throw 10
    }

    let new_reservation = new Reservation()

    const imageStorage_params = { title : new_reservation['_id'], image : body.image, mime : body.mime }
    const image_url = await imageStorage.upload(imageStorage_params)

    new_reservation['image'] = image_url
    new_reservation['customer_id'] = params.id
    new_reservation['tattooist_id'] = body.tattooist_id
    new_reservation['cost'] = body.cost

    // 추후 date field 입력 필요함

    await new_reservation.save()
}