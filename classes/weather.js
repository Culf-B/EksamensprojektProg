class Weather
{

    constructor() 
    {
        this.setup();
    }

    async setup()
    {
        this.position = await this.getPosition();
        this.stations = await this.getAllStations();
        this.station = await this.findClosestStation(this.position, this.stations);
        console.log(this.station);
        await this.getDataFromStation();
    }

    async getDataFromStation()
    {
        this.windSpeedResponse = await fetch(
            "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?period=latest-10-minutes&parameterId=wind_speed&limit=1&api-key=api-key=6769b06c-16f3-4672-a562-0c4332701c80&stationId=" + this.station.id,
            {
                method: "GET"
            }
        );
        console.log(this.windSpeedResponse);
    }

    async findClosestStation(position, stations)
    {
        console.log("Finding closest station...");
        this.closestStation = {
            "id": "",
            "distance": Infinity
        };

        await stations.forEach(station => {
            
            this.currentDistance = this.calcDistance(position[0], position[1], station.position[0], station.position[1])

            if (this.currentDistance < this.closestStation.distance)
            {
                this.closestStation = {
                    "id": station.id,
                    "distance": this.currentDistance
                } 
            } 
        });
        return this.closestStation;
    }

    calcDistance(x1, y1, x2, y2)
    {
        return sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
    }

    async getPosition()
    {
        console.log("Requesting position data...");
        await navigator.geolocation.getCurrentPosition(
            (position) => {
                this.position = [position.coords.longitude, position.coords.latitude];
            },
            (err) => {
                this.position = [56.1558484, 10.187535]; // Default position Aarhus dollerupvej 2
                console.error(err);
            },
            {
                "timeout": 5000,
                "maximumAge": Infinity
            }
        );
    }

    async getAllStations()
    {
        console.log("Requesting stations...");
        this.stationResponse = await fetch(
            "https://dmigw.govcloud.dk/v2/metObs/collections/station/items?status=Active&api-key=6769b06c-16f3-4672-a562-0c4332701c80&type=Synop"
        )
        this.stationResponseJson = await this.stationResponse.json();

        this.stationArray = this.stationResponseJson.features;

        this.processedStations = [];

        await this.stationArray.forEach(station => {
            if (station.properties.validTo == null && station.properties.operationTo == null){
                this.processedStations.push(
                    {
                        "id": station.properties.stationId,
                        "position": station.geometry.coordinates
                    }
                );
            }
        });
        return this.processedStations;

    }
}
