'use strict';

/**
 * @ngdoc service
 * @name frontendTaxiApp.PusherFactory
 * @description
 * # PusherFactory
 * Factory in the frontendTaxiApp.
 */
angular.module('frontendTaxiApp')
  .factory('PusherFactory', function ($window) {
    if (!$window.Pusher){
      // some useful logic here if Pusher.js script isn't loaded from url
      console.log("couldn't load pusher.js library")
    } else {
      return $window.Pusher;
    }
  });
