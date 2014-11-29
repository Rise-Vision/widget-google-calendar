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
    var timeMin = moment().hour(0).minute(0).second(0).format(),
      timeMax = moment().hour(23).minute(59).second(59),
      request;

    // Filtering
    switch (params.dateRange) {
      case "day":
        timeMax = timeMax.format();
        break;
      case "week":
        timeMax = timeMax.add(6, "days").format();
        break;
      case "8days":
          timeMax = timeMax.add(7, "days").format();
          break;
      case "9days":
          timeMax = timeMax.add(8, "days").format();
          break;
      case "10days":
          timeMax = timeMax.add(9, "days").format();
          break;
      case "11days":
          timeMax = timeMax.add(10, "days").format();
          break;
      case "12days":
          timeMax = timeMax.add(11, "days").format();
          break;
      case "13days":
          timeMax = timeMax.add(12, "days").format();
          break;
      case "14days":
          timeMax = timeMax.add(13, "days").format();
          break;
      case "15days":
          timeMax = timeMax.add(14, "days").format();
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
        // The API is returning a date range that is one day too many for "All
        // day" events. Set the correct end date.
        $.each(resp.result.items, function(index, value) {
          // This is an "All Day" event.
          if (value.end && value.end.date) {
            value.end.date = moment(value.end.date).add(-1, "days").format("YYYY-MM-DD");
          }
        });

        callbacks.success(resp, timeMin, timeMax);
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
