// For() loop Grid - Wave
//////////////////////////////

let rows = 10;
let columns = 20;
let xSpace = 40;
let ySpace = 40;
let sliderWidth = 180;
let yWave, yWaveSize, yWaveLength, yWaveSpeed, yWaveOffset;


let ballSize = 8;

function preload() {
  //font = loadFont('WorkSans-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  yWaveSizeSlider = createSlider(0,100,20);
  yWaveSizeSlider.position(10,20);
  yWaveSizeSlider.style('width',sliderWidth+'px');
  
  yWaveLengthSlider = createSlider(0, PI, 0.5, 0.01);
  yWaveLengthSlider.position(10,50);
  yWaveLengthSlider.style('width',sliderWidth+'px');

  yWaveOffsetSlider = createSlider(0, PI, 0.5, 0.01);
  yWaveOffsetSlider.position(10,80);
  yWaveOffsetSlider.style('width',sliderWidth+'px');
  
  yWaveSpeedSlider = createSlider(0, 0.25, 0.05, 0.01);
  yWaveSpeedSlider.position(10,110);
  yWaveSpeedSlider.style('width',sliderWidth+'px');
}

function draw() {
  background('black');
  
  textSize(12);

  text("Size",(sliderWidth+20),35);
  text("X-Offset",(sliderWidth+20),65);
  text("Y-Offset",(sliderWidth+20),95);    
  text("Speed",(sliderWidth+20),125);    
  
  // Connect the slider values to the wave variables
  yWaveSize = yWaveSizeSlider.value();
  yWaveLength = yWaveLengthSlider.value();
  yWaveOffset = yWaveOffsetSlider.value();
  yWaveSpeed = yWaveSpeedSlider.value();
  
  // Center matrix
  translate(width/2,height/2);
  
  // Reposition matrix depending on width & height of the grid
  translate( -(columns-1) * xSpace/2, -(rows-1) * ySpace/2);
  
  noStroke();
  
  for(var i = 0; i < columns; i++){
    for(var j = 0; j < rows; j++){
      fill(255);
      ellipse(i*xSpace, j*ySpace,5,5);
      
      yWave = sin(frameCount*yWaveSpeed + i*yWaveLength + j*yWaveOffset) * yWaveSize;
      
      fill(255);
      push();
      translate(i*xSpace,j*ySpace);
        ellipse(0,yWave,ballSize,ballSize);
      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}