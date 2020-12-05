
class Renderer{

    constructor(){
        this.source = $("#cities-template").html()
        this.template = Handlebars.compile(this.source)
    }

    renderData(cityData){
        const cities = {cityData}
        const citiesHTML = this.template(cities)
        $('#cities-container').empty().append(citiesHTML)
    }
}