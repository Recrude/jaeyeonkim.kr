// let g;
// let o;
// let u;
// let p;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(RGB, 255, 255, 255);
  
    x=width/2;
    y=height/2;
    
    background(0);
   
  }
  
    function draw() {
    w = width;
    h = height; 
      
    push();
    translate(0, h /5+200);
    let num = 1000;
    for (let a = 0; a < num; a = a + 1) {
      let x = a * width / num;
      let y = noise(x/100, frameCount/90) * 200;
      //fill((frameCount + a * 6) % 360, 80, 300, 50);
      fill(255);
      noStroke();
      ellipse(x, y,1,1);
    }
    pop();
  }
  