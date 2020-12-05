const manager = new dataManager()
const renderer = new Renderer()

const loadPage = async function () {
    await manager.getDataFromDB()
    renderer.renderData(manager.cityData)
}

const handleSearch = async function () {
    const city = $('#input').val()
    $("#input").val("")
    if (city === '') {
        return
    }
    await manager.getCityData(city)
    renderer.renderData(manager.cityData)
}

const saveCity = function (save) {
    const city = $(save).closest('.city').find('.name').text()
    $(save).text('-')
    $(save).removeClass("saveBtn")
    $(save).addClass("remBtn")
    manager.saveCity(city)
}

const removeCity = function (remove) {
    const city = $(remove).closest('.city').find('.name').text()
    $(remove).text('+')
    $(remove).removeClass("remBtn")
    $(remove).addClass("saveBtn")
    manager.removeCity(city)
}

loadPage()