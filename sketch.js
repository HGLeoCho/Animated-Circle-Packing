var circles;
var img;
var imgx = 700, imgy = 393;
var framerate;

function preload() {
  img = loadImage("assets/spacecat.jpg");
}

function setup() {
  createCanvas(imgx, imgy*2);
  image(img, 0, img.height+200, img.width/2 , img.height/2);
  pixelDensity(3);
  img.loadPixels();
  circles = [];


  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);

  framerate = createP('');

}

function draw() {
  //background(0);

  var total = 8;
  var count = 0;
  var attempts = 0;

  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 700) {
      noLoop();
      console.log("finished");

      break;
    }
  }

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;

            if (d - 1 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();

    fr.html(floor(frameRate()));
  }
}

function newCircle() {
  var x = random(0, img.width);
  var y = random(0, img.height);

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d - 2 < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    var index = (int(x) + int(y) * img.width) * 4;
    var r = img.pixels[index];
    var g = img.pixels[index+1];
    var b = img.pixels[index+2];
    var c = color(r,g,b);
    return new Circle(x, y, color(c));
  } else {
    return null;
  }
}
