'use strict';

describe('Service: driver', function () {

  // load the service's module
  beforeEach(module('frontendTaxiApp'));
  beforeEach(module('frontendTaxiApp'));

  // instantiate service
  var driver, $httpBackend, authRequestHandler;
  var example_response;
  var remoteAddress;

  beforeEach(inject(function (_DriverService_, _$httpBackend_, _ENV_) {
    remoteAddress = _ENV_.apiEndpoint + "/drivers";
    example_response = {"drivers":[{"lng":29.737151924540687,"ltd":58.37424467756122,"car_info":"703 vao"},{"lng":29.742410290580505,"ltd":58.395321487195694,"car_info":"832 m89"},{"lng":29.728156891693285,"ltd":58.38778989667291,"car_info":"751 rp6"},{"lng":29.730131766334335,"ltd":58.38243597672452,"car_info":"249 mp8"},{"lng":29.7234114625374,"ltd":58.370529623453095,"car_info":"526 146"},{"lng":29.736715844098647,"ltd":58.377623454884485,"car_info":"193 rvf"},{"lng":29.731670905958318,"ltd":58.38252260047901,"car_info":"637 1h0"},{"lng":29.739609035777736,"ltd":58.3834618466242,"car_info":"375 m1q"},{"lng":29.746247419608128,"ltd":58.38823775481879,"car_info":"380 wsr"},{"lng":29.739127195533406,"ltd":58.37878898637738,"car_info":"457 60f"}]}

    driver = _DriverService_;
    $httpBackend = _$httpBackend_;
    // backend definition common for all tests
    authRequestHandler = $httpBackend.when('GET', remoteAddress + '/drivers?lat=58.382382&lng=29.732440')
      .respond(200, example_response);

  }));


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should send get to server', function() {
    var testSrcLocation = {latitude: '58.382382', longitude: '29.732440'};
    driver.loadDrivers(testSrcLocation);
    $httpBackend.expectGET(remoteAddress + '?lat=58.382382&lng=29.732440').respond(200, example_response);
    $httpBackend.flush();
  });

});
