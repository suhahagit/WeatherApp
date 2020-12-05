
class dataManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        const cities = await $.get(`/cities`)
        this.cityData = cities
    }

    async getCityData(cityName) {
        const city = await $.get(`/city/${cityName}`)
        this.cityData.push(city)
    }

    async saveCity(cityName) {
        const city = await this.cityData.find(c => c.name == cityName)
        $.post(`/city`, city)
    }

    removeCity(cityName) {
        $.ajax({
            url: `/city/${cityName}`,
            method: "DELETE",
            success: function () { },
            error: function (xhr, text, error) {
                console.log(text);
            }
        })
    }
}