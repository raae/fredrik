// Constants
var NUMBER_OF_LINES = 200;
var WAIT_TIME = 50;

var COLORS = ['red', 'blue', 'green', 'purple', 'pink', 'yellow'];

var MIN_X = 10;
var MAX_X = view.size.width - 10;

var MIN_Y = 10;
var MAX_Y = view.size.height - 10;

var MAX_LENGTH = 50; //Other possibilities 100, 200, 400, Math.max(MAX_Y, MAX_X);


// Input and buttons
////////////////////////
////////////////////////

var $controls = document.querySelector('#controls');
var $download = document.querySelector('#download');

var $numberOfLines = document.querySelector('#number-of-lines');
$numberOfLines.value = NUMBER_OF_LINES;

var $waitTime = document.querySelector('#wait-time');
$waitTime.value = WAIT_TIME;

var $draw = document.querySelector('#draw');
$draw.addEventListener('click', function () {
  paper.project.clear();
  var options = {
    numberOfLines: $numberOfLines.value,
    waitTime: $waitTime.value,
    maxLength: MAX_LENGTH,
    colors: COLORS
  };

  drawOnCanvas(options);
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

function generateRandomValues(options) {
  var lengths = [];
  var angles = [];
  var colors = [];

  for (var i = 0; i < options.numberOfLines; i++) {
    lengths.push(Math.random() * options.maxLength);
    angles.push(Math.floor((Math.random() * 4)));
    colors.push(options.colors[Math.floor((Math.random() * options.colors.length))]);
  }

  return {
    lengths: lengths,
    angles: angles,
    colors: colors
  }
}

function loopIt(i, point, options, randoms) {
  if (i < options.numberOfLines) {
    point = drawLine(point, randoms.lengths[i], randoms.colors[i], randoms.angles[i]);
    if (options.waitTime > 0) {
      setTimeout(function () {
        loopIt(i++, point, options, randoms);
      }, options.waitTime);
    } else {
      loopIt(i++, point, options, randoms);
    }
  } else {
    drawingCompleted();
  }
};

function drawOnCanvas(options) {
  setControlsState(false);
  var randoms = generateRandomValues(options);
  var point = {
    x: Math.floor(Math.random() * MAX_X),
    y: Math.floor(Math.random() * MAX_Y)
  };
  console.log(randoms);
  loopIt(0, point, options, randoms);
}
