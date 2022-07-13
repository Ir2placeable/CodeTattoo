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

})
server.post('/register/user', (req, res) => {

})
server.post('/register/tattooist', (req, res) => {

})
server.post('/login/user', (req, res) => {

})
server.post('/login/tattooist', (req, res) => {

})
server.post('/sign-out/user', (req, res) => {

})
server.post('/sign-out/tattooist', (req, res) => {

})


server.get('/drafts/:filter/:page', (req, res) => {

})
server.get('/drafts/:id', (req, res) => {

})
server.get('/tattooists/:filter/:page', (req, res) => {

})
server.get('/tattooists/:id', (req, res) => {

})


server.get('/', (req, res) => {

})
server.get('/', (req, res) => {

})
server.get('/', (req, res) => {

})
server.get('/', (req, res) => {

})
server.get('/', (req, res) => {

})
