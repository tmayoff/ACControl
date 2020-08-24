var express = require('express')
var router = express.Router()

var StateManager = require('../services/StateManager')

// Routes
router.get('/', (req, res) => {
    res.render('index', StateManager.state)
})

module.exports = router