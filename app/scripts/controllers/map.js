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
    .controller('MapCtrl', MapCtrl)
    .service('NavigatorGeolocation', NavigatorGeolocation);

  /* @ngInject */
  function MapCtrl(NgMap, $timeout) {

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
    //////////


    init();

    function init() {
      NgMap.getMap().then(function (map) {
        vm.map = map;

        navigator.geolocation.getCurrentPosition(success);

        function success (pos) {
          vm.lat = vm.map.getCenter().lat();
          vm.lng = vm.map.getCenter().lng();

          var geocoder = new google.maps.Geocoder();
          var latlng = new google.maps.LatLng(vm.lat, vm.lng);
          geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                document.getElementById('Pickups').value = results[0].formatted_address
                vm.pickupLocation = latlng;
                pickupPlaceChanged();
              } else {
                element.text('Location not found');
              }
            } else {
              element.text('Geocoder failed due to: ' + status);
            }
          });
        }
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
  }

})();
