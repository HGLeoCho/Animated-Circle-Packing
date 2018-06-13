var circles;
var img;
var imgx = 700, imgy = 393;
var fr;

function preload() {
  img = loadImage("assets/spacecat.jpg");
}

function setup() {
  createCanvas(imgx*1.5, imgy);
  pixelDensity(3);
  img.loadPixels();
  circles = [];


  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);

  fr = createP('');
  image(img, img.width, img.height*0.5, img.width/2 , img.height/2);
  text("SpaceCat!!",img.width, img.height*0.48);
}

function draw() {
  //background(0);

  var total = 8;
  var count = 0;
  var attempts = 0;

  fr.html("Frame rate: " + floor(frameRate()));
  
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
