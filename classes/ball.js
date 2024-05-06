class Ball {
    constructor(v0, g, a)
    {
        // Vars setup
        this.v0 = v0;
        this.g = g;
        this.a = a;
        this.v0x = this.v0 * cos(this.a);
        this.v0y = this.v0 * sin(this.a);

        this.x = 0;
        this.y = 0;
        
        this.r = 10;
    }

    updatePos(t)
    {
        this.x = this.v0x * t;
        this.y = 0.5 * (-this.g) * pow(t, 2) + this.v0y * t;
    }

    draw(surface)
    {
        surface.stroke(0);
        surface.fill(255);

        surface.circle(tihs.x, this.y, this.r * 2);
    }
}