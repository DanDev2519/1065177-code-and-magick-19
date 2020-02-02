'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_SIZE = 15;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_INTERVAL = 50;

var renderCloud = function (ctx, x, y, color) {
  var offset = 10;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + offset, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - offset);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH - offset, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + offset);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
  // ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement;
  if (arr.length === 0) {
    maxElement = NaN; // Не знаю, может нужно поставить 0 вместо  NaN
  } else {
    maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
  }

  return maxElement;
};

var getRandomUpTo = function (max) {
  return Math.floor(Math.random() * max);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  var xText = CLOUD_X + 2 * GAP;
  var yText = CLOUD_Y + 2 * GAP;

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', xText, yText);
  ctx.fillText('Список результатов: ', xText, yText + FONT_SIZE);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var xBar = CLOUD_X + 4 * GAP + i * (BAR_WIDTH + BAR_INTERVAL);
    var yBar = CLOUD_Y + CLOUD_HEIGHT - FONT_SIZE;
    var timeBar = times[i] * BAR_HEIGHT / maxTime;

    ctx.fillText(players[i], xBar, yBar - 2 * GAP);
    ctx.fillText(Math.round(times[i]), xBar, yBar - 3 * GAP - FONT_SIZE - timeBar);

    ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240,' + getRandomUpTo(100) + '%' + ',50%)';

    ctx.fillRect(xBar, yBar - 3 * GAP - timeBar, BAR_WIDTH, timeBar);
    ctx.fillStyle = '#000';
  }
};
