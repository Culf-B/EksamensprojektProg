function setup()
{
    angleMode(DEGREES);
    createCanvas(600, 400);
    s = new Settings();
}

function draw()
{
    background(255);
    s.update();
    s.drawWindow();
}