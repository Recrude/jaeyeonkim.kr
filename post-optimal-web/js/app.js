// let speed = 1.5;
// let scale = .8; // Image scale (I work on 1080p monitor)
// let canvas;
// let ctx;
// let logoColor = 'white';
// var images = [];
// function preload() {
//     for (var i = 0; i < arguments.length; i++) {
//         images[i] = new Image();
//         images[i].src = preload.arguments[i];
//     }
// }

// preload(
//     'SVG/headerRect.svg'
// )
// const imagesource = [
// 'SVG/headerRect.svg'];
// const randomwebs = imagesource[Math.floor(Math.random()*imagesource.length)];
// shuffle(imagesource);

// let dvd = {
//     x: 400,
//     y: 200,
//     xspeed: .5,
//     yspeed: .5,
//     img: new Image()
// };

// (function main(){
//     canvas = document.getElementById("tv-screen");
//     ctx = canvas.getContext("2d");
//     dvd.img.src = randomwebs;

//     //Draw the "tv screen"
//     canvas.width  = window.innerWidth;
//     canvas.height = window.innerHeight;

//     pickColor();
//     update();
// })();

// function update() {
//     setTimeout(() => {
//         //Draw the canvas background
//         ctx.fillStyle = 'white';
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//         //Draw DVD Logo and his background
//         ctx.fillStyle = logoColor;
//         ctx.fillRect(dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
//         ctx.drawImage(dvd.img, dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
//         //Move the logo
//         dvd.x+=dvd.xspeed;
//         dvd.y+=dvd.yspeed;
//         //Check for collision 
//         checkHitBox();
//         update();   
//     }, speed)
// }

// //Check for border collision
// function checkHitBox(){
//     if(dvd.x+dvd.img.width*scale >= canvas.width || dvd.x <= 0){
//         dvd.xspeed *= -1;
//         pickColor();
//         //randomWebs();
//     }
        
//     if(dvd.y+dvd.img.height*scale >= canvas.height || dvd.y <= 0){
//         dvd.yspeed *= -1;
//         pickColor();
//         //randomWebs();
//     }    
// }

// //Pick a random color in RGB format
// function pickColor(){
//     r = Math.random() * (254 - 0) + 0;
//     g = Math.random() * (254 - 0) + 0;
//     b = Math.random() * (254 - 0) + 0;

//     logoColor = 'rgb('+r+','+g+', '+b+')';
// }

// function randomWebs() {
//     dvd.img.src = imagesource[Math.floor(Math.random()*imagesource.length)];
// }

// function shuffle(array) {
//   let currentIndex = array.length,  randomIndex;

//   // While there remain elements to shuffle.
//   while (currentIndex != 0) {

//     // Pick a remaining element.
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex], array[currentIndex]];
//   }

//   return array;
// }

var box = $('#box'),
    // Create some clones (these make up the trail)
    clones = $.map(Array(10), function(item, i){
        return box.clone().css('opacity', 1 / (i + 1)).hide().insertAfter(box);
    });

box.animate({
    top: 100,
    left: 200
}, {
    duration: 1000,
    step: function(now, fx) {

        // On each step, set a timeout for each clone,
        // making it move to the required position.

        var prop = fx.prop;

        $.each(clones, function(i, clone){
            clone = $(clone).show();
            setTimeout(function(){
                clone.css(prop, now);
            }, 50 * i);
        });

    }
});



// let capture;
// let mousePositions = [];
// const MAX_POS = 50;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   //capture = createCapture(VIDEO);
//   //capture.size(windowWidth, windowHeight);
//   //capture.hide();
// }

// function draw() {
//   background(255);
//   //how you're drawing your pose
//   rect(mouseX-25, mouseY-25, 50, 50);
  
//   //how you're storing the last 50 poses
//   mousePositions.push({x: mouseX-25, y: mouseY-25});
  
//   //removes poses that are older than 50
//   if (mousePositions.length > MAX_POS) {
//      mousePositions.shift();
//   }
//   for (let i = 0; i < mousePositions.length; i +=1) {
//     // how you want to draw the previous poses
//     // relate it to i to change pose drawing over time
//     rect(mousePositions[i].x, mousePositions[i].y, i, i);
//   }
// }
