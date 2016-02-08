/* jscs:disable requireTrailingComma */

var webdriverio = require('webdriverio');
var webdrivercss = require('webdrivercss');

var client = webdriverio.remote({
  desiredCapabilities: {
    browserName: 'firefox'
  }
});

webdrivercss.init(client, {
  screenshotRoot: 'tests/visual/logout/baseline',
  failedComparisonsRoot: 'tests/visual/logout/failures',
  screenWidth: [
    1200
  ]
});

client
  .init()
  .url('http://localhost:8080/logout')
  .webdrivercss('logout', [{
    name: 'header',
    elem: '.auth__header'
  }])
  .end();
