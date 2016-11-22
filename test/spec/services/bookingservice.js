'use strict';

describe('Service: BookingService', function () {
  // load the service's module
  beforeEach(module('frontendTaxiApp'));

  var remoteAdress = 'http://localhost:3000/booking'
  var responseMessage = 'Some useful actions suppose to happen in here'
  var testSrcLocation = {latitude: 45.123123, longitude: 123.456}
  var testTgtLocation = {latitude: 45.123123, longitude: 123.456}
  // instantiate service
  var $httpBackend, $controller, $rootScope,  createController;

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope')
    $controller = $injector.get('$controller')
    createController = function () {
      return $controller('MapCtrl', {'$scope': $rootScope});
    }
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should send post request on submission', function () {
    var controller = createController()
    controller.pickupLocation = testSrcLocation
    controller.destinationLocation = testTgtLocation
    controller.submit()
    $httpBackend.expectPOST(remoteAdress).respond(201, '')
    $httpBackend.flush()
  })

  // can be used when backend will return something meaningful
  // it('should respond with waiting message', function () {
  //   $httpBackend.when('POST', remoteAdress).respond(201, {message: responseMessage})
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
