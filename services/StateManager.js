var fs = require('fs')

class ACState {
    constructor() {
        this.state = JSON.parse(fs.readFileSync('./ac_state.json'))
        this.states = JSON.parse(fs.readFileSync('./ac_states.json'))
    }

    UpdatePower (power) {
        this.state.power = power

        this.SaveState()
    }

    UpdateMode (mode) {
        this.state.mode = mode
        this.ValidateTemp()
        this.SaveState()
    }

    GetNextMode() {
        let nextIdx = this.GetModeIndex()
        return this.states.modes[(nextIdx + 1) % this.states.modes.length].name
    }

    /**
     * This will update the currently stored temperature to the inputted one
     * @param {number} temp Temperature to set
     */
    UpdateTemp (temp) {
        this.state.temp = temp
        this.ValidateTemp()
        this.SaveState()
    }

    ValidateTemp () {
        let i = this.GetModeIndex()
        if (this.state.temp > this.states.modes[i].max_temp) {
            this.UpdateTemp(this.states.modes[i].max_temp)
        }
        if (this.state.temp < this.states.modes[i].min_temp) {
            this.UpdateTemp(this.states.modes[i].min_temp)
        }
    }
    
    GetModeIndex() {
        let idx = -1
        this.states.modes.forEach((m, i) => {
            if (m.name == this.state.mode) {
                idx = i
                return
            }
        })

        return idx
    }

    SaveState () {
        console.log("UPDATING STATE: ")
        console.log(this.state)
        fs.writeFileSync('ac_state.json', JSON.stringify(this.state));
    }
}

let ACStateInstance = new ACState()

module.exports = ACStateInstance