class Ball {
    constructor(v0, g, a, windVelocity, surfaceWidth, endX, surfaceHeight, maxY, endTime, horizontalScaling = true)
    {
        // Vars setup
        this.v0 = v0;
        this.g = g;
        this.a = a;
        this.windVelocity = windVelocity;
        this.v0x = this.v0 * cos(this.a) + this.windVelocity;
        this.v0y = this.v0 * sin(this.a);
        this.endTime = endTime;

        this.vX = this.v0x; // Constant velocity on x-axis until landing
        this.vY = this.v0y; // Not constant, but they are the same at t = 0

        this.surfaceWidth = surfaceWidth;
        this.surfaceHeight = surfaceHeight;

        this.r = 10;

        this.endX = endX;

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
        // Update self
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
    
    getPosAtTime(t)
    {
        this.xAtTime = this.v0x * t;
        this.yAtTime = (0.5 * this.g * pow(t, 2) + this.v0y * t) * this.verticalPixelRatio;
        this.yAtTime += this.surfaceHeight - this.r
        if (this.xAtTime > this.endX)
        {
            this.xAtTime = this.endX;
            this.yAtTime = this.surfaceHeight - this.r;
        }

        // Convert position to fit axis scaling (Done for y in previous calculation)
        this.xAtTime *= this.horizontalPixelRatio;

        this.xAtTime += this.r

        return [this.xAtTime, this.yAtTime];
    }

    draw(surface)
    {
        // Draw path
        this.tStep = this.endTime / 100;
        for (this.t = 0; this.t < 100; this.t += 2)
        {
            this.pos1 = this.getPosAtTime(this.t * this.tStep);
            this.pos2 = this.getPosAtTime((this.t + 1) * this.tStep)
            surface.line(this.pos1[0], this.pos1[1], this.pos2[0], this.pos2[1]);
        }

        // Draw self
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