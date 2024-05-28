class updateableTxt
{
    constructor(text, x, y, color = [0, 0, 0])
    {
        this.text = text;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    updateText(newText)
    {
        this.text = newText;
    }

    updatePos(newX, newY)
    {
        this.x = newX;
        this.y = newY;
    }

    getPos()
    {
        return [this.x, this.y];
    }

    draw(surface)
    {
        surface.push();
        surface.fill(this.color[0], this.color[1], this.color[2]);
        surface.strokeWeight(0.5);
        surface.stroke(this.color[0], this.color[1], this.color[2]);
        surface.text(this.text, this.x, this.y);
        surface.pop();
    }
}