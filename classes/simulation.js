class Simulation extends Window
{
    constructor(v0, g, a, windSpeed, windDir)
    {
        super(width / 3, 0, (width / 3) * 2, height, [], [150, 170, 255]);

        // Var setup
        this.t = 0;
        this.v0 = v0;
        this.g = g;
        this.a = -a;
        this.windVelocity = windSpeed * windDir;
        console.log("Windspeed: " + this.windVelocity + "m/s");

        // Calculate end x position
        this.endTime = (2 * this.v0 * sin(-this.a)) / this.g;
        this.xEnd = (this.v0 * cos(this.a) + this.windVelocity) * this.endTime;

        // Calculate max height
        this.yMax = pow((this.v0 * sin(this.a)), 2) / (2 * this.g);

        // Create x and y axis visualization
        this.xAxis = new Axis(
            0, this.surface.height - 20, this.surface.width, 20,
            0, round(this.xEnd, 1), 0, false
        );
        this.yAxis = new Axis(
            0, 0, 20, this.surface.height,
            round(this.xEnd, 1), 0, 1
        );

        this.endTime = (2 * this.v0 * sin(-this.a)) / this.g;

        // Create ball
        this.ball = new Ball(this.v0, this.g, this.a, this.windVelocity, this.surface.width, this.xEnd, this.surface.height, this.yMax, this.endTime);

        // Add ball to window grapics so it can be drawn by window
        this.graphics = [
            {type: "classObject", object: this.ball},
            {type: "classObject", object: this.xAxis},
            {type: "classObject", object: this.yAxis}
        ];

        this.windSpeedText = new updateableTxt("Vind Hastighed: " + this.windVelocity + "m/s", 270, 10);
        this.addGraphicsObject(this.windSpeedText);
        this.update(0);
    }

    update(timeStep = undefined)
    {
        this.windSpeedText.updateText("Vind Hastighed: " + this.windVelocity + "m/s");  
        if (timeStep != undefined)
        {
            this.t += timeStep;
        }
        else
        {
            let delta = deltaTime / 1000; // Get deltatime in seconds
            this.t += delta;
        }

        if (this.t > this.endTime) {
            this.t = this.endTime;
        }

        this.ball.updatePos(this.t, this.surface, this.xEnd);
        this.ball.updateVelY(this.t);
    }

    getWindSpeed()
    {
        return this.windSpeed;
    }

    setTime(newTime)
    {
        this.t = newTime;
    }

    getCurrentTime()
    {
        return this.t;
    }

    getEndtime()
    {
        return this.endTime;
    }
}