let capture;
let mousePositions = [];
const MAX_POS = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //capture = createCapture(VIDEO);
  //capture.size(windowWidth, windowHeight);
  //capture.hide();
}

function draw() {
  background(255);
  //how you're drawing your pose
  rect(mouseX-25, mouseY-25, 50, 50);
  
  //how you're storing the last 50 poses
  mousePositions.push({x: mouseX-25, y: mouseY-25});
  
  //removes poses that are older than 50
  if (mousePositions.length > MAX_POS) {
  	 mousePositions.shift();
  }
  for (let i = 0; i < mousePositions.length; i +=1) {
    // how you want to draw the previous poses
    // relate it to i to change pose drawing over time
  	rect(mousePositions[i].x, mousePositions[i].y, i, i);
  }
}
