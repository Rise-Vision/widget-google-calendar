/* global gadgets, moment, gapi */

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
    prefs = new gadgets.Prefs(),
    $container = $("#container");

  /*
   *  Private Methods
   */
  function getEventsList() {
    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": addEvents,
      "error": function(reason) {
        console.log("Error: " + reason.result.error.message);

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
      currentDay,
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
        currentEvents = _.filter(events, function(event) {
           return moment(event.start.dateTime).isSame(currentDay, "day");
        });

        if (currentEvents.length > 0) {
          // Create RiseVision.Calendar.Day object and set events for it.
          calendarDay = new RiseVision.Calendar.Day(params);
          calendarDay.setEvents(currentEvents);
          calendarDays.push(calendarDay);

          // Remove all events for the current day from the remaining events.
          events = _.filter(events, function(event) {
            return !moment(event.start.dateTime).isSame(currentDay, "day");
          });
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

    daysNode.appendChild(dayFragment);

    // Add events for each day.
    for (i = 0, length = calendarDays.length; i < length; i++) {
      calendarDays[i].addDay(params, i);
    }

    timeoutID = setTimeout(function() {
      isExpired = true;

      // Refresh immediately if the content is not scrolling.
      if (!$container.data("plugin_autoScroll").canScroll()) {
        refresh();
      }
    }, delay);

    if (isLoading) {
      $container.autoScroll(params.scroll)
        .on("done", function() {
          refresh();
          done();
        });

      isLoading = false;
      ready();
    }
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
  function getAdditionalParams(name, value) {
    if (name === "additionalParams" && value) {
      params = JSON.parse(value);

      // Store the base HTML in a DocumentFragment so that it can be used later.
      fragment = document.createDocumentFragment();
      daysNode = document.getElementById("days");

      // Add the HTML to the fragment.
      while (daysNode.firstChild) {
        fragment.appendChild(daysNode.firstChild);
      }

      $container.height(prefs.getInt("rsH"));
      getEventsList();
    }
  }

  function play() {
    $container.data("plugin_autoScroll").play();
  }

  function pause() {
    $container.data("plugin_autoScroll").pause();
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
