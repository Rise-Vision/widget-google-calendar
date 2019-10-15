/* global moment */

var RiseVision = RiseVision || {};
RiseVision.Calendar = RiseVision.Calendar || {};
RiseVision.Calendar.Event = {};

RiseVision.Calendar.Event = (function () {
  "use strict";

  /*
   *  Public Methods
   */
  function add($day, pos, event, params) {
    var timeFormat = params.timeFormat,
      showEnd = params.showEnd,
      duration = 0;

    if (params.showTime === undefined || params.showTime) {
      if (timeFormat === "12hour") {
        timeFormat = "h:mma";
      }
      else {
        timeFormat = "HH:mm";
      }

      // Start and End Times
      if (event.start && event.end && event.start.dateTime && event.end.dateTime) {
        if (showEnd !== undefined && (showEnd === "hour" || showEnd === "extended")) {
          // Event duration in minutes.
          duration = Math.round(moment(event.end.dateTime).diff(moment(event.start.dateTime)) / 60000);

          // For events exactly one hour long.
          if (showEnd === "hour" && duration === 60) {
            showEnd = "always";
          }
          // For events longer than one hour.
          else if (showEnd === "extended" && duration > 60) {
            showEnd = "always";
          }
        }

        if (showEnd === undefined || showEnd === "always") {
          $day.find(".time").eq(pos).text(moment(event.start.dateTime).format(timeFormat) +
            " - " + moment(event.end.dateTime).format(timeFormat));
        }
        else {
          $day.find(".time").eq(pos).text(moment(event.start.dateTime).format(timeFormat));
        }
      }
    }
    else {
      $day.find(".time").eq(pos).hide();
    }

    if ((params.showTitle === undefined || params.showTitle) && event.summary) {
      $day.find(".summary").eq(pos).html(event.summary);
    }
    else {
      $day.find(".summary").eq(pos).hide();
    }

    if ((params.showLocation === undefined || params.showLocation) && event.location) {
      $day.find(".location").eq(pos).html(event.location);
    }
    else {
      $day.find(".location").eq(pos).hide();
    }

    if ((params.showDescription === undefined || params.showDescription) && event.description) {
      $day.find(".description").eq(pos).html(event.description);
    }
    else {
      $day.find(".description").eq(pos).hide();
    }
  }

  return {
    addEvent: add
  };
})();
