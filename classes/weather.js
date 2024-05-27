class Weather
{
    constructor() 
    {
        this.stationFound = false;
        this.windDataUpdateTime = 0;
        this.windSpeed = 0;
        this.apiKey = "6769b06c-16f3-4672-a562-0c4332701c80"

        this.setup();
    }

    async setup()
    {
        this.position = await this.getPosition();
        this.stations = await this.getAllStations();
        this.station = await this.findClosestStation(this.position, this.stations);
        this.stationFound = true;
    }

    sleep(sleepTimeMs)
    {
        return new Promise(resolve => setTimeout(resolve, sleepTimeMs));
    }

    async getWindData()
    {
        if (this.windDataUpdateTime + 10000 < Date.now())
        {
            while (!this.stationFound)
            {
                console.log("Waiting for station...");
                await this.sleep(1000);
            }

            this.windDataUpdateTime = Date.now();
            this.windSpeed = await this.getWindSpeedFromStation(this.station.id)
        }
        
        return this.windSpeed;
    }

    async getWindSpeedFromStation(stationId)
    {
        console.log("Retrieving wind speed from station " + stationId + "...");
        this.windSpeedResponse = await fetch(
            "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?period=latest-10-minutes&parameterId=wind_speed&limit=1&api-key=" + this.apiKey + "&stationId=" + stationId
        );
        this.windSpeedResponseJson = await this.windSpeedResponse.json();
        this.processedWindSpeedResponse = this.windSpeedResponseJson.features[0].properties.value;
        return this.processedWindSpeedResponse;
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
        // Set to default position of getCurrentPosition returns undefined
        if (this.position == undefined) {
            this.position = [56.1558484, 10.187535];
        }
    }

    async getAllStations()
    {
        console.log("Requesting stations...");
        this.stationResponse = await fetch(
            "https://dmigw.govcloud.dk/v2/metObs/collections/station/items?status=Active&api-key=" + this.apiKey + "&type=Synop"
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
