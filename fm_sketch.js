// Food Projector Section

let img;
let newWidth = 10;
let slider;

function preload() {
  img = loadImage("egg.png");
  slider = createSlider(1, 100, newWidth, 1)
}

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  newWidth = slider.value();
  background(220);
  // create a blank new image
  let sample = createImage(newWidth, newWidth);
  sample.copy(img, 0, 0, img.width, img.height, 0, 0, newWidth, newWidth);
  sample.loadPixels();

  image(sample, 0, 0);

  let diam = width / newWidth;

  for (let y = 0; y < sample.height; y++) {
    for (let x = 0; x < sample.width; x++) {
      let pixel = (x + y * sample.width) * 4;
      let r = sample.pixels[pixel];
      let g = sample.pixels[pixel + 1];
      let b = sample.pixels[pixel + 2];
      fill(r, g, b);
      square(x * diam, y * diam, diam);
    }
  }
}