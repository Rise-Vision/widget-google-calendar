var system = require("system");
var e2ePort = system.env.E2E_PORT || 8099;
var url = "http://localhost:"+e2ePort+"/src/widget-e2e.html";

casper.test.begin("e2e Testing - Show end times for events longer than one hour", {
  setUp: function(test) {
    casper.options.clientScripts = [
      "test/data/show-end-extended.js",
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
        test.assertEquals(this.getHTML(".day:nth-child(1) .event:nth-child(3) .time"), this.evaluate(function() {
          return moment().hour(6).minute(30).second(0).format("h:mma");
        }), "Today's event has no end time");

        test.assertEquals(this.getHTML(".day:nth-child(3) .event:nth-child(1) .time"), this.evaluate(function() {
          return moment().hour(16).minute(0).second(0).format("h:mma") + " - " + moment().hour(19).minute(0).second(0).format("h:mma");
        }), "Event one week from now has an end time");

        test.assertEquals(this.getHTML(".day:nth-child(4) .event:nth-child(1) .time"), this.evaluate(function() {
          return moment().hour(7).minute(0).second(0).format("h:mma") + " - " + moment().hour(10).minute(30).second(0).format("h:mma");
        }), "Event 10 days from now has an end time");

        test.assertEquals(this.getHTML(".day:nth-child(5) .event:nth-child(1) .time"), this.evaluate(function() {
          return moment().hour(7).minute(0).second(0).format("h:mma");
        }), "Event 1 month from now has no end time");
      });
    });

    casper.run(function runTest() {
      test.done();
    });
  }
});
