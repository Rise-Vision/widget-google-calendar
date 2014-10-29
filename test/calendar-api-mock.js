(function (window) {
  "use strict";

  if (typeof window.gapi === "undefined") {
    window.gapi = {};
  }

  window.gapi.client = {
    load: function (name, version) {
      return {
        then: function(onFulfilled, onRejected) {
          if (onFulfilled) {
            onFulfilled();
          }
        }
      };
    },
    setApiKey: function (apiKey) {}
  };

  if (typeof gapi.client.calendar === "undefined") {
    gapi.client.calendar = {};
  }

  if (typeof gapi.client.calendar.events === "undefined") {
    gapi.client.calendar.events = {};
  }

  gapi.client.calendar.events = {
    list: function (params) {
      var timeMin = params.timeMin,
        timeMax = params.timeMax;

      return {
        then: function (onFulfilled, onRejected) {
          var data = [
            {
              "description": "Gen. Johnson </br>Col. Smith </br>Mr. John Adams </br>Mrs. Susan Johnson",
              "end": {
                "dateTime": moment().hour(7).minute(30).second(0).format()
              },
              "start": {
                "dateTime": moment().hour(6).minute(30).second(0).format()
              },
              "summary": "Secure welcomes Raytheon"
            },
            {
              "description": "Our weekly football game. All proceeds go to charity.",
              "end": {
                "dateTime": moment().hour(19).minute(0).second(0).add(6, "days").format()
              },
              "location": "Arena",
              "start": {
                "dateTime": moment().hour(16).minute(0).second(0).add(6, "days").format()
              },
              "summary": "Football Game"
            },
            {
              "end": {
                "dateTime": moment().hour(8).minute(0).second(0).add(1, "months").format()
              },
              "start": {
                "dateTime": moment().hour(7).minute(0).second(0).add(1, "months").format()
              },
              "summary": "Faculty Breakfast"
            },
            {
              "end": {
                "dateTime": moment().hour(13).minute(0).second(0).add(6, "months").format()
              },
              "start": {
                "dateTime": moment().hour(12).minute(0).second(0).add(6, "months").format()
              },
              "summary": "Lunch Time for everyone!"
            },

            {
              "description": "Our world famous diagnostician team takes your questions.",
              "end": {
                "dateTime": moment().hour(10).minute(30).second(0).add(12, "months").format()
              },
              "location": "Clinic - 4th Floor",
              "start": {
                "dateTime": moment().hour(9).minute(30).second(0).add(12, "months").format()
              },
              "summary": "Diagnostician Teaching Hour"
            }
          ];

          var items = [];

          // Filter data by date.
          data.forEach(function(value, index) {
            if ((moment(value.end.dateTime).isAfter(timeMin) || moment(value.end.dateTime).isSame(timeMin))
              && moment(value.start.dateTime).isBefore(timeMax)) {
              items.push(value);
            }
          });

          var resp = {
            "result": {
              "items": items
            }
          };

          if (onFulfilled) {
            onFulfilled(resp);
          }
        }
      };
    }
  };

  init();
})(window);
