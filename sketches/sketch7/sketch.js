function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
  }
  
  function draw() {
    frameRate(15);
    rect(mouseX-40,mouseY-40,80,80);
  }

  function mousePressed () {
    fill(0);
    stroke(255);
  }
  
  function mouseReleased() {
    fill(255);
    stroke(0);
  }
  