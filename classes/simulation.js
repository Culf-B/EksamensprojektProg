class Simulation extends Window
{
    constructor(v0, g, a)
    {
        super(width / 2, 0, width / 2, height / 2, {}, [0, 0, 0]);

        // Var setup
        this.t = 0;
        this.v0 = v0;
        this.g = g;
        this.a = a;

        // Calculate end x position
        this.xEnd = ((pow(this.v0, 2) * sin(2 * this.a)) / this.g);

        // Calculate max height
        this.yMax = pow((this.v0 * sin(this.a)), 2) / (2 * this.g);

        // Create ball
        this.ball = new Ball(this.v0, this.g, this.a);
    }

    update()
    {
        
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