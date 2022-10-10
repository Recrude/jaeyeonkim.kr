const chars =
  "AabB";
function setup() {
  // createCanvas(windowWidth, windowHeight);
  noCanvas();
  capture = createCapture(VIDEO);
  // capture.hide();
  capture.size(80, (80 * capture.height) / capture.width);
  frameRate(60)
}

function draw() {
  const frame = capture.get();
  frame.filter(BLUR, 1);
  frame.loadPixels();
  let grid = [];
  colorMode(RGB, 255);

  let minLightness = 255;
  let maxLightness = 10;

  for (let y = 0; y < frame.height; y++) {
    const gridRow = [];
    grid.push(gridRow);
    for (let x = 0; x < frame.width; x++) {
      const index = 4 * (y * frame.width + x);
      const [r, g, b] = frame.pixels.slice(index, index + 4);
      const c = color(r, g, b);
      const col = [hue(c), saturation(c), lightness(c)];

      gridRow.push(col);

      minLightness = Math.min(minLightness, col[2]);
      maxLightness = Math.max(maxLightness, col[2]);
    }
  }

  grid = grid.map((row) => {
    row = row.map((c) => {
      c[2] = map(c[2], minLightness, maxLightness, 0, 255);
      return c;
    });
    return row;
  });

  let str = "";
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const c = grid[y][x];

      const char =
        chars[Math.floor(map(c[2], 0, 255, 0, chars.length - 0.1))] || " ";
      str += char;
    }
    str += "\n";
  }

  document.body.innerText = str;

  //noLoop();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}