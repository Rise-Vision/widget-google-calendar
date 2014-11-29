/* global moment */

var RiseVision = RiseVision || {};
RiseVision.Calendar = RiseVision.Calendar || {};
RiseVision.Calendar.Day = {};

RiseVision.Calendar.Day = function(params) {
  "use strict";

  var events;

  /*
   *  Public Methods
   */
  function set(calendarEvents) {
    events = calendarEvents;
  }

  function add(pos) {
    var i,
      length,
      date,
      currentDate = events[0].start.dateTime ? events[0].start.dateTime : events[0].start.date,
      $day = $(".day").eq(pos);

    if (params.dateRange === "day") {
      date = "Today";
    }
    else if (params.dateRange === "week") {
      if (moment(currentDate).isSame(moment(), "day")) {
        date = "Today";
      }
      else {
        date = moment(currentDate).format("dddd");
      }
    }
    else {
      date = moment(currentDate).format(params.dateFormat);
    }

    $day.find(".date").text(date);

    // Clone the UI for each additional event after the first.
    for (i = 1, length = events.length; i < length; i++) {
      $day.find(".event:first").clone().appendTo($day.find(".events"));
    }

    // Add all of the events for the current day.
    $.each(events, function(index, value) {
      RiseVision.Calendar.Event.addEvent($day, index, value, params.timeFormat, params.concealEndTime);
    });
  }

  return {
    addDay: add,
    setEvents: set
  };
};
