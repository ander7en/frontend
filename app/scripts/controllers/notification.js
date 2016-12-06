'use strict';

/**
 * @ngdoc function
 * @name frontendTaxiApp.controller:NotificationCtrl
 * @description
 * # NotificationCtrl
 * Controller of the frontendTaxiApp
 */
angular.module('frontendTaxiApp')
  .controller('NotificationCtrl', function ($scope) {
    $scope.alerts = [];

    this.addAlert = function(alert) {
      $scope.alerts.push(alert);
    };
    $scope.addAlert = this.addAlert;

    this.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    $scope.closeAlert = this.closeAlert;
  });
