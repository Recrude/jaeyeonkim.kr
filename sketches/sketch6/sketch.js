//declare and assign number of rows and columns
var rows = 30;
var columns = 20;

//declare randomColor
var randomColor;

//variables for steps
var stepX;
var stepY;
let frames;
function setup() {
  frameRate(5);
  frameRateSlider = createSlider(1,60,15)
  let frameWords = createElement('Framewords',"frames");
  frameWords.position(150,620);
}

function draw() {

  frameRate(frameRateSlider.value());
  //tiny canvas
  createCanvas(400, 600);
  
  //white background
  background(255);
  
  //draw rectangles from the corner
  rectMode(CORNER);
  
  //no border
  noStroke();
  
  //calculate steps
  stepX = width/columns;
  stepY = height/rows;
  
  //for loop to iterate columns
  for (var i = 0; i < columns; i++) {
    //for loop to iterate rows
    for (var j = 0; j < rows; j++) {
      
      //random gray
      randomColor = color(random(255));
      
      fill(randomColor);
      noStroke();
      //rect(posX, posY, width, height);
      rect(i * stepX, j * stepY, stepX, stepY);
    }
  }
  
}  

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }