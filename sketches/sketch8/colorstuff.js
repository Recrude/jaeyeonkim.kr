
function makeBackground() {
    // added a couple of background possibilities after the video
   let bgCol = random(10);
    if (bgCol<1){
      background(190)
    }
    else if (bgCol<2){
      background(100)
    }
    else {
    // use some of the palette colors for hue
    getComboColor();
    huey -=10;
    colorMode(HSB, 360, 128, 100, 255);
    background(huey, 90, 20, alph);
    //background(40);
    colorMode(RGB);
    }
  }
  
  function getComboColor() {
    // get a color from each palette and combine them
    colE = 0;
    getColor();
    colRGB1 = col2;
    convert(col2);
    colHSB1 = hsbCol;
    colE = 1;
    getColor();
    colRGB2 = col2;
    convert(col2);
    colHSB2 = hsbCol;
    rgbCombo = lerpColor(colRGB1,colRGB2,0.5);
    convert(rgbCombo);
    sat = (colHSB1[1]+colHSB2[1])/2;
    brt = (colHSB1[2]+colHSB2[2])/2;
  }
  
  function getColor() {
    // get a color from one palette
    noiseChance = random(55, 75); //chance out of 100 that noise will determine color; otherwise random
    if (n2 != null && random(100) < noiseChance) {
      //color using noise
      colNumb = floor(n2 * 5);
    } else {
      colNumb = floor(random(5));
    }
    // grab color from json file
    if (colE == 0) {
      col4 = palettesArray[palette1][colNumb];
    } else {
      col4 = palettesArray[palette2][colNumb];
    }
    col3 = col4.slice(1); //take off '#' from above color
    // https://javascript.plainenglish.io/convert-hex-to-rgb-with-javascript-4984d16219c3
    String.prototype.convertToRGB = function () {
      var aRgbHex = this.match(/.{1,2}/g);
      var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16),
      ];
      return aRgb;
    };
    col2b = col3.convertToRGB(); //the rgb result
    col2 = color(col2b[0],col2b[1],col2b[2],255)
  }
  
  function convert(c){
  // Convert RGB to HSB
    huey = hue(c);
    sat = saturation(c);
    brt = brightness(c);
    alph = alpha(c);
    hsbCol = [huey,sat,brt,alph]
    }
  