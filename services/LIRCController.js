var lirc = require('lirc_node')

lirc.init()

lirc.addListener((data) => {
    console.log(data)
})

module.exports = lirc
