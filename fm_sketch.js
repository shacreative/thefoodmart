// Food Projector Section

let img;
let newWidth = 10;
let slider;
let sliderMin;
let sliderMax;
let sliderGap;
let cWidth;
let canvasParent = document.getElementById("p5-script");
let startYear = 2001;

// get the current year and calculate the jump
// const d = new Date();
// let currentYear = d.getFullYear();
// let jump = currentYear - startYear;
let jump = 22;

let originalPrice = 0.39;
let priceIn2023 = 1.4;
let inflation = (priceIn2023 - originalPrice) / originalPrice;
console.log("inflation: ", inflation);
let costPerYear = (originalPrice * 6) / 100;

//let priceIn2023 = 1.40; // Price off eggs in 2023
//let annualInflationRate = 0.1177; // (11.77% is Average annual inflation rate from 2001 to 2023
//let costPerDecade = originalPrice * annualInflationRate;
//let numberOfYears = 10; // Number of years from 2023 to 2033
//const priceInYear = priceIn2001 * Math.pow((1 + annualInflationRate), years);

let priceElement;

function preload() {
  img = loadImage("Pixel_fried_Egg_Final.png");
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
  sliderMin = slider.elt.getAttribute("min");
  sliderMax = slider.elt.getAttribute("max");
}

function draw() {
  newWidth = sliderMax - slider.value();
  if (newWidth == 0) newWidth = 1;

  // console.log(Math.pow(1 + inflation, slider.value() / 10));
  let newPrice = originalPrice * Math.pow(1 + inflation, slider.value() / 10);
  // change the price
  let price = originalPrice + (slider.value() * costPerYear) / 10;
  // round to 2 decimal places
  price = Math.round(price * 100) / 100;
  // add trailing zeros
  price = price.toFixed(2);
  priceElement.html(newPrice.toFixed(2));

  yearElement.html(startYear + (slider.value() / 10) * jump);

  let valueInfo = ["Plenty", "Sufficient", "Limited", "Rare", "Super Rare"];
  let valueIndex;

if (slider.value() === 0) {
  valueIndex = 0; // "Plenty" on first step
} else if (slider.value() === 10) {
  valueIndex = 1; // "Sufficient" on second step
} else {
  let numRemainingSteps = valueInfo.length - 2;
  let remainingStepSize = (sliderMax - 10) / numRemainingSteps;
  let remainingStepIndex = Math.floor((slider.value() - 10) / remainingStepSize);
  
  // Ensure that remainingStepIndex is within the bounds of the remaining steps
  remainingStepIndex = Math.min(remainingStepIndex, numRemainingSteps - 1);
  
  valueIndex = remainingStepIndex + 2;
}

valueElement.html(valueInfo[valueIndex]);
  

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
