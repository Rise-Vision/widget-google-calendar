require('es6-promise').polyfill();

var system = require("system");
var e2ePort = system.env.E2E_PORT || 8099;
var url = "http://localhost:"+e2ePort+"/src/widget-e2e.html";

casper.test.begin("e2e Testing - Undefined settings for newer fields", {
  setUp: function(test) {
    casper.options.clientScripts = [
      "test/data/undefined-settings.js",
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
        test.assertElementCount(".event", 12, "All events are visible, even those that have completed");

        test.assertSelectorHasText(".day:nth-child(3) .event:nth-child(1) .time", this.evaluate(function() {
          return moment().hour(16).minute(0).second(0).format("h:mma") + " - " + moment().hour(19).minute(0).second(0).format("h:mma");
        }), "Time includes end date");

        test.assertVisible(".date", "Dates are visible");
        test.assertVisible(".time", "Times are visible");
        test.assertVisible(".summary", "Titles are visible");
        test.assertVisible(".location", "Locations are visible");
        test.assertVisible(".description", "Descriptions are visible");
      });
    });

    casper.run(function runTest() {
      test.done();
    });
  }
});
