class Ball {
    constructor(v0, g, a, surfaceWidth, endX, surfaceHeight, maxY)
    {
        // Vars setup
        this.v0 = v0;
        this.g = g;
        this.a = a;
        this.v0x = this.v0 * cos(this.a);
        this.v0y = this.v0 * sin(this.a);

        this.r = 10;

        print(maxY)

        this.horizontalPixelRatio = (surfaceWidth - this.r * 2) / endX;
        this.verticalPixelRatio = (surfaceHeight - this.r * 2) / maxY;

        this.x = 0;
        this.y = 0;
    }

    updatePos(t, surface, endX)
    {
        this.x = this.v0x * t;
        this.y = (0.5 * this.g * pow(t, 2) + this.v0y * t) * this.verticalPixelRatio;
        this.y += surface.height - this.r
        if (this.x > endX)
        {
            this.x = endX;
            this.y = surface.height - this.r;
        }

        // Convert position to fit axis scaling (Done for y in previous calculation)
        this.x *= this.horizontalPixelRatio;

        this.x += this.r
        print(this.x, this.y);
    }

    draw(surface)
    {
        surface.stroke(0);
        surface.fill(255);

        surface.circle(this.x, this.y, this.r * 2);
    }
}