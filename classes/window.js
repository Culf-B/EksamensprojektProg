class Window
{
    constructor(x, y, width, height, graphics, bgColor)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.surface = createGraphics(width, height);
        this.graphics = graphics;
        this.bgColor = bgColor
    }

    updateGraphics()
    {
        this.graphics.forEach(obj => {
            if (obj.type == "classObject")
            {
                obj.object.draw(this.surface);
            }
            else
            {
                this.surface.fill(obj.color[0], obj.color[1], obj.color[2]);
                this.surface.stroke(obj.color[0], obj.color[1], obj.color[2]);
                if (obj.type == "text")
                {
                    this.surface.text(obj.text, obj.x, obj.y);
                }
                else if (obj.type == "line")
                {
                    this.surface.line(obj.x1, obj.y1, obj.x2, obj.y2);
                }
            }
        });
    }

    drawWindow()
    {
        this.surface.background(this.bgColor);
        this.updateGraphics()
        image(this.surface, this.x, this.y);
    }
}