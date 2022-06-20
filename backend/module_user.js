const {User} = require("./model/User")

exports.register = async function(body, res) {
    const isExisted = await User.findOne({ email : body.email })
    if (isExisted) {
        res.send({ success : false, error : 'email is already existed'})
        return
    }

    const new_user = new User(body)
    await new_user.save()

    res.send({ success : true })
}

exports.login = async function(body, res) {
    const user = await User.findOne({ email : body.email })
    if (!user) {
        res.send({ success : false, error : 'wrong email'})
        return
    }

    user.comparePassword(body.pwd, (err, isMatch) => {
        if (!isMatch) {
            res.send({ success : false, error : 'wrong password'})
            return
        }

        const user_info = {
            user_id : String(user._id),
            name : user.name,
            location : user.location,
            isTattooist : user.isTattooist
        }
        res.send({ success : true, user_info : user_info})
    })
}

exports.userInfo = async function(query, res) {
    const user = await User.findOne({ _id : query.user_id })

    const user_info = {
        name : user.name,
        location : user.location,
        isTattooist : user.isTattooist
    }
    const profile = {
        description : user.profile.description,
        image : user.profile.image
    }
    res.send({ success : true, name : user.name, location : user.location, isTattooist})
}