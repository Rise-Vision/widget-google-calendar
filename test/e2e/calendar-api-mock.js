(function (window) {
  "use strict";

  if (typeof window.gapi === "undefined") {
    window.gapi = {};
  }

  window.gapi.client = {
    load: function (name, version) {
      var promise = new Promise(function(resolve, reject) {
        resolve();
      });

      return promise;
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
      var promise = new Promise(function(resolve, reject) {
        var resp = {
          "result": {
            "items": [{
              "description": "Gen. Johnson </br>Col. Smith </br>Mr. John Adams </br>Mrs. Susan Johnson",
              "end": {
                "dateTime": "2014-10-23T07:30:00-04:00"
              },
              "location": "Arena",
              "start": {
                "dateTime": "2014-10-23T06:30:00-04:00"
              },
              "summary": "Secure welcomes Raytheon"
            }]
          }
        };

        resolve(resp);
      });

      return promise;
    }
  };

  init();
})(window);
