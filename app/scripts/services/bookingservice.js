'use strict';

/**
 * @ngdoc service
 * @name frontendTaxiApp.BookingService
 * @description
 * # BookingService
 * Service in the frontendTaxiApp.
 */
angular.module('frontendTaxiApp')
  .service('BookingService', BookingService);

function BookingService($http, PusherFactory, ENV) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var serviceURL = ENV.apiEndpoint + '/booking';
    var pusher;
    var lut = [];
    var userId;
    var service = this;

    this.uuid = function () {
      var d0 = Math.random()*0xffffffff|0;
      var d1 = Math.random()*0xffffffff|0;
      var d2 = Math.random()*0xffffffff|0;
      var d3 = Math.random()*0xffffffff|0;
      return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
        lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
        lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
        lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
    };

    init();

    function init() {

      // for development purpose, should be shut down in production
      PusherFactory.logToConsole = true;

      for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
      userId = service.uuid();
      pusher = new PusherFactory('cad5312b266942c7cf7d', {
        cluster: 'eu',
        encrypted: true
      });
      var channel = pusher.subscribe(userId + '_channel');
      channel.bind('update', function(data) {
        console.log('You will be picked up by car with info: ' + data.carInfo);
        console.log('Car will arrive in ' + data.arrivalTime);
      });
    }

    this.book = function (srcLocation, tgtLocation) {
      return $http.post(serviceURL, {srcLocation: srcLocation, tgtLocation: tgtLocation, userId: userId} )
    }
}
