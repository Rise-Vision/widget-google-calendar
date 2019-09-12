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
              "location": "Gymnasium",
              "start": {
                "dateTime": moment().hour(6).minute(30).second(0).format()
              },
              "summary": "Secure welcomes Raytheon"
            },
            {
              "description": "Our weekly football game. &lt;/br&gt; All proceeds go to charity &amp; volunteers welcome.",
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
              "description": "Lacrosse Training with Dr. Anderson",
              "end": {
                "dateTime": moment().hour(10).minute(30).second(0).add(9, "days").format()
              },
              "location": "Lacrosse Court",
              "start": {
                "dateTime": moment().hour(7).minute(0).second(0).add(9, "days").format()
              },
              "summary": "All Lacrosse team members are expected to attend training every Monday."
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
            },
            {
              "description": "This occurs all day today.",
              "end": {
                "date": moment().add(1, "days").format("YYYY-MM-DD")
              },
              "location": "Conference Room B",
              "start": {
                "date": moment().format("YYYY-MM-DD")
              },
              "summary": "Single Day Event (All Day)"
            },
            {
              "description": "This occurs all day today and tomorrow.",
              "end": {
                "date": moment().add(2, "days").format("YYYY-MM-DD")
              },
              "location": "Everywhere",
              "start": {
                "date": moment().add(-4, "days").format("YYYY-MM-DD")
              },
              "summary": "Multi-Day Event (All Day)"
            },
            {
              "description": "This occurs today and tomorrow from 10 to 11.",
              "end": {
                "dateTime": moment().hour(11).minute(0).second(0).add(1, "days").format()
              },
              "location": "Here",
              "start": {
                "dateTime": moment().hour(10).minute(0).second(0).add(-4, "days").format()
              },
              "summary": "Multi-Day Event (not All Day)"
            },{
              "description": "This occurs from today 11:30pm to tomorrow 12:30am.",
              "end": {
                "dateTime": moment().hour(0).minute(30).second(0).add(1, "days").format()
              },
              "location": "Somewhere",
              "start": {
                "dateTime": moment().hour(23).minute(30).second(0).format()
              },
              "summary": "Single Day Event (Over two days)"
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
