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
    'ui.bootstrap',
    'ngMap',
    'config',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider, $locationProvider) {
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
    $locationProvider.html5Mode(true)
  });
