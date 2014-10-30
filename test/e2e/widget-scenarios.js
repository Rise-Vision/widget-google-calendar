casper.test.begin("Google Calendar Widget - e2e Testing", function (test) {
  var system = require("system");
  var e2ePort = system.env.E2E_PORT || 8099;

  casper.options.waitTimeout = 60000;

  casper.start("http://localhost:"+e2ePort+"/src/widget-e2e.html",
    function () {
      test.assertTitle("Google Calendar Widget", "Test page has loaded");
      //test.assertElementCount(".day", 1, "Check number of days");
      //test.assertElementCount(".event", 1, "Check number of events");
    }
  );

  casper.waitFor(
    function check() {
      return this.evaluate(function() {
        return document.querySelectorAll("li.day").length > 1;
      });
    },
    function then() {
      //test.assertSelectorHasText(".date", "Today");
    }
  );

  casper.run(function() {
    test.done();
  });
});
