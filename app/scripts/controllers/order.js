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
  function OrderCtrl(NgMap, $timeout, PusherFactory, BookingService, ENV) {

    var vm = this;
    var pusherUserId;
    // Data
    vm.distance = undefined;
    vm.duration = undefined;
    vm.pickupLocation = undefined;
    vm.destinationLocation = undefined;
    vm.arrivalTime = undefined;

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

        navigator.geolocation.getCurrentPosition(success);

        function success (pos) {
          vm.lat = vm.map.getCenter().lat();
          vm.lng = vm.map.getCenter().lng();

          var geocoder = new google.maps.Geocoder();
          var latlng = new google.maps.LatLng(vm.lat, vm.lng);
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
        }
      });

      // for development purpose, should be shut down in production
      PusherFactory.logToConsole = ENV.debug;


      pusherUserId = BookingService.uuid();
      var pusher = new PusherFactory('cad5312b266942c7cf7d', {
        cluster: 'eu',
        encrypted: true
      });
      var channel = pusher.subscribe(pusherUserId + '_channel');
      channel.bind('update', function(data) {
        console.log('You will be picked up by car with info: ' + data.carInfo);
        console.log('Car will arrive in ' + data.arrivalTime);

        $timeout(function() {
          vm.arrivalTime = data.arrivalTime;
          vm.carInfo = data.carInfo;
        }, 200);

      });

    }

    function updateRouteInfo() {
      function wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
        }
      }

      if (vm.pickupLocation && vm.destinationLocation) {
        $timeout(function() {
          vm.distance = vm.map.directionsRenderers[0].directions.routes[0].legs[0].distance.text;
          vm.duration = vm.map.directionsRenderers[0].directions.routes[0].legs[0].duration.text;
        }, 200);
        console.log('before');

        wait(300);  //7 seconds in milliseconds
        console.log('after');
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
      BookingService.book(vm.pickupLocation, vm.destinationLocation, pusherUserId)
        .then(function (response){
          // success callback
          console.log(response);
          return response
        }, function(response){
          //error callback
          console.log('Error: ', response)
        })
    }
  }

})();
