// Code borrowed/adapted from Q
// "https://editor.p5js.org/Q/sketches/sKKhgJtLh"

// Click on screen to add more object

var Engine = Matter.Engine,
  //    Render = Matter.Render,
  World = Matter.World,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies;

let engine;
let world;
let circles = [];
let imgs = [];
let grounds = [];
let mConstraint;

function preload() {
  //font = loadFont("Outfit-SemiBold.ttf");
  
  for (let i = 0; i < 1; i++) {
    imgs[i] = loadImage(`assets/asset${i}.png`);
  }
}

let canvas;
 let sizes = [30, 40, 60, 80];
//let sizes = [200,300];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  //  Engine.run(engine);
  grounds.push(new Boundary(0, height / 2, 10, height));
  grounds.push(new Boundary(width, height / 2, 10, height));
  grounds.push(new Boundary(400, 0, width, 10));
  grounds.push(new Boundary(400, height, width, 10));
  World.add(world, grounds);

  let mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity(); // for retina displays etc
  let options = {
    mouse: mouse,
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

let count = 0;

function draw() {
  background(30);
  
  if (frameCount % 25 === 0) {
    print(++count);
    let size = random(sizes);
    circles.push(new Circle(width / 2, 100, size / 3));
  }
  
  
  Engine.update(engine);

  for (let circle of circles) {
    circle.show();
  }
  for (let ground of grounds) {
    ground.show();
  }
}

function mousePressed (){
  circles.push(new Circle(mouseX, mouseY, 40));
  
}

class Circle {
  constructor(x, y, r) {
    let options = {
      // friction: 0.3,
      // restitution: 0.6

      friction: 0.3,
      restitution: 0.1,
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    this.product = random(imgs);
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    image(this.product, 0, 0, this.r * 3, this.r * 3);
    pop();
  }
}

class Boundary {
  constructor(x, y, w, h) {
    let options = {
      friction: 0.3,
      restitution: 0.6,
      isStatic: true,
      //      angle: PI / 4
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
  }

  show() {
//     let pos = this.body.position;
//     let angle = this.body.angle;

//     push();
//     translate(pos.x, pos.y);
//     rotate(angle);
//     rectMode(CENTER);
//     strokeWeight(1);
//     noStroke();
//     fill(255, 0, 0);
//     rect(0, 0, this.w, this.h);
//     pop();
  }
}
