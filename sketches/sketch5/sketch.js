let Mondrian, JustLines, numbRecs,canvas,wSize,hSize;
let overlap,mondOn, mondOff, justLines, justRects, intervals, maxSizePercent; 
overlap = false;
let stacklimit = 1000;
let hueR, satR, brtR, start, limit, numbDrawn;
let MondColors = [
  0,100,90,
  0,0,0,
  240,100,100,
  58,100,100,
  100,2,100,
]; // red, black, blue, yellow, white

let borderRect = 2;
let borderColor = (255,255,255);

function setup() {
  overlapOn = createButton("Overlap");
  overlapOn.mousePressed(overlapYes);
  overlapOff = createButton("No Overlap");
  overlapOff.mousePressed(overlapNo);
  mondOn = createButton("Mondrian");
  mondOn.mousePressed(mondrianOn);
  mondOff = createButton("Rand Color");
  mondOff.mousePressed(mondrianOff);
  justLines = createButton("Just Lines");
  justLines.mousePressed(linesOnly);
  justRecs = createButton ("Rectangles");
  justRecs.mousePressed(recsOnly);
  createP();
  recsSlider = createSlider(3,200,70);
  let numberWords = createElement('numberWords',"# of rectangles");
  numberWords.position(12,40);
  sizeSlider = createSlider(5,70,30);
  let sizeWords = createElement('sizeWords',"size of rectangles");
  sizeWords.position(150,40);
  intervalsSlider = createSlider(10,50,20);
  let intervalsWords = createElement('intervalsWords',"size of intervals");
  intervalsWords.position(290,40);
  let refreshWords = createElement('refreshWords',"Click to refresh.  's' for a jpg.");
  refreshWords.position(12,85);
  newCanvas();
}

 // Random canvas size at intervals of pixels.
function newCanvas(){
  wSize = round(random(windowWidth*0.40, windowWidth));
  if (wSize > windowWidth-20){wSize = windowWidth - 20}
  hSize = round(random(windowHeight*0.40, windowHeight));
  if (hSize > windowHeight - 70){hSize = windowHeight - 70}
  canvas = createCanvas(wSize, hSize);
  canvas.position (10,120);
  background(255);
  numbRecs = recsSlider.value();
  intervals = intervalsSlider.value();
  maxSizePercent = sizeSlider.value()/100;
  
  numbDrawn = 0;
  if (Mondrian == false || JustLines == true){
borderColor = 0} else {borderColor = 45} // grey = 45; black = 0;

  // Select the saturation and brightness and how many colors there will be (not Mondrian).
  strokeWeight(5);
  colorMode(HSB, 360, 100, 100);
  if (Mondrian == false) {
    hueR = random(3, 7);
    satR = random(60, 100);
    brtR = random(50, 100);
    start = int(random(360 / hueR)); // Where the hues start on the color wheel.
  }
  newColor();
}

// All the button functions
function mondrianOn(){
  Mondrian = true;
}
function mondrianOff(){
  Mondrian = false;
}
function linesOnly(){
  JustLines = true;
}
function recsOnly(){
  JustLines = false;
}
function overlapYes(){
  overlap = true;
}
function overlapNo(){
  overlap = false;
}

// Go through the pre-selected colors at random.
function newColor() {
  for (let i = 0; i < numbRecs; i++) {
    if (numbRecs < numbDrawn + 1) {
      break;
    } else {
      if (Mondrian == false) {
        let col = 360 / random(hueR) + start;
        if (col > 359) {
          col = col - 359;
        }
        fill(col, satR, brtR);
      } else {
        let i = round(random(5));
        fill(MondColors[i * 3], MondColors[i * 3 + 1], MondColors[i * 3 + 2]);
      }
      limit = 0;
      drawRect();
    }
  }

  // Draw a border around the canvas.
  noFill();
  stroke(borderColor);
  strokeWeight(5);
  rect(0, 0, width, height);
  print(numbDrawn);
}

// Draw a random rectangle.
function drawRect() {
  let wStart = round(random(-3, width / intervals - 2)) * intervals;
  let hStart = round(random(-3, height / intervals - 2)) * intervals;
  let wSize = round(random(2, width*maxSizePercent/intervals)) * intervals;
  let hSize = round(random(2, height*maxSizePercent/intervals)) * intervals;
  let x, y;
  if (wStart < 0) {
    x = 0;
  } else {
    x = wStart;
  }
  if (hStart < 0) {
    y = 0;
  } else {
    y = hStart;
  }
  let wCheck, hCheck;
  if (hStart + hSize < 0) {
    hCheck = 0;
  } else {
    hCheck = hStart + hSize;
  }
  if (wStart + wSize < 0) {
    wCheck = 0;
  } else {
    wCheck = wStart + wSize;
  }
  let draw = true;
  // Make sure you don't draw over an existing rectangle.
  let colorCheck1,colorCheck2,colorCheck3;
  if (overlap == false){
  for (y; y < hCheck; y = y + intervals) {
    if (wStart < 0) {
      x = 0;
    } else {
      x = wStart;
    }
    for (x; x < wCheck; x = x + intervals) {
      colorCheck1 = get(x, y);
      colorCheck2 = get(x-1, y-1);
      colorCheck3 = get(x+1, y+1);
     
      if (
        colorCheck1[0] == 255 &&
        colorCheck1[1] == 255 &&
        colorCheck1[2] == 255 &&
        colorCheck2[0] == 255 &&
        colorCheck2[1] == 255 &&
        colorCheck2[2] == 255 &&
        colorCheck3[0] == 255 &&
        colorCheck3[1] == 255 &&
        colorCheck3[2] == 255
      ) {
        draw = true;
      } else {
        draw = false;
        break;
      }
    }
    if (draw == false) {
      break;
    }
  }
}
  if (draw == true) {
    if (JustLines == true) {
      noFill();
    }
    stroke(borderColor);
    strokeWeight(borderRect);
    rect(wStart, hStart, wSize, hSize);
    numbDrawn++;
  } else {
    limit++;
    if (limit < stacklimit) {
      drawRect();
    }
  }
  if (numbDrawn < numbRecs && limit < stacklimit) 
  {
    newColor();
  }
}

// New art when mouse clicked.
function mousePressed() {
  newCanvas();
}

// Save art as jpg.
function keyTyped() {
  if (key === "s") {
    save("myCanvas.jpg");
  }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}