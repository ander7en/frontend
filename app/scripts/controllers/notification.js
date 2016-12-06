'use strict';

/**
 * @ngdoc function
 * @name frontendTaxiApp.controller:NotificationCtrl
 * @description
 * # NotificationCtrl
 * Controller of the frontendTaxiApp
 */
angular.module('frontendTaxiApp')
  .controller('NotificationService', function ($scope, NotificationService) {
    $scope.alerts = NotificationService.alerts;

    $scope.closeAlert = NotificationService.closeAlert;
  });
