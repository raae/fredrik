// Setting up stuff that is needed
var COLORS = ['red', 'blue', 'green', 'purple', 'pink', 'yellow'];
var STEPS = 200;

var WAIT_TIME = 100;

var MIN_X = 10;
var MAX_X = 300; //canvas.width - 10;

var MIN_Y = 10;
var MAX_Y = 200; //canvas.height - 10;

var MAX_LENGTH = 50; //Other possibilities 100, 200, 400, Math.max(MAX_Y, MAX_X);

var START_X = Math.floor(Math.random() * MAX_X);
var START_Y = Math.floor(Math.random() * MAX_Y);

var lengths = [];
var angles = [];
var colors = [];

for (var i = 0; i < STEPS; i++) {
  lengths.push(Math.random() * MAX_LENGTH);
  angles.push(Math.floor((Math.random() * 4)));
  colors.push(COLORS[Math.floor((Math.random() * COLORS.length))]);
}

// Logging key variables
console.log('START', START_X, START_Y);
console.log('size', MAX_X, MAX_Y);
console.log('lengths', lengths);
console.log('angles', angles);
console.log('colors', colors);

// Draw line function
function drawLine(point, length, color, angle) {
  var path = new Path();
  var start = new Point(point.x, point.y);
  path.strokeColor = color;
  path.moveTo(start);

  switch (angle) {
    case 0:
      // up
      point.x = Math.max(point.x - length, MIN_X);
      break;
    case 1:
      // down
      point.x = Math.min(point.x + length, MAX_X);
      break;
    case 2:
      // left
      point.y = Math.max(point.y - length, MIN_Y);
      break;
    case 3:
      // right
      point.y = Math.min(point.y + length, MAX_Y);
      break;
    default:
      console.log("In deafult, something is wrong");
      break;
  };
  path.lineTo(point.x, point.y);
  return point;
}

// Drawing
var point = {
  x: START_X,
  y: START_Y
};

var i = 0;
function loopIt() {
  if (i < STEPS) {
    // console.log('Tegne strek', i, lengths[i], colors[i], angles[i]);
    point = drawLine(point, lengths[i], colors[i], angles[i]);
    setTimeout(loopIt, WAIT_TIME);
    i++;
  }
};
loopIt();
