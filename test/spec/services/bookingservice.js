'use strict';

describe('Service: BookingService', function () {
  // load the service's module
  beforeEach(module('frontendTaxiApp'));

  var remoteAddress;
  var responseMessage = 'Some useful actions suppose to happen in here';
  var testSrcLocation = {latitude: 45.123123, longitude: 123.456}
  var testTgtLocation = {latitude: 45.123123, longitude: 123.456}
  // instantiate service
  var $httpBackend, $controller, $rootScope, createController, bookingService;

  beforeEach(inject(function (_BookingService_,$injector, _ENV_) {
    remoteAddress = _ENV_.apiEndpoint + "/booking";
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    createController = function () {
      return $controller('OrderCtrl', {'$scope': $rootScope});
    };
    bookingService = _BookingService_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should send post request on submission', function () {
    var controller = createController();
    controller.pickupLocation = testSrcLocation;
    controller.destinationLocation = testTgtLocation;
    controller.submit();
    $httpBackend.expectPOST(remoteAddress).respond(201, '');
    $httpBackend.flush()
  })

  it('should generate different uuid every time', function () {
    for (var i = 0; i < 20; i++) {
      var first_uuid = bookingService.uuid();
      var second_uuid = bookingService.uuid();
      expect(first_uuid).not.toEqual(second_uuid);
    }
  })

  // can be used when backend will return something meaningful
  // it('should respond with waiting message', function () {
  //   $httpBackend.when('POST', remoteAddress).respond(201, {message: responseMessage})
  //   var controller = createController()
  //   controller.pickupLocation = testSrcLocation
  //   controller.destinationLocation = testTgtLocation
  //   controller.submit()
  //   // here should be code responsible for processing response
  //   $httpBackend.flush()
  //   expect(response).toBeDefined()
  //   expect(response.message).toEqual(responseMessage)
  // })

});
