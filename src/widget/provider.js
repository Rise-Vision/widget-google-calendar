/* global moment, gapi, gadgets, config */
/* exported init */

var RiseVision = RiseVision || {};
RiseVision.Calendar = RiseVision.Calendar || {};
RiseVision.Calendar.Provider = {};

RiseVision.Calendar.Provider = (function () {
  "use strict";

  /*
   *  Public Methods
   */
  function get(params, callbacks) {
    var timeMin = moment().hour(0).minute(0).format(),
      timeMax = moment().hour(23).minute(59),
      request;

    // Filtering
    switch (params.dateRange) {
      case "day":
        timeMax = timeMax.format();
        break;
      case "week":
        timeMax = timeMax.add(6, "days").format();
        break;
      case "month":
        timeMax = timeMax.add(1, "months").format();
        break;
      case "6months":
        timeMax = timeMax.add(6, "months").format();
        break;
      case "12months":
        timeMax = timeMax.add(12, "months").format();
        break;
      default:
        timeMax = timeMax.format();
    }

    // Get events on the specified calendar.
    request = gapi.client.calendar.events.list({
      "calendarId":   params.calendar,
      "singleEvents": true,
      "timeMin":      timeMin,
      "timeMax":      timeMax,
      "orderBy":      "startTime"
    });

    request.then(function(resp) {
      if (callbacks && callbacks.success && typeof(callbacks.success) === "function") {
        callbacks.success(resp);
      }
    }, function(reason) {
        if (callbacks && callbacks.error && typeof(callbacks.error) === "function") {
          callbacks.error(reason);
        }
      }
    );
  }

  return {
    "getEventsList": get
  };
})();

function init() {
  var prefs = new gadgets.Prefs(),
    id = prefs.getString("id");

  gapi.client.setApiKey(config.apiKey);

  gapi.client.load("calendar", "v3").then(function() {
    gadgets.rpc.register("rsparam_set_" + id, RiseVision.Calendar.getAdditionalParams);
    gadgets.rpc.call("", "rsparam_get", null, id, ["additionalParams"]);
  });
}
