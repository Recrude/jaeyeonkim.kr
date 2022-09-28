let speed = 1;
let scale = 0.10; // Image scale (I work on 1080p monitor)
let canvas;
let ctx;
let logoColor = 'grey';
var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

preload(
    'https://jaeyeonkim.kr/bouncing/webs/dearminguhong.png',
'https://jaeyeonkim.kr/bouncing/webs/gridroom.png',
'https://jaeyeonkim.kr/bouncing/webs/hivcdgw.png',
'https://jaeyeonkim.kr/bouncing/webs/neocity.png',
'https://jaeyeonkim.kr/bouncing/webs/unknownorder.png',
'https://jaeyeonkim.kr/bouncing/webs/newsletter.png',
'https://jaeyeonkim.kr/bouncing/webs/sisoze.png',
'https://jaeyeonkim.kr/bouncing/webs/thhav1.png',
'https://jaeyeonkim.kr/bouncing/webs/wowff.png'
)
const imagesource = [
'https://jaeyeonkim.kr/bouncing/webs/dearminguhong.png',
'https://jaeyeonkim.kr/bouncing/webs/gridroom.png',
'https://jaeyeonkim.kr/bouncing/webs/hivcdgw.png',
'https://jaeyeonkim.kr/bouncing/webs/neocity.png',
'https://jaeyeonkim.kr/bouncing/webs/unknownorder.png',
'https://jaeyeonkim.kr/bouncing/webs/newsletter.png',
'https://jaeyeonkim.kr/bouncing/webs/sisoze.png',
'https://jaeyeonkim.kr/bouncing/webs/thhav1.png',
'https://jaeyeonkim.kr/bouncing/webs/wowff.png'];
const randomwebs = imagesource[Math.floor(Math.random()*imagesource.length)];
shuffle(imagesource);

let dvd = {
    x: 200,
    y: 300,
    xspeed: .5,
    yspeed: .5,
    img: new Image()
};

(function main(){
    canvas = document.getElementById("tv-screen");
    ctx = canvas.getContext("2d");
    dvd.img.src = randomwebs;

    //Draw the "tv screen"
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    //pickColor();
    update();
})();

function update() {
    setTimeout(() => {
        //Draw the canvas background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //Draw DVD Logo and his background
        ctx.fillStyle = logoColor;
        ctx.fillRect(dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
        ctx.drawImage(dvd.img, dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
        //Move the logo
        dvd.x+=dvd.xspeed;
        dvd.y+=dvd.yspeed;
        //Check for collision 
        checkHitBox();
        update();   
    }, speed)
}

//Check for border collision
function checkHitBox(){
    if(dvd.x+dvd.img.width*scale >= canvas.width || dvd.x <= 0){
        dvd.xspeed *= -1;
        //pickColor();
        randomWebs();
    }
        
    if(dvd.y+dvd.img.height*scale >= canvas.height || dvd.y <= 0){
        dvd.yspeed *= -1;
        //pickColor();
        randomWebs();
    }    
}

//Pick a random color in RGB format
function pickColor(){
    r = Math.random() * (254 - 0) + 0;
    g = Math.random() * (254 - 0) + 0;
    b = Math.random() * (254 - 0) + 0;

    logoColor = 'rgb('+r+','+g+', '+b+')';
}

function randomWebs() {
    dvd.img.src = imagesource[Math.floor(Math.random()*imagesource.length)];
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
