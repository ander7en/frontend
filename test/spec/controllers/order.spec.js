describe('Unit: Map', function () {

  // Define global references for injections.
  var ctrl;

  beforeEach(module('frontendTaxiApp'));

  var exampleResponse;
  var remoteAddress;
  var authRequestHandler;

  beforeEach(inject(function ($controller, _$httpBackend_) {

    var $scope = {};

    // Instantiate the controller with an object of the dependencies
    ctrl = $controller('OrderCtrl', {
      // NgMap: {
      //   getMap: function () {
      //     return {
      //       then: function (map) {
      //         return map;
      //       }
      //     }
      //   }
      // },
      $scope: $scope
    });

    ctrl.getPlace = function () {
      return {geometry: {location: 11}}
    };

    ctrl.map = {
      setCenter: function (center) {

      }
    };

    // exampleResponse = {"drivers":[{"lng":29.737151924540687,"ltd":58.37424467756122,"car_info":"703 vao"},{"lng":29.742410290580505,"ltd":58.395321487195694,"car_info":"832 m89"},{"lng":29.728156891693285,"ltd":58.38778989667291,"car_info":"751 rp6"},{"lng":29.730131766334335,"ltd":58.38243597672452,"car_info":"249 mp8"},{"lng":29.7234114625374,"ltd":58.370529623453095,"car_info":"526 146"},{"lng":29.736715844098647,"ltd":58.377623454884485,"car_info":"193 rvf"},{"lng":29.731670905958318,"ltd":58.38252260047901,"car_info":"637 1h0"},{"lng":29.739609035777736,"ltd":58.3834618466242,"car_info":"375 m1q"},{"lng":29.746247419608128,"ltd":58.38823775481879,"car_info":"380 wsr"},{"lng":29.739127195533406,"ltd":58.37878898637738,"car_info":"457 60f"}]}
    //
    // $httpBackend = _$httpBackend_;
    // // backend definition common for all tests
    // authRequestHandler = $httpBackend.when('GET', remoteAddress + '/drivers?ltd=58.382382&lng=29.732440')
    //   .respond(200, exampleResponse);

  }));

  describe('OrderCtrl', function () {
    // Test some basic expectations about the controller

    it('should have pickupPlaceChanged defined', function () {
      expect(ctrl.pickupPlaceChanged).toBeDefined()
    });

    it('should have destinationPlaceChanged defined', function () {
      expect(ctrl.destinationPlaceChanged).toBeDefined()
    });

    it('should have updateRouteInfo defined', function () {
      expect(ctrl.updateRouteInfo).toBeDefined()
    });

    it('should have distance duration pickupLocation destinationLocation undefined', function () {
      expect(ctrl.distance).toBeUndefined();
      expect(ctrl.duration).toBeUndefined();
      expect(ctrl.pickupLocation).toBeUndefined();
      expect(ctrl.destinationLocation).toBeUndefined();
    });

    it('should have pickupLocation defined after change pickup place', function () {
      ctrl.pickupPlaceChanged();
      expect(ctrl.pickupLocation).toBeDefined();
      expect(ctrl.pickupLocation).toBe(11);
    });

    it('should have destinationLocation defined after change destination place', function () {
      ctrl.destinationPlaceChanged();
      expect(ctrl.destinationLocation).toBeDefined();
      expect(ctrl.destinationLocation).toBe(11);
    });

    // it('should initialize map pin data', function () {
    //   var testSrcLocation = {latitude: '58.382382', longitude: '29.732440'};
    //   ctrl.loadDrivers(testSrcLocation);
    // });

  });
});
