// FOR() LOOP W/ WAVE MOTION IN TWO DIMENSIONS
//////////////////////////////

let rows = 1;
let columns = 10;
let xSpace = 30;
let ySpace = 30;
let sliderWidth = 180;

let input;

let yWave, yWaveSize, yWaveLength, yWaveSpeed, yWaveOffset;

let xWave, xWaveSize, xWaveLength, xWaveSpeed, xWaveOffset;

let ballSize = 8;

function preload() {
  //font = loadFont('WorkSans-Regular.ttf');
  //font2 = loadFont('SpaceMono-Regular.ttf');
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
  
  textInp = createInput('Display Display');
  textInp.position(10,150);
}

function draw() {
  background('black');
  //textFont(font2);
  textSize(12);
  fill(255);

  text("Size",(sliderWidth+20),35);
  text("Length",(sliderWidth+20),65);
  text("Offset",(sliderWidth+20),95);    
  text("Speed",(sliderWidth+20),125);    

  // Connect the slider values to the wave variables
  yWaveSize = yWaveSizeSlider.value();
  yWaveLength = yWaveLengthSlider.value();
  yWaveOffset = yWaveOffsetSlider.value();
  yWaveSpeed = yWaveSpeedSlider.value();
  
  input = textInp.value();
  
  // Center matrix
  translate(width/2-30,height/2);
  
  // Reposition matrix depending on width & height of the grid
  translate( -(input.length-1) * xSpace/2, -(rows-1) * ySpace/2);
  
  noStroke();
  
  for(var i = 0; i < input.length; i++){
    for(var j = 0; j < rows; j++){
      fill('#FFBD12');
     ellipse(i*xSpace, j*ySpace,5,5);
      
      yWave = sin(frameCount*yWaveSpeed + i*yWaveLength + j*yWaveOffset) * yWaveSize;
      
      // Calculate the position of the letter before and after the current letter
     yWavePre = sin(frameCount*yWaveSpeed + (i-1)*yWaveLength + j*yWaveOffset) * yWaveSize;
     yWavePost = sin(frameCount*yWaveSpeed + (i+1)*yWaveLength + j*yWaveOffset) * yWaveSize;
      // Use the before and after points to use tangent to determine the angle between the points
      let rotSmooth = atan2(yWavePost-yWavePre,2*xSpace);
      
      push();
        translate(i*xSpace,j*ySpace);
        fill('#f24f13');
        ellipse(0,0,5,5);
        
        fill(255);
        translate(0,yWave);
        // rotate(rotSmooth);
        textSize(30);
        text(input.charAt(i),0,0);
//        ellipse(xWave,yWave,ballSize,ballSize);
      pop();
      push();
        translate(i*xSpace+20,j*ySpace+40);
        fill('#f24f13');
        ellipse(0,0,5,5);
        
        fill(255);
        translate(0,yWave);
        // rotate(rotSmooth);
        textSize(30);
        text(input.charAt(i),0,0);
//        ellipse(xWave,yWave,ballSize,ballSize);
      pop();
      push();
        translate(i*xSpace+40,j*ySpace+80);
        fill('#f24f13');
        ellipse(0,0,5,5);
        
        fill(255);
        translate(0,yWave);
        // rotate(rotSmooth);
        textSize(30);
        text(input.charAt(i),0,0);
//        ellipse(xWave,yWave,ballSize,ballSize);
      pop();
    }
  }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }