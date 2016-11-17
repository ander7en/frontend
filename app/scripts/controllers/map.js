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
  function MapCtrl(NgMap) {

    var vm = this;
    // Data
    vm.distance = undefined; // possible to calculate when both A and B locations are entered

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
    function destinationPlaceChanged() {
      vm.destinationPlace = this.getPlace();
      vm.map.setCenter(vm.destinationPlace.geometry.location);
    }
    //Called after detecting current location
    function callbackFunc(param) {
      console.log('I know where ' + param + ' are. ' + vm.message);
      console.log('You are at' + vm.map.getCenter());
    }
    // Listener on Pickup location change
    function pickupPlaceChanged() {
      vm.pickupPlace = this.getPlace();
      vm.map.setCenter(vm.pickupPlace.geometry.location);
    }
  }

})();
