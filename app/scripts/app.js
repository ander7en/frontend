'use strict';

/**
 * @ngdoc overview
 * @name frontendTaxiApp
 * @description
 * # frontendTaxiApp
 *
 * Main module of the application.
 */
angular
  .module('frontendTaxiApp', [
    'ngResource',
    'ngRoute',
    'ngMap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl',
        controllerAs: 'map'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
