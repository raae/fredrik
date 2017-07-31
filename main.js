// Setting up stuff that is needed
var COLORS = ['ff002a', 'c04b5e', 'ff002a', '512930', '42040f', 'f1abf7', 'e808fc', 'ac21b9', '4a0f4f', '5e4460', 'b79cf1', '5203fe', '280476', '4b425f', '170244', 'c4fefd', '00fffb', '78b9b8', '007270', '2f4242', 'bfffd9', '00ff66', '6fb58b', '00712d', '2d4737', 'cfffb5', '59ff00', '82bd62', '2f8700', '354e28', 'f8ff97', 'eeff00', 'b9c058', '7a8300', '424425', 'ffed9c', 'ffd000', 'bba856', '6b5700', '473f1f', 'ffdec1', 'fe7700', 'a3744b', '7b3900', '432d19', 'fadad8', 'ff1100', 'ba483f', '810900', '3c1614'];

var STEPS = 200;

var WAIT_TIME = 100;

var MIN_X = 10;
var MAX_X = view.size.width - 10;

var MIN_Y = 10;
var MAX_Y = view.size.height - 10;

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
