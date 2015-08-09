var $ = require('jquery'),
    text = require('../assets/texts/animation.txt');


var OPOSITE = {javascript:'css', css: 'javascript'};

var animateLine = function(line, box, callback) {
  var index = 0;
  var showLetter = function() {
    var element = $('#' + box + '-text');
    element.animate({
      scrollTop: element.prop('scrollHeight') + 100,
    }, Environment.SCROLL_INTERVAL || 0);

    // The line is over
    if (index === line.length) {
      callback();
      return;
    }

    element.append(line[index++]);
    setTimeout(showLetter, Environment.LETTER_INTERVAL || 0);
  };
  showLetter();
}

var animation = function() {
  var currentBox = 'javascript';
  var currentIndex = 0;
  text = text.split('\n');
  var cache = {
    javascript: '',
    css: '',
  };

  var showLine = function() {
    // Consume current cached code
    var consume = function() {
      window.highlight && window.highlight();
      if (currentBox === 'javascript') {
        eval(cache.javascript);
        cache.javascript = '';
        return;
      }
      $('#style').append(cache.css);
      cache.css = '';
    };

    // Just a helper function to increment the state
    var increment = function() {
      currentIndex++;
      showLine();
    };

    // When there's no more text to display, the show is over
    if (currentIndex === text.length) {
      consume();
      return;
    }

    // Two asterisks mark the change to the other box
    if (text[currentIndex] === '**') {
      consume();
      currentBox = OPOSITE[currentBox];
      increment();
      return;
    }

    // Indicator to wait before continuing
    if (text[currentIndex] === '++') {
      setTimeout(increment, Environment.WAIT_INTERVAL || 0);
      return;
    }

    // Indicator to consume code
    if (text[currentIndex] === '--') {
      consume();
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
