class Simulation extends Window
{
    constructor(v0, g, a)
    {
        super(width / 2, 0, width / 2, height / 2, [], [150, 170, 255]);

        // Var setup
        this.t = 0;
        this.v0 = v0;
        this.g = g;
        this.a = a;

        // Calculate end x position
        this.xEnd = -((pow(this.v0, 2) * sin(2 * this.a)) / this.g);

        // Calculate max height
        this.yMax = pow((this.v0 * sin(this.a)), 2) / (2 * this.g);

        // Create x and y axis visualization
        this.xAxis = new Axis(
            0, this.surface.height - 20, this.surface.width, 20,
            0, round(this.xEnd, 0), 0, false
        );
        this.yAxis = new Axis(
            0, 0, 20, this.surface.height,
            round(this.yMax, 0), 0, 1
        );

        // Create ball
        this.ball = new Ball(this.v0, this.g, this.a, this.surface.width, this.xEnd, this.surface.height, this.yMax);

        // Add ball to window grapics so it can be drawn by window
        this.graphics = [
            {type: "classObject", object: this.ball},
            {type: "classObject", object: this.xAxis},
            {type: "classObject", object: this.yAxis}
        ];
    }

    update()
    {
        let delta = deltaTime / 100;
        this.t += delta;
        this.ball.updatePos(this.t, this.surface, this.xEnd);
        this.ball.updateVelY(this.t);
    }

    start()
    {

    }

    pause()
    {

    }

    step()
    {

    }
    draw()
    {
        rect(5,5, width/2-5,height/2-5,2.5);
    }
}
