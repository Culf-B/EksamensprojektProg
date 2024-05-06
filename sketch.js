function setup() {
  createCanvas(400, 400);

  settings = new Settings(
    createSlider(0, 90, 45, 1),
    createSlider(),
    createSlider()
  )

}

function draw() {
  background(220);
  g = tyndeacceleration.value();
}