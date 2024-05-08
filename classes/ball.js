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

    updatePos(t, surface, endX)
    {
        this.x = this.v0x * t;
        this.y = 0.5 * this.g * pow(t, 2) + this.v0y * t;
        this.y += surface.height - this.r
        if (this.x > endX)
        {
            this.x = endX;
            this.y = surface.height - this.r;
        }
        this.x += this.r
    }

    draw(surface)
    {
        surface.stroke(0);
        surface.fill(255);

        surface.circle(this.x, this.y, this.r * 2);
    }
}