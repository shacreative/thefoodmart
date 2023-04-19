// Food Projector Section

let img;
let newWidth = 10;
let slider;
let cWidth;
let canvasParent = document.getElementById("p5-script");

let originalPrice = 49;
let costPerYear = (originalPrice * 6) / 100;

let priceElement;

function preload() {
  img = loadImage("egg.png");
  // slider = createSlider(1, 100, newWidth, 1)
}

function setup() {
  calculateCanvas();
  let foodprojector = createCanvas(cWidth, cWidth);
  foodprojector.parent("p5-script");
  noStroke();
  slider = select("#yeardate");
  // slider.style("width", cWidth + "px");
  priceElement = select("#price-number");
}

function draw() {
  let max = slider.elt.getAttribute("max");
  newWidth = max - slider.value();
  if (newWidth == 0) newWidth = 1;

  // change the price
  let price = originalPrice + (slider.value() * costPerYear) / 10;
  // round to 2 decimal places
  price = Math.round(price * 100) / 100;
  // add trailing zeros
  price = price.toFixed(2);
  priceElement.html(price);

  clear();
  // create a blank new image
  let sample = createImage(newWidth, newWidth);
  sample.copy(img, 0, 0, img.width, img.height, 0, 0, newWidth, newWidth);
  sample.loadPixels();

  // image(sample, 0, 0, width, height);

  let diam = width / newWidth;

  for (let y = 0; y < sample.height; y++) {
    for (let x = 0; x < sample.width; x++) {
      let pixel = (x + y * sample.width) * 4;
      let r = sample.pixels[pixel];
      let g = sample.pixels[pixel + 1];
      let b = sample.pixels[pixel + 2];
      let a = sample.pixels[pixel + 3];
      fill(r, g, b);
      // stroke(r, g, b);
      // strokeWeight(1);
      if (a > 0) {
        square(x * diam, y * diam + 1, diam + 1);
      }
    }
  }
}

function windowResized() {
  calculateCanvas();
  resizeCanvas(cWidth, cWidth);
}

function calculateCanvas() {
  cWidth = canvasParent.offsetWidth;
  canvasParent.style.height = cWidth + "px";
}
