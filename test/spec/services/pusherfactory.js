'use strict';

describe('Service: PusherFactory', function () {

  // load the service's module
  beforeEach(module('frontendTaxiApp'));

  // instantiate service
  var PusherFactory, $window;
  beforeEach(inject(function (_PusherFactory_, $injector) {
    PusherFactory = _PusherFactory_;
    $window = $injector.get('$window');
  }));

  it('should actually be Pusher', function () {
    expect(PusherFactory).toBe($window.Pusher);
  });

});
