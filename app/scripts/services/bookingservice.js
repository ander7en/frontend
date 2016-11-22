'use strict';

/**
 * @ngdoc service
 * @name frontendTaxiApp.BookingService
 * @description
 * # BookingService
 * Service in the frontendTaxiApp.
 */
angular.module('frontendTaxiApp')
  .service('BookingService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var serviceURL = 'http://localhost:3000/booking'

    // was used for CSRF (currently disabled)
    // init()
    //
    // function init() {
    //   $http.get(serviceURL).then(function (response) {
    //     console.log(response)
    //   })
    // }

    this.book = function (srcLocation, tgtLocation) {
      return $http.post(serviceURL, {srcLocation: srcLocation, tgtLocation: tgtLocation} )
    }
  });
