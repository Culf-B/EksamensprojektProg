function setup() {
  createCanvas(400, 400);
  //sliders for values
  tyndeacceleration = createSlider(0, 90 , 45, 1);
  tyndeacceleration.position();
  tyndeacceleration.size();

}

function draw() {
  background(220);
  g = tyndeacceleration.value();
}