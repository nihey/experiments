var $ = require('jquery'),
    Sprite = require('exports?window.Sprite!sprite-js/dist/sprite.min');

$(document).ready(function() {
//  $('#style-text').on('keyup', function() {
//    $('#style').html($(this).text());
//  });
  var sora = new Sprite({
    canvas: document.getElementById('canvas'),
    image: document.getElementById('sora'),
    rows: 4,
    columns: 3,
    rowIndex: 2,
    columnFrequency: 1,
  });
  setInterval(function() {
    var context = sora.context;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    sora.draw(0, 0);
  }, 200);
});
