const margin = 30;
let strokeConst;

function setup() {
    createCanvas(windowWidth, windowHeight-100);
  //noLoop();

  strokeConstSlider = createSlider(0, PI, 0.2, 0.01);
  strokeConstSlider.position(10, 20);
  strokeConstSlider.style("width", "100px");
  let strokeWords = createElement('Strokewords',"Stroke Weight");
  strokeWords.position(120,20);
  frameSlider = createSlider(1, 60, 20);
  frameSlider.position(10, 50);
  frameSlider.style("width", "100px");
  let frameWords = createElement('Framewords',"Frames");
  frameWords.position(120,50);

}

function draw() {
    frameConst = frameSlider.value();
    frameRate(frameConst);

  background(0);
  stroke(255);
  noFill();
  rect(margin, margin, width - margin * 2, height - margin * 2);

  for (let y = margin * 2; y < height - margin * 2; y += 25) {
    drawLine(y);
  }
  
}

function drawLine(lineY) {
  strokeConst = strokeConstSlider.value();
  strokeWeight(strokeConst);
  const range = map(lineY, margin * 2, height - margin * 2, 0, 50);

  let prevX = margin * 2;
  let prevY = lineY;
  const lineSpacing = 12;

  for (let x = prevX + lineSpacing; x <= width - margin * 2; x += lineSpacing) {
    const y = lineY + random(-range, range);
    line(prevX, prevY, x, y);

    prevX = x;
    prevY = y;
  }
  
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}