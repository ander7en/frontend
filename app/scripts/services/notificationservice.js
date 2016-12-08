'use strict';

/**
 * @ngdoc service
 * @name frontendTaxiApp.NotificationService
 * @description
 * # NotificationService
 * Service in the frontendTaxiApp.
 */
angular.module('frontendTaxiApp')
  .service('NotificationService', function () {
    var self = this;
    this.alerts = [];

    this.addAlert = function(alert) {
      self.alerts.push(alert);
    };

    this.closeAlert = function(index) {
      self.alerts.splice(index, 1);
    };
  });
