var $ = require('jquery'),
    text = require('../assets/texts/animation.txt');


var OPOSITE = {javascript:'css', css: 'javascript'};

var animateLine = function(line, box, callback) {
  var index = 0;
  var showLetter = function() {
    // The line is over
    if (index === line.length) {
      callback();
      return;
    }

    $('#' + box + '-text').append(line[index++]);
    setTimeout(showLetter, Environment.LETTER_INTERVAL || 0);
  };
  showLetter();
}

var animation = function() {
  var interval = Environment.LINE_INTERVAL || 0;

  var currentBox = 'javascript';
  var currentIndex = 0;
  text = text.split('\n');
  var cache = {
    javascript: '',
    css: '',
  };

  var showLine = function() {
    // Just a helper function to increment the state
    var increment = function() {
      currentIndex++;
      setTimeout(showLine, interval);
    };

    // When there's no more text to display, the show is over
    if (currentIndex === text.length) {
      return;
    }

    // Two asterisks mark the change to the other box
    if (text[currentIndex] === '**') {
      currentBox = OPOSITE[currentBox];
      increment();
      return;
    }

    // If the end hasn't been reached, go to the next line
    var element = $('#' + currentBox + '-text');
    $(element).html() !== '' && $(element).append('\n');

    cache[currentBox] += text[currentIndex] + '\n';
    animateLine(text[currentIndex], currentBox, increment);
  };

  // Start the show
  showLine();
};

module.exports = animation;
