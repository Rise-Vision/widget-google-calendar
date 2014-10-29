"use strict";

describe("Widget: RiseVision.Calendar.Provider", function() {
  it("should exist", function() {
    expect(RiseVision.Calendar.Provider).not.to.equal(null);
    expect(RiseVision.Calendar.Provider).to.be.an("object");
    expect(RiseVision.Calendar.Provider.getEventsList).to.be.a("function");
  });

  it("should return 1 event when the date range is 'day'", function() {
    var params = {
      "dateRange": "day"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(1);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return 2 events when the date range is 'week'", function() {
    var params = {
      "dateRange": "week"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(2);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return 3 events when the date range is 'month'", function() {
    var params = {
      "dateRange": "month"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(3);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return 4 events when the date range is '6months'", function() {
    var params = {
      "dateRange": "6months"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(4);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return 5 events when the date range is '12months'", function() {
    var params = {
      "dateRange": "12months"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(5);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });
});
