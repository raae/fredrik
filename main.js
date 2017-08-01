// Constants
var NUMBER_OF_LINES = 200;
var WAIT_TIME = 50;

var COLORS = ['red', 'blue', 'green', 'purple', 'pink', 'yellow'];

var FORMAT_WIDTH = 4;
var FORMAT_HEIGHT = 3;

var MAX_LENGTH = 30; //Other possibilities 100, 200, 400, Math.max(MAX_Y, MAX_X);


// Canvas size
////////////////////////
////////////////////////

function setCanvasSize(format) {
  paper.view.viewSize = new Size(paper.view.size.width, paper.view.size.width / format.width * format.height);
}

setCanvasSize({ width: FORMAT_WIDTH, height: FORMAT_HEIGHT })

// Input and buttons
////////////////////////
////////////////////////

var controlsEl = document.querySelector('#controls');
var downloadButton = document.querySelector('#download');

var numberOfLinesInput = document.querySelector('#number-of-lines');
numberOfLinesInput.value = NUMBER_OF_LINES;

var waitTimeInput = document.querySelector('#wait-time');
waitTimeInput.value = WAIT_TIME;

var widthInput = document.querySelector('#width');
widthInput.value = FORMAT_WIDTH;

var heightInput = document.querySelector('#height');
heightInput.value = FORMAT_HEIGHT;

widthInput.addEventListener('change', function () {
  setCanvasSize({
    width: widthInput.value,
    height: heightInput.value
  });
})

heightInput.addEventListener('change', function () {
  setCanvasSize({
    width: widthInput.value,
    height: heightInput.value
  });
})

var lineLengthProcentageInput = document.querySelector('#line-length-procentage');
lineLengthProcentageInput.value = MAX_LENGTH;

var drawButton = document.querySelector('#draw');
drawButton.addEventListener('click', function () {
  var lineLengthSideInput = document.querySelector('input[name="line-length-side"]:checked');
  var options = {
    numberOfLines: numberOfLinesInput.value,
    waitTime: waitTimeInput.value,
    maxLength: (MAX_LENGTH / 100) * (lineLengthSideInput.value === 'height' ? paper.view.size.height - 20 : paper.view.size.width - 20),
    colors: COLORS,
    size: {
      min: {
        x: 10,
        y: 10,
      },
      max: {
        x: paper.view.size.width - 10,
        y: paper.view.size.height - 10,
      }
    }
  };
  paper.project.clear();
  drawOnCanvas(options);
});

function setControlsState(isActive) {
  if (isActive) {
    controlsEl.classList.add('active');
  } else {
    controlsEl.classList.remove('active');
  }
}

function setDownloadHref() {
  var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({ asString: true }));
  downloadButton.href = url;
}

function drawingCompleted() {
  setControlsState(true);
  setDownloadHref();
}

// Art generator
////////////////////////
////////////////////////

// Draw line function
var drawLine = function (point, length, color, angle, size) {
  var path = new Path();
  var start = new Point(point.x, point.y);
  path.strokeColor = color;
  path.moveTo(start);

  switch (angle) {
    case 0:
      // up
      point.x = Math.max(point.x - length, size.min.x);
      break;
    case 1:
      // down
      point.x = Math.min(point.x + length, size.max.x);
      break;
    case 2:
      // left
      point.y = Math.max(point.y - length, size.min.y);
      break;
    case 3:
      // right
      point.y = Math.min(point.y + length, size.max.y);
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
    point = drawLine(point, randoms.lengths[i], randoms.colors[i], randoms.angles[i], options.size);
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
    x: Math.floor(Math.random() * paper.view.size.width - 10),
    y: Math.floor(Math.random() * paper.view.size.height)
  };

  console.log('Options', options);
  console.log('Randoms', randoms);
  loopIt(0, point, options, randoms);
}
