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
    'ngMap',
    'config'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/order.html',
        controller: 'OrderCtrl',
        controllerAs: 'order'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
