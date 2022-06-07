
exports.register = function(body, res) {
    res.send('register hello')
}

exports.login = function(body, res) {
    res.send('login hello')
}

exports.entry = function(res) {
    res.render('entry')
}