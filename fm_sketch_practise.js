// Food Projector Section

let img;
let newWidth = 10;
let slider;
let cWidth;
let canvasParent = document.getElementById("p5-script");
let startYear = 2001;
const d = new Date();
let currentYear = d.getFullYear();

let jump = currentYear - startYear;
console.log(jump);
let originalPrice = 0.39; // Price of eggs in 2001
//let priceIn2023 = 1.40; // Price off eggs in 2023
//let annualInflationRate = 0.1177; // (11.77% is Average annual inflation rate from 2001 to 2023
//let costPerDecade = originalPrice * annualInflationRate;
//let numberOfYears = 10; // Number of years from 2023 to 2033
//const priceInYear = priceIn2001 * Math.pow((1 + annualInflationRate), years);
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
  yearElement = select("#projector-info-year");
  valueElement = select("#projector-info-rarity");
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

  // Change the Year Info

  let yearInfo = {
    1: "2001",
    2: "2023",
    [3]: "2033",
    [4]: "2043",
    [5]: "2053",
    [6]: "2063",
    [7]: "2073",
    [8]: "2083",
    [9]: "2093",
    [10]: "2103",
  };

  yearElement.html(startYear);

  // Change Product Value Info

  let valueInfo = {
    [1]: "Common",
    [4]: "Sufficient",
    [6]: "Limited",
    [8]: "Super Rare",
  };

  valueElement.html(valueInfo);

  //background of canvas
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
