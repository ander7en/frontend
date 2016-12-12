'use strict';

/**
 * @ngdoc service
 * @name frontendTaxiApp.driver
 * @description
 * # driver
 * Service in the frontendTaxiApp.
 */
angular.module('frontendTaxiApp')
  .service('DriverService', DriverService);


function DriverService($http, ENV) {
  var driverServiceURL = ENV.apiEndpoint + '/drivers';
  this.loadDrivers = function (srcLocation) {
    return $http.get(driverServiceURL, {params: {lat: srcLocation.latitude, lng: srcLocation.longitude}});
  }
}
