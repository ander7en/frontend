describe('Unit: Map', function () {

  // Define global references for injections.
  var ctrl;

  beforeEach(module('frontendTaxiApp'));

  beforeEach(inject(function ($controller) {

    var $scope = {}

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

  });
});
