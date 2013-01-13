var controller = require('./controller');

module.exports = function(appium) {
  var rest = appium.rest
    , inject = function(req, res, next) {
        req.appium = appium;
        next();
      };

  // Make appium available to all REST http requests.
  rest.all('/wd/*', inject);

  rest.get('/wd/hub/status', controller.status);
  rest.post('/wd/hub/session', controller.createSession);
  rest.get('/wd/hub/session/:sessionId?', controller.getSession);
  rest.delete('/wd/hub/session/:sessionId?', controller.deleteSession);
  rest.post('/wd/hub/session/:sessionId?/execute', controller.executeScript);
  rest.post('/wd/hub/session/:sessionId?/elements', controller.findElements);
};