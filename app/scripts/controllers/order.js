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
  function OrderCtrl($rootScope, NgMap, $timeout, BookingService, localStorageService) {

    var vm = this;
    // Data
    vm.distance = undefined;
    vm.duration = undefined;
    vm.pickupAddress = undefined;
    vm.pickupLocation = undefined;
    vm.destinationLocation = undefined;
    vm.arrivalTime = undefined;
    $rootScope.bookingProc = false;

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

        NgMap.getGeoLocation().then(function (location) {
          var geocoder = new google.maps.Geocoder();
          var latlng = new google.maps.LatLng(location.lat(), location.lng());
          geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                document.getElementById('pickupLocation').value = results[0].formatted_address
                vm.pickupLocation = latlng;
                pickupPlaceChanged();
              } else {
                element.text('Location not found');
              }
            } else {
              element.text('Geocoder failed due to: ' + status);
            }
          });
        });
      });

      if (localStorageService.get("arrivalTime") != null)
      {
        vm.arrivalTime = localStorageService.get("arrivalTime");
        vm.carInfo = localStorageService.get("carInfo");
      }
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
      $rootScope.bookingProc = true;
      // $scope.$digest();
      setTimeout(function(){BookingService.book(vm.pickupLocation, vm.destinationLocation)
        .then(function (response){
          // success callback
          $rootScope.bookingProc = false;
          console.log(response);
          return response
        }, function(response){
          //error callback
          console.log('Error: ', response)
        })}, 5000)
    }
  }

})();
