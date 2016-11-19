'use strict';

describe('Controller: MapCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendTaxiApp'));

  var MapCtrl,
    scope,
    timeout;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $timeout) {
    scope = $rootScope.$new();
    timeout = $timeout;
    MapCtrl = $controller('MapCtrl', {
      $scope: scope,
      // place here mocked dependencies
      NgMap: {
        getMap: function () {
          return {
            then: function (map) {
              return map;
            }
          }
        },
        getPlace: function(){
          return {geometry: {location: 11}}
        }
      },
      map: {
        directionsRenderers: [
          {
            directions: {
              routes: [
                {
                  legs: [
                    {
                      distance: {text: "10"},
                      duration: {text: "12"}
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    });
  }));

  it('should have pickupPlaceChanged listener', function () {
    expect(MapCtrl.pickupPlaceChanged).toBeDefined()
  });

  it('should have destinationPlaceChanged listener', function () {
    expect(MapCtrl.destinationPlaceChanged).toBeDefined()
  });

  it('should have current location onCurrentLocationDetected defined', function () {
    expect(MapCtrl.onCurrentLocationDetected).toBeDefined()
  });

  it('should have updateRouteInfo defined', function () {
    expect(MapCtrl.updateRouteInfo).toBeDefined()
  });

});
