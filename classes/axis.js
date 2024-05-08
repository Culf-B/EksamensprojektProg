class Axis
{
    constructor(drawBoxX, drawBoxY, drawBoxWidth, drawBoxHeight, axisStart, axisEnd, direction = 0, startText = true, endText = true)
    {
        // Boundary on surface
        this.drawBoxX = drawBoxX;
        this.drawBoxY = drawBoxY;
        this.drawBoxWidth = drawBoxWidth;
        this.drawBoxHeight = drawBoxHeight;

        // Start and endpoints for axis
        this.axisStart = axisStart;
        this.axisEnd = axisEnd;
        
        this.direction = direction; // 0 = horizontal, 1 = vertical

        this.startText = startText;
        this.endText = endText;
    }

    draw(surface)
    {
        textAlign(LEFT, TOP);

        if (this.direction == 0)
        {
            this.drawHorizontal(surface);
        }
        else 
        {
            this.drawVertical(surface);
        }
   }

   drawHorizontal(surface)
   {
        // Axisline
        surface.line(
            this.drawBoxX,
            this.drawBoxY + this.drawBoxHeight,
            this.drawBoxX + this.drawBoxWidth,
            this.drawBoxY + this.drawBoxHeight
        );

        // Vertical start line
        surface.line(
            this.drawBoxX,
            this.drawBoxY,
            this.drawBoxX,
            this.drawBoxY + this.drawBoxHeight
        );

        // Vertical end line
        surface.line(
            this.drawBoxX + this.drawBoxWidth,
            this.drawBoxY,
            this.drawBoxX + this.drawBoxWidth,
            this.drawBoxY + this.drawBoxHeight
        );
        
        if (this.startText)
        {
            // Axis start text
            surface.text(
                this.axisStart,
                this.drawBoxX + 5,
                this.drawBoxY + textAscent()
            );
        }
        
        // Axis end text
        if (this.endText)
        {
            surface.text(
                this.axisEnd,
                this.drawBoxX + this.drawBoxWidth - textWidth(this.axisEnd) - 5,
                this.drawBoxY + textAscent() - 2
            );
        }
        
   }
   drawVertical(surface)
   {
        // Axisline
        surface.line(
            this.drawBoxX,
            this.drawBoxY,
            this.drawBoxX,
            this.drawBoxY + this.drawBoxHeight
        );

        // Horizontal start line
        surface.line(
            this.drawBoxX,
            this.drawBoxY,
            this.drawBoxX + this.drawBoxWidth,
            this.drawBoxY
        );

        // Horizontal end line
        surface.line(
            this.drawBoxX,
            this.drawBoxY + this.drawBoxHeight,
            this.drawBoxX + this.drawBoxWidth,
            this.drawBoxY + this.drawBoxHeight
        );
        
        // Axis start text
        if (this.startText)
        {
            surface.text(
                this.axisStart,
                this.drawBoxX + 2,
                this.drawBoxY + textAscent()
            );
        }
        
        // Axis end text
        if (this.endText)
        {
            surface.text(
                this.axisEnd,
                this.drawBoxX + 2,
                this.drawBoxY + this.drawBoxHeight - 2
            );
        }        
   }
}