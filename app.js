const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
var StateManager = require('./services/StateManager')
var lirc = require('./services/LIRCController')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

// Routes
var index = require('./routes/index')
var api = require('./routes/api')
app.use('/', index)
app.use('/api', api)

// View engine
app.set('view engine', 'pug')
app.set('views', './views')

app.listen(port, () => {
    console.log('Listening on ' + port)
})