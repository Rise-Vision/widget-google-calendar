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
        $(".error").show();
        console.log("Error retrieving calendar data: " + reason.result.error.message);

        if (isLoading) {
          isLoading = false;
          ready();
        }
      }
    });
  }

  function addEvents(resp) {
    var i,
      length,
      lastDay,
      currentEvents,
      calendarDay,
      calendarDays = [],
      dayFragment,
      delay = 300000, /* 5 minutes */
      events = resp.result.items;

    $("#days").empty();

    if (events.length > 0) {
      lastDay = moment(events[events.length - 1].start.dateTime);

      // Process all events that fall on or before lastDay.
      while (events.length > 0) {
        currentDay = moment(events[0].start.dateTime);

        // Get all events for the current day.
        currentEvents = _.filter(events, getCurrentEvents);

        if (currentEvents.length > 0) {
          // Create RiseVision.Calendar.Day object and set events for it.
          calendarDay = new RiseVision.Calendar.Day(params);
          calendarDay.setEvents(currentEvents);
          calendarDays.push(calendarDay);

          // Remove all events for the current day from the remaining events.
          events = _.filter(events, removeCurrentEvents);
        }
        else {
          // This should never happen, but exit loop just in case.
          break;
        }
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

    timeoutID = setTimeout(function() {
      isExpired = true;

      // Refresh immediately if the content is not scrolling.
      if (!$container.data("plugin_autoScroll").canScroll()) {
        refresh();
      }
    }, delay);

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

  function getCurrentEvents(event) {
    return moment(event.start.dateTime).isSame(currentDay, "day");
  }

  function removeCurrentEvents(event) {
    return !moment(event.start.dateTime).isSame(currentDay, "day");
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
