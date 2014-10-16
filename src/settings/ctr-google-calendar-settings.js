angular.module("risevision.widget.googleCalendar.settings")
  .controller("calendarSettingsController", ["$scope", "$translate",
    function ($scope, $translate) {

      $scope.formats = [];
      $scope.showDateFormat = false;
      $scope.currentFormat = null;

      function getFormatLabel(format, monthNames) {
        var date = new Date(),
          label;

        switch(format) {
          case "dd/mm/yy":
            label = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear().toString().slice(2,4);
            break;
          case "mm/dd/yy":
            label = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(2,4);
            break;
          case "yy/mm/dd":
            label = date.getFullYear().toString().slice(2,4) + "/" + date.getMonth() + "/" + date.getDate();
            break;
          case "MMMM dd, yyyy":
            label = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
            break;
          case "dd-MMM-yyyy":
            label = date.getDate() + "-" + monthNames[date.getMonth()].slice(0,3) + "-" + date.getFullYear();
            break;
          default:
            break;
        }

        return label;
      }

      $translate(["month-names.jan", "month-names.feb", "month-names.mar", "month-names.apr", "month-names.may",
        "month-names.jun", "month-names.jul", "month-names.aug", "month-names.sep", "month-names.oct", "month-names.nov",
        "month-names.dec"])
        .then(function (translation) {
          var opts = ["dd/mm/yy", "mm/dd/yy", "yy/mm/dd", "MMMM dd, yyyy", "dd-MMM-yyyy"],
            monthNames = [];

          $.each(translation, function(key, value) {
            monthNames.push(value);
          });

          $.each(opts, function (index, format) {
            var label = getFormatLabel(format, monthNames);
            $scope.formats.push({
              label: label,
              value: format
            });
          });

          if (!$scope.currentFormat) {
            $scope.currentFormat = $scope.formats[0];
          }

      });

      $scope.$watch("settings.additionalParams.dateFormat", function (format) {
        if (typeof format !== "undefined" && format) {
          $scope.currentFormat = format;
        }
      });

      $scope.$watch("settings.additionalParams.dateRange", function (range) {
        if (range && range !== "day" && range !== "week") {
          if (!$scope.getAdditionalParam("dateFormat", null)) {
            // set a default selection
            $scope.setAdditionalParam("dateFormat", $scope.currentFormat);
          }
          $scope.showDateFormat = true;
        } else {
          $scope.showDateFormat = false;

          if ($scope.settings.additionalParams.hasOwnProperty("dateFormat")) {
            delete $scope.settings.additionalParams.dateFormat;
          }
        }
      });

    }])
  .value("defaultSettings", {
    params: {},
    additionalParams: {
      calendar: "",
      scroll: {},
      dateRange: "day",
      dateFont: {},
      timeFont: {},
      timeFormat: "12hour",
      titleFont: {},
      locationFont: {},
      descriptionFont: {}
    }
  });
