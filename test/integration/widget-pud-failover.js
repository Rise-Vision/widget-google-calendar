var system = require("system");
var e2ePort = system.env.E2E_PORT || 8099;
var url = "http://localhost:"+e2ePort+"/src/widget-e2e.html";

casper.on("remote.message", function(message) {
  this.echo(message);
});

casper.test.begin("Integration Testing - PUD Failover", {
  setUp: function(test) {
    casper.options.clientScripts = [
      "test/data/pud-failover.js",
      "test/calendar-api-mock.js",
      "node_modules/sinon/pkg/sinon.js"
    ];

    casper.options.viewportSize = { width: 800, height: 1600 };
  },
  test: function(test) {
    var clock, calendar;

    casper.start();

    casper.thenOpen(url, function() {
      test.assertTitle("Google Calendar Widget", "Test page has loaded");

      this.evaluate(function() {
        clock = sinon.useFakeTimers();
        calendar = RiseVision.Calendar;

        // Ensure the PUD timer is cleared.
        calendar.pause();
      });
    });

    casper.then(function() {
      var spyCalledTwice = this.evaluate(function() {
        var playSpy = sinon.spy(calendar, "play");

        calendar.play();

        // Advance clock so that PUD timer fires.
        clock.tick(10000);

        // When PUD timer fires, it should trigger the "done" event, which in turn will tell the
        // Widget to play.
        return playSpy.calledTwice;
      });

      test.assert(spyCalledTwice, "PUD timer fired");
    });

    casper.run(function runTest() {
      test.done();
    });
  }
});
