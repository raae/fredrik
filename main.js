// Constants
var COLORS = ['red', 'blue', 'green', 'purple', 'pink', 'yellow'];
var WAIT_TIME = 100;

var MIN_X = 10;
var MAX_X = view.size.width - 10;

var MIN_Y = 10;
var MAX_Y = view.size.height - 10;

var MAX_LENGTH = 50; //Other possibilities 100, 200, 400, Math.max(MAX_Y, MAX_X);


// Input and buttons
////////////////////////
////////////////////////
var numberOfLines = 200;

var $controls = document.querySelector('#controls');
var $download = document.querySelector('#download');

var $numberOfLines = document.querySelector('#number-of-lines');
$numberOfLines.value = numberOfLines;

var $draw = document.querySelector('#draw');
$draw.addEventListener('click', function () {
  drawOnCanvas($numberOfLines.value, MAX_LENGTH, COLORS);
});

function setControlsState(isActive) {
  if (isActive) {
    $controls.classList.add('active');
  } else {
    $controls.classList.remove('active');
  }
}

function setDownloadHref() {
  var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({ asString: true }));
  $download.href = url;
}

function drawingCompleted() {
  setControlsState(true);
  setDownloadHref();
}

// Art generator
////////////////////////
////////////////////////

// Draw line function
var drawLine = function (point, length, color, angle) {
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

function generateRandomValues(numberOfLines, maxLength, colorsToPickFrom) {
  var lengths = [];
  var angles = [];
  var colors = [];

  for (var i = 0; i < numberOfLines; i++) {
    lengths.push(Math.random() * maxLength);
    angles.push(Math.floor((Math.random() * 4)));
    colors.push(colorsToPickFrom[Math.floor((Math.random() * colorsToPickFrom.length))]);
  }

  return {
    lengths: lengths,
    angles: angles,
    colors: colors
  }
}

function loopIt(i, point, numberOfLines, randoms) {
  console.log(i, numberOfLines, randoms);
  if (i < numberOfLines) {
    // console.log('Tegne strek', i, lengths[i], colors[i], angles[i]);
    point = drawLine(point, randoms.lengths[i], randoms.colors[i], randoms.angles[i]);
    loopIt(i++, point, numberOfLines, randoms);
  } else {
    drawingCompleted();
  }
};

function drawOnCanvas(numberOfLines, maxLength, colorsToPickFrom) {
  var randoms = generateRandomValues(numberOfLines, maxLength, colorsToPickFrom);
  var point = {
    x: Math.floor(Math.random() * MAX_X),
    y: Math.floor(Math.random() * MAX_Y)
  };
  console.log(randoms);
  loopIt(0, point, numberOfLines, randoms);
}
