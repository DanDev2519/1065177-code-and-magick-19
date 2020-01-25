'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_SIZE = 15;
// var TEXT_WIDTH = 50;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_INTERVAL = 50;
// var barWidth = CLOUD_WIDTH - GAP - TEXT_WIDTH - GAP;

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
    maxElement = NaN; // Не знаю, може нужно поставить 0 вместо  NaN
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

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP);
  ctx.fillText('Список результатов: ', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP + FONT_SIZE);

  // Проверка на случай разных длин массивов players и times
  if (times.length !== players.length) {
    if (times.length > players.length) {
      times.length = players.length;
    } else {
      players.length = times.length;
    }
  }

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_X + 4 * GAP + i * (BAR_WIDTH + BAR_INTERVAL), CLOUD_Y + CLOUD_HEIGHT - 2 * GAP - FONT_SIZE);
    ctx.fillText(Math.round(times[i]), CLOUD_X + 4 * GAP + i * (BAR_WIDTH + BAR_INTERVAL), CLOUD_Y + CLOUD_HEIGHT - 3 * GAP - 2 * FONT_SIZE - times[i] * BAR_HEIGHT / maxTime);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,' + Math.floor(Math.random() * 100) + '%' + ',50%)';
      // ctx.fillStyle = 'hsl(240,100%,50%)'; // Синий цвет
    }

    ctx.fillRect(CLOUD_X + 4 * GAP + i * (BAR_WIDTH + BAR_INTERVAL), CLOUD_Y + CLOUD_HEIGHT - 3 * GAP - FONT_SIZE - times[i] * BAR_HEIGHT / maxTime, BAR_WIDTH, times[i] * BAR_HEIGHT / maxTime);
    ctx.fillStyle = '#000';
  }
};
