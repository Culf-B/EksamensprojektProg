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

        // Create ball
        this.ball = new Ball(this.v0, this.g, this.a);

        // Add ball to window grapics so it can be drawn by window
        this.graphics = [{type: "classObject", object: this.ball}];
    }

    update()
    {
        let delta = deltaTime / 100;
        this.t += delta;
        this.ball.updatePos(this.t, this.surface, this.xEnd);
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
}