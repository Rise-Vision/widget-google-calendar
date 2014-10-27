"use strict";

describe("Google Calendar Settings", function() {
  beforeEach(module("risevision.widget.googleCalendar.settings"));

  var defaultSettings, $scope;

  beforeEach(function(){
    inject(function($injector,$rootScope, $controller){
      defaultSettings = $injector.get("defaultSettings");
      $scope = $rootScope.$new();
      $controller("calendarSettingsController", {$scope: $scope});
    });
  });

  it("should define defaultSettings",function(){
    expect(defaultSettings).to.be.truely;
    expect(defaultSettings).to.be.an("object");
  });

  xit('should define calendarSettingsController',function(){
    // TODO: test scope values
  });
});
