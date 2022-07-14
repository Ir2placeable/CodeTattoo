const guest = require('./logic/guest')
const user = require('./logic/user')
const tattooist = require('./logic/tattooist')

const express = require('express')
const server = express()
const PORT = 3001

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended : true }))

const cors = require('cors');
server.use(cors());

server.get('/', (req, res) => {
    console.log('\n')
    console.log('page : entry')
    console.log('query : ', req.query)

    guest.pageEntry()
        .then(() => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
server.post('/register/user', (req, res) => {
    console.log('\n')
    console.log('command : register user')
    console.log('body : ', req.body)

    guest.userRegister(req.body)
        .then(() => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
server.post('/register/tattooist', (req, res) => {
    console.log('\n')
    console.log('command : register tattooist')
    console.log('body : ', req.body)

    guest.tattooistRegister(req.body)
        .then(() => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
server.post('/login/user', (req, res) => {
    console.log('\n')
    console.log('command : user login')
    console.log('body : ', req.body)

    guest.userLogin(req.body)
        .then((returned) => {
            res.send({ success : true, user_info : returned })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
server.post('/login/tattooist', (req, res) => {
    console.log('\n')
    console.log('command : tattooist login')
    console.log('body : ', req.body)

    guest.tattooistLogin(req.body)
        .then((returned) => {
            res.send({ success : true, tattooist_info : returned })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
server.post('/sign-out/user', (req, res) => {
    console.log('\n')
    console.log('command : user sign-out')
    console.log('body : ', req.body)

    guest.userSignOut(req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
server.post('/sign-out/tattooist', (req, res) => {
    console.log('\n')
    console.log('command : tattooist sign-out')
    console.log('body : ', req.body)

    guest.tattooistSignOut(req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})


server.get('/drafts/:filter/:page', (req, res) => {
    console.log('\n')
    console.log('page : Draft')
    console.log('params : ', req.params)
    console.log('query : ', req.query)

    guest.pageDraft(req.params, req.query)
        .then((returned) => {
            res.send({ success : true, count : returned.count, drafts : returned.return_value })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
server.get('/drafts/:id', (req, res) => {
    console.log('\n')
    console.log('page : Draft detail')
    console.log('params : ', req.params)

    guest.pageDraftDetail(req.params)
        .then((returned) => {
            res.send({ success : true, draft : returned })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
server.get('/tattooists/:filter/:page', (req, res) => {
    console.log('\n')
    console.log('page : Tattooist')
    console.log('params : ', req.params)
    console.log('query : ', req.query)

    guest.pageTattooist(req.params, req.query)
        .then((returned) => {
            res.send({ success : true, count : returned.count, tattooists : returned.return_value })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
server.get('/tattooists/:id', (req, res) => {
    console.log('\n')
    console.log('page : Tattooist detail')
    console.log('params : ', req.params)

    guest.pageTattooistDetail(req.params)
        .then((returned) => {
            res.send({ success : true, tattooist : returned })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})


server.get('/user/my-page/:id', (req, res) => {
    console.log('\n')
    console.log('page : User My page')
    console.log('params : ', req.params)

    user.pageMyPage(req.params)
        .then((returned) => {
            res.send({ success : true, user_info : returned })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
server.patch('/user/my-page/:id', (req, res) => {
    console.log('\n')
    console.log('command : User Info Edit')
    console.log('params : ', req.params)
    console.log('body : ', req.body)

    user.userInfoEdit(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
server.post('/user/my-page/:id', (req, res) => {
    console.log('\n')
    console.log('command : User Image Edit')
    console.log('params : ', req.params)
    console.log('body : ', req.body)

    user.userImageEdit(req.params, req.body)
        .then((returned) => {
            res.send({ success : true })
        })
        .catch((err) => {
            res.send({ success : false, code : err })
        })
})
server.get('/', (req, res) => {

})
server.get('/', (req, res) => {

})

server.listen(PORT, () => {
    console.log('server opened')
})
