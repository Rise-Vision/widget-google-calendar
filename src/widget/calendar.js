/* global gadgets, moment, _ */

var RiseVision = RiseVision || {};
RiseVision.Calendar = {};

RiseVision.Calendar = (function (gadgets) {
  "use strict";

  var params,
    timeoutID,
    fragment,
    daysNode,
    isLoading = true,
    isExpired = false,
    currentDay,
    prefs = new gadgets.Prefs(),
    utils = RiseVision.Common.Utilities,
    $container = $("#container");

  /*
   *  Private Methods
   */
  function getEventsList() {
    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": addEvents,
      "error": function(reason) {
        if (reason && reason.result && reason.result.error) {
          if (reason.result.error.message) {
            console.log("Error retrieving calendar data: " + reason.result.error.message);
          }

          // Network error. Retry later.
          if (reason.result.error.code && reason.result.error.code === -1) {
            startTimer();
          }
          else {
            $(".error").show();
          }
        }

        if (isLoading) {
          isLoading = false;
          ready();
        }
      }
    });
  }

  function addEvents(resp, timeMin, timeMax) {
    var i,
      length,
      currentEvents,
      calendarDay,
      calendarDays = [],
      dayFragment,
      events = resp.result.items;

    $("#days").empty();

    if (events.length > 0) {
      var start, end, newEvent, newEvents = [], newEnd,
        range = moment().range(timeMin, timeMax);

      // Check if there are any events that span multiple days.
      for (i = events.length - 1; i >= 0; i--) {
        // Single event or multi-day event that is not All Day.
        if (events[i].start.dateTime) {
          start = moment(events[i].start.dateTime);
        }
        // All day event that may or may not span multiple days.
        else {
          start = moment(events[i].start.date);
        }

        // Single event or multi-day event that is not All Day.
        if (events[i].end.dateTime) {
          end = moment(events[i].end.dateTime);

          // If the start and end dates are the same, this is not a multi-day event.
          if (start.isSame(end, "day")) {
            continue;
          }
        }
        // All day event that may or may not span multiple days.
        else {
          end = moment(events[i].end.date);
        }

        // Ignore any events falling on days that started before timeMin.
        if (moment(start).isBefore(timeMin)) {
          start = moment(timeMin).hour(start.hour()).minute(start.minute()).second(start.second());
        }

        /* Create separate events for a multi-day event so that they will be
           displayed for every day on which they take place. */
        while (range.contains(start) && (start.isBefore(end) || start.isSame(end))) {
          newEvent = {};
          newEvent.start = {};
          newEvent.end = {};
          newEvent.summary = events[i].summary;
          newEvent.description = events[i].description;
          newEvent.location = events[i].location;
          newEnd = moment(start).hour(end.hour()).minute(end.minute()).second(end.second()).format();

          // Events than span multiple days will not show times.
          newEvent.start.date = start.format();
          newEvent.end.date = newEnd;

          newEvents.push(newEvent);
          start.add(1, "days");
        }

        // Now remove the original event.
        events.splice(i, 1);
      }

      // Add the new events.
      events.push.apply(events, newEvents);

      // Sort the events by startTime since multi-day events were added to the end.
      events =  _.sortBy(events, function(event) {
        if (event.start.dateTime) {
          return new Date(event.start.dateTime).getTime();
        }
        else {
          return new Date(event.start.date).getTime();
        }
      });

      while (events.length > 0) {
        if (events[0].start.dateTime) {
          currentDay = moment(events[0].start.dateTime);
        }
        else {
          currentDay = moment(events[0].start.date);
        }

        // Get all events for the current day.
        currentEvents = _.filter(events, getCurrentEvents);

        /* conditionally eliminate events for which end dates are in the past */
        if (params.concealPastEvents === "always") {
          currentEvents = _.filter(currentEvents, removeTodaysCompletedEvents);
        }

        if (currentEvents.length > 0) {
          // Create RiseVision.Calendar.Day object and set events for it.
          calendarDay = new RiseVision.Calendar.Day(params);
          calendarDay.setEvents(currentEvents);
          calendarDays.push(calendarDay);
        }

        // Remove all events for the current day from the remaining events.
        events = _.filter(events, removeCurrentEvents);
      }
    }

    // Clone the UI for each day.
    dayFragment = document.createDocumentFragment();

    for (i = 0, length = calendarDays.length; i < length; i++) {
      dayFragment.appendChild(fragment.cloneNode(true));
    }

    if (daysNode) {
      daysNode.appendChild(dayFragment);
    }

    // Add events for each day.
    for (i = 0, length = calendarDays.length; i < length; i++) {
      calendarDays[i].addDay(i);
    }

    startTimer();

    if (isLoading) {
      if ($container) {
        $container.autoScroll(params.scroll)
          .on("done", function() {
            refresh();
            done();
          });
      }

      isLoading = false;
      ready();
    }
  }


  function removeTodaysCompletedEvents (event) {
    var now = moment();
    if (event.start && event.end && event.start.dateTime && event.end.dateTime) {
      if (now.isAfter(moment(event.end.dateTime))) {
        return false;
      }
    }
    return true;
  }
  
  function getCurrentEvents(event) {
    if (event.start.dateTime) {
      return moment(event.start.dateTime).isSame(currentDay, "day");
    }
    else {
      return moment(event.start.date).isSame(currentDay, "day");
    }
  }

  function removeCurrentEvents(event) {
    if (event.start.dateTime) {
      return !moment(event.start.dateTime).isSame(currentDay, "day");
    }
    else {
      return !moment(event.start.date).isSame(currentDay, "day");
    }
  }

  function startTimer() {
    var delay = 300000; /* 5 minutes */

    timeoutID = setTimeout(function() {
      isExpired = true;

      // Refresh immediately if the content is not scrolling.
      if (!$container.data("plugin_autoScroll").canScroll()) {
        refresh();
      }
    }, delay);
  }

  function refresh() {
    if (isExpired) {
      getEventsList();
      isExpired = false;
    }
  }

  function ready() {
    gadgets.rpc.call("", "rsevent_ready", null, prefs.getString("id"), true,
      true, true, true, true);
  }

  function done() {
    gadgets.rpc.call("", "rsevent_done", null, prefs.getString("id"));
  }

  /*
   *  Public Methods
   */
  function getAdditionalParams(names, values) {
    if (Array.isArray(names) && names.length > 0 && names[0] === "additionalParams") {
      if (Array.isArray(values) && values.length > 0) {
        params = JSON.parse(values[0]);

        // Load fonts.
        var fontSettings = [
          {
            "class": "date",
            "fontSetting": params.dateFont
          },
          {
            "class": "time",
            "fontSetting": params.timeFont
          },
          {
            "class": "summary",
            "fontSetting": params.titleFont
          },
          {
            "class": "location",
            "fontSetting": params.locationFont
          },
          {
            "class": "description",
            "fontSetting": params.descriptionFont
          }
        ];

        utils.loadFonts(fontSettings);

        // Store the base HTML in a DocumentFragment so that it can be used later.
        fragment = document.createDocumentFragment();
        daysNode = document.getElementById("days");

        // Add the HTML to the fragment.
        if (daysNode) {
          while (daysNode.firstChild) {
            fragment.appendChild(daysNode.firstChild);
          }
        }

        $container.height(prefs.getInt("rsH"));
        getEventsList();
      }
    }
  }

  function play() {
    if ($container.data("plugin_autoScroll")) {
      $container.data("plugin_autoScroll").play();
    }
  }

  function pause() {
    if ($container.data("plugin_autoScroll")) {
      $container.data("plugin_autoScroll").pause();
    }
  }

  function stop() {
    // Ideally, the Widget should destroy itself, but unable to do so right now
    // since `stop` is being called by RVA instead of `pause` when it's the only
    // item in a Playlist.
    pause();
  }

  return {
    getAdditionalParams: getAdditionalParams,
    play               : play,
    pause              : pause,
    stop               : stop
  };
})(gadgets);
