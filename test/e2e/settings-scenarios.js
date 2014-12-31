/* jshint expr: true */

(function () {
  "use strict";

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;

  browser.driver.manage().window().setSize(1024, 768);

  describe("Google Calendar Settings - e2e Testing", function() {
    beforeEach(function () {
      browser.get("/src/settings-e2e.html");
    });

    it("Should load all components", function () {
      // scroll setting component
      expect(element(by.id("scroll-by")).isPresent()).
        to.eventually.be.true;

    });

    it("Should correctly load default settings", function () {
      //scroll disabled
      expect(element(by.id("scroll-by")).getAttribute("value")).
        to.eventually.equal("none");

      expect(element(by.id("dateRange")).getAttribute("value")).
        to.eventually.equal("day");

      expect(element(by.id("dateFormat")).isDisplayed()).
        to.eventually.be.false;

    });

    it("Should show invalid form", function () {
      expect(element(by.css("form[name=settingsForm].ng-invalid")).isPresent()).
        to.eventually.be.true;

      expect(element(by.css("form[name=settingsForm].ng-valid")).isPresent()).
        to.eventually.be.false;

      expect(element(by.css(".text-danger")).isDisplayed()).
        to.eventually.be.true;

      // save button should be disabled
      expect(element(by.css("button#save[disabled=disabled")).isPresent()).
        to.eventually.be.true;
    });

    it("Should display Date Format selection", function () {
      // simulate choosing "12 months" from Date Range select field
      element(by.cssContainingText("option", "12 Months")).click();

      expect(element(by.id("dateRange")).getAttribute("value")).
        to.eventually.equal("12months");

      expect(element(by.id("dateFormat")).isDisplayed()).
        to.eventually.be.true;
    });

    it("Should show valid form", function () {
      var calendarId = "mycalendarid";

      expect(element(by.css("input[name=calendar]")).getAttribute("value")).
        to.eventually.equal("");

      // simulate entering a calendar id
      element(by.css("input[name=calendar]")).sendKeys(calendarId);

      // test that it's actually entered
      expect(element(by.css("input[name=calendar]")).getAttribute("value")).
        to.eventually.equal(calendarId);

      expect(element(by.css("form[name=settingsForm].ng-invalid")).isPresent()).
        to.eventually.be.false;

      expect(element(by.css("form[name=settingsForm].ng-valid")).isPresent()).
        to.eventually.be.true;

      expect(element(by.css(".text-danger")).isDisplayed()).
        to.eventually.be.false;

      // save button should be enabled
      expect(element(by.css("button#save[disabled=disabled")).isPresent()).
        to.eventually.be.false;

    });

    it("Should correctly save settings", function (done) {
      var calendarId = "mycalendarid";
      var settings = {
        params: {},
        additionalParams: {
          "calendar": calendarId,
          "scroll": {
            "by":"none",
            "speed":"medium",
            "pause":5
          },
          "dateRange": "day",
          "dateFont": {
            "bold":true,
            "font": {
              "type": "standard",
              "name": "Verdana",
              "family":"Verdana"
            },
            "size":"20",
            "italic":false,
            "underline":false,
            "color":"black",
            "highlightColor":"transparent"
          },
          "timeFont": {
            "bold":true,
            "font": {
              "type": "standard",
              "name": "Verdana",
              "family":"Verdana"
            },
            "size":"20",
            "italic":false,
            "underline":false,
            "color":"black",
            "highlightColor":"transparent"
          },
          "timeFormat": "12hour",
          //"concealEndTime": "never",
          "titleFont": {
            "bold":true,
            "font": {
              "type": "standard",
              "name": "Verdana",
              "family":"Verdana"
            },
            "size":"20",
            "italic":false,
            "underline":false,
            "color":"black",
            "highlightColor":"transparent"
          },
          "locationFont": {
            "bold":true,
            "font": {
              "type": "standard",
              "name": "Verdana",
              "family":"Verdana"
            },
            "size":"20",
            "italic":false,
            "underline":false,
            "color":"black",
            "highlightColor":"transparent"
          },
          "descriptionFont": {
            "size":"18",
            "font": {
              "type": "standard",
              "name": "Verdana",
              "family":"Verdana"
            },
            "bold":false,
            "italic":false,
            "underline":false,
            "color":"black",
            "highlightColor":"transparent"
          }
        }
      };

      // simulate entering a calendar id
      element(by.css("input[name=calendar]")).sendKeys(calendarId);

      element(by.id("save")).click();

      expect(browser.executeScript("return window.result")).to.eventually.deep.equal(
        {
          'additionalParams': JSON.stringify(settings.additionalParams),
          'params': ''
        });
    });

  });

})();
