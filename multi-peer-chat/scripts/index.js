var $ = require('jquery'),
    SimpleMultiPeer = require('simple-multi-peer');

function wrap() {
  $('#users').html(Object.keys(this.peers).map(function(user) {
    return `<div>${user}</div>`;
  }).join(''));
}

function message(id, data) {
  $('#messages').append(id + ': ' + data + '<br>');
  $('#messages').animate({scrollTop: Infinity});
}

var Peers = new SimpleMultiPeer({
  server: Environment.SIGNALLER_URL,
  room: 'foobar',
  callbacks: {
    connect: wrap,
    close: wrap,
    data: message,
  }
});

$(document).ready(function() {
  $('#form-send').on('submit', function(event) {
    event.preventDefault();
    if (!$('#text').val()) {
      return;
    }

    Peers.send($('#text').val());
    message(Peers.signaller.id, $('#text').val());
    $('#text').val('');
  });
});
