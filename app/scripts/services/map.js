(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name frontendTaxiApp.map
   * @description
   * # map
   * Service in the frontendTaxiApp.
   */
  angular.module('frontendTaxiApp')
    .factory('googleMap', googleMap);


  function googleMap() {
    var maps = {};

    function addMap(mapId) {
      maps[mapId] = {};
    }

    function getMap(mapId) {
      if (!maps[mapId]) addMap(mapId);
      return maps[mapId];
    }

    return {
      addMap: addMap,
      getMap: getMap
    }
  }

});
