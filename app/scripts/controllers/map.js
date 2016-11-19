(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendTaxiApp.controller:MapCtrl
   * @description
   * # MapCtrl
   * Controller of the frontendTaxiApp
   */
  angular.module('frontendTaxiApp')
    .controller('MapCtrl', MapCtrl);

  /* @ngInject */
  function MapCtrl(NgMap, $timeout) {

    var vm = this;
    // Data
    vm.distance = undefined;
    vm.pickupLocation = undefined;
    vm.destinationLocation = undefined;

    // Methods
    vm.destinationPlaceChanged = destinationPlaceChanged;
    vm.callbackFunc = callbackFunc;
    vm.pickupPlaceChanged = pickupPlaceChanged;
    //////////


    init();

    function init() {
      NgMap.getMap().then(function (map) {
        vm.map = map;
      });
    }

    // Listener on Destination location change
    function update_route_info() {
      if (vm.pickupLocation && vm.destinationLocation) {
        $timeout(function() {
          vm.distance = vm.map.directionsRenderers[0].directions.routes[0].legs[0].distance.text;
          vm.duration = vm.map.directionsRenderers[0].directions.routes[0].legs[0].duration.text;
        }, 200);
      }
    }

    function destinationPlaceChanged() {
      vm.destinationLocation = this.getPlace().geometry.location;
      vm.map.setCenter(vm.destinationLocation);
      update_route_info();
    }

    //Called after detecting current location
    function callbackFunc(param) {
      console.log('I know where ' + param + ' are. ' + vm.message);
      console.log('You are at' + vm.map.getCenter());
    }

    // Listener on Pickup location change
    function pickupPlaceChanged() {
      vm.pickupLocation = this.getPlace().geometry.location;
      vm.map.setCenter(vm.pickupLocation);
      update_route_info();
    }
  }

})();
