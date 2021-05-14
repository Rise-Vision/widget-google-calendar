var system = require("system");
var e2ePort = system.env.E2E_PORT || 8099;
var url = "http://localhost:"+e2ePort+"/src/widget-e2e.html";

casper.test.begin("e2e Testing - Hide Date, Time, Title, Location & Description", {
  setUp: function(test) {
    casper.options.clientScripts = [
      "node_modules/babel-polyfill/dist/polyfill.js"
      "test/data/hide-all-sections.js",
      "test/calendar-api-mock.js"
    ];
  },
  tearDown: function(test) {},
  test: function(test) {
    casper.start();

    casper.thenOpen(url, function () {
      test.assertTitle("Google Calendar Widget", "Test page has loaded");
    });

    casper.then(function () {
      casper.waitFor(function waitForUI() {
        return this.evaluate(function countDays() {
          return document.querySelectorAll(".day").length === 7;
        });
      },
      function then() {
        test.assertNotVisible(".date", "No dates are visible");
        test.assertNotVisible(".time", "No times are visible");
        test.assertNotVisible(".summary", "No titles are visible");
        test.assertNotVisible(".location", "No locations are visible");
        test.assertNotVisible(".description", "No descriptions are visible");
      });
    });

    casper.run(function runTest() {
      test.done();
    });
  }
});
