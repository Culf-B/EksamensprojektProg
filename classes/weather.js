class Weather
{

    constructor() 
    {
        navigator.geolocation.getCurrentPosition(this.getposition.bind(this));

    }

    getposition(position)
    {
        var lat = position.coords.latitude
        var lon = position.coords.longitude
        console.log(lat, lon)
    }
    s

}
