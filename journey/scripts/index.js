var $ = require('jquery'),
    Sprite = require('exports?window.Sprite!sprite-js/dist/sprite.min'),
    animation = require('./animation');

window.Environment = Environment;
window.hljs = require('highlight.js');
window.$ = $;
window.platform = new Image();
platform.src = require('../assets/images/open-field.png');
window.background = new Image();
background.src = require('../assets/images/background-mountains.png');

$(document).ready(function() {
  var sora = new Sprite({
    canvas: document.getElementById('canvas'),
    image: document.getElementById('sora'),
    rows: 4,
    columns: 3,
    rowIndex: 2,
    columnFrequency: 0,
  });
  setInterval(function() {
    var context = sora.context;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    sora.draw(0, 0);
  }, 200);
  // Run the animation
  window.sora = sora;
  animation();
});
