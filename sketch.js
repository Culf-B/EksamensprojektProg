function setup() {
  createCanvas(400, 400);

  settings = new Settings(
    createSlider(0, 100, 9.82, 0.1),
    createSlider(1, 100, 10, 1),
    createSlider(0, 90, 45, 1)
  )

}

function draw() {
  background(220);
  
  settings.draw();
}