'use strict';

/**
 * @ngdoc function
 * @name frontendTaxiApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the frontendTaxiApp
 */
angular.module('frontendTaxiApp')
  .controller('MapCtrl', function (NgMap) {

    var vm = this;
    vm.types = "['establishment']";

    // Listener on Pickup location change
    vm.pickupPlaceChanged = function () {
      vm.pickupPlace = this.getPlace();
      console.log('location', vm.pickupPlace.geometry.location);
      vm.map.setCenter(vm.pickupPlace.geometry.location);
      vm.map.setPosition(vm.pickupPlace);
    };
    // Listener on Destination location change
    vm.destinationPlaceChanged = function () {
      vm.destinationPlace = this.getPlace();
      console.log('location', vm.destinationPlace.geometry.location);
      vm.map.setCenter(vm.destinationPlace.geometry.location);
    };


    //initilize ngMap (TODO add to service)
    NgMap.getMap().then(function (map) {
      vm.map = map;
    });


    //Called after detecting current location
    vm.callbackFunc = function (param) {
      console.log('I know where ' + param + ' are. ' + vm.message);
      console.log('You are at' + vm.map.getCenter());
    };

  });
