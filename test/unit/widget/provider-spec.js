"use strict";

describe("Widget: RiseVision.Calendar.Provider", function() {
  it("should exist", function() {
    expect(RiseVision.Calendar.Provider).not.to.equal(null);
    expect(RiseVision.Calendar.Provider).to.be.an("object");
    expect(RiseVision.Calendar.Provider.getEventsList).to.be.a("function");
  });

  it("should return correct number of events when the date range is 'day'", function() {
    var params = {
      "dateRange": "day"
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

  it("should return correct number of events when the date range is 'week'", function() {
    var params = {
      "dateRange": "week"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(6);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return correct number of events when the date range is '8days'", function() {
    var params = {
      "dateRange": "8days"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(6);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return correct number of events when the date range is '9days'", function() {
    var params = {
      "dateRange": "9days"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(6);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return correct number of events when the date range is '10days'", function() {
    var params = {
      "dateRange": "10days"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(7);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return correct number of events when the date range is '11days'", function() {
    var params = {
      "dateRange": "11days"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(7);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return correct number of events when the date range is '12days'", function() {
    var params = {
      "dateRange": "12days"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(7);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return correct number of events when the date range is '13days'", function() {
    var params = {
      "dateRange": "13days"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(7);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return correct number of events when the date range is '14days'", function() {
    var params = {
      "dateRange": "14days"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(7);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return correct number of events when the date range is '15days'", function() {
    var params = {
      "dateRange": "15days"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(7);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return correct number of events when the date range is 'month'", function() {
    var params = {
      "dateRange": "month"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(8);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return correct number of events when the date range is '6months'", function() {
    var params = {
      "dateRange": "6months"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(9);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });

  it("should return correct number of events when the date range is '12months'", function() {
    var params = {
      "dateRange": "12months"
    };

    function onSuccess(resp) {
      expect(resp).to.exist;
      expect(resp.result).to.exist;
      expect(resp.result.items).to.exist;
      expect(resp.result.items).to.have.length(10);
    }

    RiseVision.Calendar.Provider.getEventsList(params, {
      "success": onSuccess
    });
  });
});
