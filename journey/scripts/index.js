var $ = require('jquery'),
    Sprite = require('exports?window.Sprite!sprite-js/dist/sprite.min'),
    animation = require('./animation');

var init = function() {
  var sora = new Sprite({
    canvas: document.getElementById('canvas'),
    image: soraImage,
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
};

var imagesLoaded = 0;

var incrementImage = function() {
  imagesLoaded++;
  imagesLoaded === 3 && init();
}

window.Environment = Environment;
window.hljs = require('highlight.js');
window.$ = $;
window.platform = new Image();
window.platform.onload = incrementImage;
window.background = new Image();
window.background.onload = incrementImage;
window.soraImage = new Image();
window.soraImage.onload = incrementImage;

$(document).ready(function() {
  window.platform.src = require('../assets/images/open-field.png');
  window.background.src = require('../assets/images/background-mountains.png');
  window.soraImage.src = require('../assets/images/sora.png');
});
