var $ = require('jquery'),
    SimpleMultiPeer = require('simple-multi-peer');

var Peers = new SimpleMultiPeer({
  server: Environment.SIGNALLER_URL,
  room: 'foobar',
});
