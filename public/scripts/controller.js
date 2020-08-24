$(document).ready(() => {

    $.get("/api/get_state", (state) => {
            
        $("#power_btn").click(() => {
            $.post(`/api/power?state=${!state.power}`, () => {  
                window.location.reload()
            }).error(e => {
                console.error(e)
            })
        })

        $("#mode_btn").click(() => {
            $.post('/api/change_mode', () => {
                window.location.reload()
            }).error(e => {
                console.error(e)
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
        window.location.reload()
    })
}