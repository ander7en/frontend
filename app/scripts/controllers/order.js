(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendTaxiApp.controller:OrderCtrl
   * @description
   * # OrderCtrl
   * Controller of the frontendTaxiApp
   */
  angular.module('frontendTaxiApp')
    .controller('OrderCtrl', OrderCtrl);

  /* @ngInject */
  function OrderCtrl(NgMap, $timeout, $window, BookingService) {

    var vm = this;
    // Data
    vm.distance = undefined;
    vm.duration = undefined;
    vm.pickupLocation = undefined;
    vm.destinationLocation = undefined;

    // Methods
    vm.destinationPlaceChanged = destinationPlaceChanged;
    vm.onCurrentLocationDetected = onCurrentLocationDetected;
    vm.pickupPlaceChanged = pickupPlaceChanged;
    vm.updateRouteInfo = updateRouteInfo;
    vm.submit = submit;
    //////////


    init();

    function init() {
      NgMap.getMap().then(function (map) {
        vm.map = map;
      });
    }

    function updateRouteInfo() {
      if (vm.pickupLocation && vm.destinationLocation) {
        $timeout(function() {
          vm.distance = vm.map.directionsRenderers[0].directions.routes[0].legs[0].distance.text;
          vm.duration = vm.map.directionsRenderers[0].directions.routes[0].legs[0].duration.text;
        }, 200);
      }
    }

    // Listener on Destination location change
    function destinationPlaceChanged() {
      vm.destinationLocation = this.getPlace().geometry.location;
      vm.map.setCenter(vm.destinationLocation);
      updateRouteInfo();
    }

    //Called after detecting current location
    function onCurrentLocationDetected(param) {
      console.log('I know where ' + param + ' are. ' + vm.message);
      console.log('You are at' + vm.map.getCenter());
    }

    // Listener on Pickup location change
    function pickupPlaceChanged() {
      vm.pickupLocation = this.getPlace().geometry.location;
      vm.map.setCenter(vm.pickupLocation);
      updateRouteInfo();
    }

    function submit() {
      BookingService.book(vm.pickupLocation, vm.destinationLocation)
        .then(function (response){
          // success callback
          console.log(response)
          return response
        }, function(response){
          //error callback
          console.log('Error: ', response)
        })
    }
  }

})();
