var express = require('express')
var router = express.Router()

const {exec} = require('child_process')
var LIRC = require('../services/LIRCController')
var StateManager = require('../services/StateManager')

// API
router.get('/get_state', (req, res) => {
    console.log("API:: SENDING STATE")
    // console.log(StateManager.state)
    res.send(StateManager.state)
})

router.post('/power', (req, res) => {
    let newState = req.query.state

    switch (newState) {
        case "true":
        case "on":
            StateManager.UpdatePower(true)
            console.log("API:: POWERING " + newState.toUpperCase())
            send_command("AC_ON")
            break;
        case "false":
        case "off":
            StateManager.UpdatePower(false)
            console.log("API:: POWERING " + newState.toUpperCase())
            send_command("AC_OFF")
            break;
        default:
            console.log("API:: POWER INVALID PARAM: " + newState) 
            break;
    }
    res.sendStatus(200)
})

router.post('/change_mode', (req, res) => {
    StateManager.UpdateMode(StateManager.GetNextMode())
    
    send_command(buildCommand())
    return res.sendStatus(200)
})

router.post('/temp', (req, res) => {
    let delta = req.query.delta
    StateManager.UpdateTemp(StateManager.state.temp + Number(delta))
    if (delta > 0) 
        console.log("API:: TEMP INCREASE")
    else 
        console.log("API:: TEMP DECREASE")

    send_command(buildCommand())
    return res.sendStatus(200)
})

/**
 * This will create the correct key command from the current state
 */
function buildCommand() {
    let s = StateManager.state
    let command = `${s.mode.toUpperCase()}_${s.speed.toUpperCase()}_${s.temp}`
    return command
}

/**
 * Send a irsend SEND_ONCE command to the IR LED
 * @param {string} command The key command to send
 * @param {function} callback callback function in case of errors
 */
function send_command(command, callback) {
    exec("irsend SEND_ONCE lg_ac " + command, (err, out, stderr) => {
        if (err) console.log(err);
    })
}

module.exports = router