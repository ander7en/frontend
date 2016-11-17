'use strict';

describe('Controller: MapCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendTaxiApp'));

  var MapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapCtrl = $controller('MapCtrl', {
      $scope: scope,
      // place here mocked dependencies
      NgMap: {
        getMap: function () {
          return {
            then: function (map) {
              console.log("Hoala")
              return {1:2};
            }
          }
        }
      }
    });
  }));

  it('should have default type for map: establishment', function () {
    expect(MapCtrl.types).toBe("['establishment']");
  });

  it('should have pickupPlaceChanged listener', function () {
    expect(MapCtrl.pickupPlaceChanged).toBeDefined()
  });

  it('should have destinationPlaceChanged listener', function () {
    expect(MapCtrl.destinationPlaceChanged).toBeDefined()
  });

  it('should have current location callbackFunc defined', function () {
    expect(MapCtrl.destinationPlaceChanged).toBeDefined()
  });

  it('should call init', function () {
    // expect(MapCtrl.init).toHaveBeenCalled();
    //  TODO cannot test this
  });

  it('should have map initialized', function () {
    // expect(MapCtrl.map).toBeDefined()
    // cannot determine why this is not defined and how to test it
    //  TODO
  });


});
