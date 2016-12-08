'use strict';

describe('Local Storage', function () {
  // load the service's module
  beforeEach(module('frontendTaxiApp'));

  var ls;
  beforeEach(inject(function (_localStorageService_) {
    ls = _localStorageService_;
  }));

  it("should be defined", function () {
    expect(ls).not.toBe(undefined);
  });

  it("should store values", function () {
    ls.set("testKey","testValue");
    expect(ls.get("testKey")).toEqual("testValue");
  })

  it("should remove values", function () {
    ls.set("testKey","testValue");
    ls.remove("testKey");
    expect(ls.get("testKey")).toEqual(null);
  })
});
