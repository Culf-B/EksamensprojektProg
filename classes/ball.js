class Ball {
    constructor(v0, g, a, windVelocity, surfaceWidth, endX, surfaceHeight, maxY, horizontalScaling = true)
    {
        // Vars setup
        this.v0 = v0;
        this.g = g;
        this.a = a;
        this.windVelocity = windVelocity;
        this.v0x = this.v0 * cos(this.a) + this.windVelocity;
        this.v0y = this.v0 * sin(this.a);

        this.vX = this.v0x; // Constant velocity on x-axis until landing
        this.vY = this.v0y; // Not constant, but they are the same at t = 0

        this.r = 10;

        this.horizontalPixelRatio = (surfaceWidth - this.r * 2) / endX;
        this.verticalPixelRatio = (surfaceHeight - this.r * 2) / maxY;

        if (horizontalScaling)
        {
            this.verticalPixelRatio = this.horizontalPixelRatio;
        }

        this.x = 0;
        this.y = 0;

        this.landed = false;
    }

    // Update position on screen and account for scaling
    updatePos(t, surface, endX)
    {
        this.x = this.v0x * t;
        this.y = (0.5 * this.g * pow(t, 2) + this.v0y * t) * this.verticalPixelRatio;
        this.y += surface.height - this.r
        if (this.x > endX)
        {
            this.x = endX;
            this.y = surface.height - this.r;
            this.vX = 0;
            this.landed = true;
        }

        // Convert position to fit axis scaling (Done for y in previous calculation)
        this.x *= this.horizontalPixelRatio;

        this.x += this.r
    }

    // Update velocity on y axis
    updateVelY(t)
    {
        if (!this.landed)
        {
            this.vY = this.g * t + this.v0y;
        }
        else
        {
            this.vY = 0;
        }
    }

    draw(surface)
    {
        surface.push();

        // Draw ball
        surface.stroke(0);
        surface.fill(255);
        surface.circle(this.x, this.y, this.r * 2);

        // Draw x and y vel indicators and account for scaling
        surface.strokeWeight(3);
        surface.stroke(100, 255, 100);
        surface.line(this.x, this.y, this.x + this.vX * this.horizontalPixelRatio, this.y);
        surface.stroke(255, 100, 100);
        surface.line(this.x, this.y, this.x, this.y + this.vY * this.verticalPixelRatio);

        // Draw direction vector
        surface.stroke(255, 255, 100)
        surface.line(this.x, this.y, this.x + this.vX * this.horizontalPixelRatio, this.y + this.vY * this.verticalPixelRatio)

        surface.pop()
    }
}