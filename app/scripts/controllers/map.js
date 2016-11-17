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
    console.log(vm);
    vm.types = "['establishment']";

    vm.placeChanged = function () {
      vm.place = this.getPlace();
      console.log('location', vm.place.geometry.location);
      vm.map.setCenter(vm.place.geometry.location);
    };

    NgMap.getMap().then(function (map) {
      vm.map = map;
    });

    vm.callbackFunc = function (param) {
      console.log('I know where ' + param + ' are. ' + vm.message);
      console.log('You are at' + vm.map.getCenter());
    };

  });
