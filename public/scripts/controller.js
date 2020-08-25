$(document).ready(() => {

    $.get("/api/get_state", (state) => {
            
        $("#power_btn").click(() => {
            $.post(`/api/power?state=${!state.power}`, () => {
                GetState()
            })
        })

        $("#mode_btn").click(() => {
            $.post('/api/change_mode', () => {
                GetState()
            })
        })

        $("#increase_temp").click(() => {
            UpdateTemp(1)
        })

        $("#decrease_temp").click(() => {
            UpdateTemp(-1)
        })
    })
});

function UpdateTemp(delta) {
    $.post(`/api/temp?delta=${delta}`, () => {
        GetState()
    })
}

function GetState() {
    $.get('/api/get_state', (state) => {
        $("#current_state").text(state.temp + " " + state.mode + " " + state.speed)
        if (state.power) {
            $("#power_btn").removeClass("btn-danger")
            $("#power_btn").addClass("btn-success")
        } else {
            $("#power_btn").addClass("btn-danger")
            $("#power_btn").removeClass("btn-success")
        }
    })
}