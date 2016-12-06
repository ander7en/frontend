'use strict';

describe('Controller: NotificationCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendTaxiApp'));

  var NotificationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotificationCtrl = $controller('NotificationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should add alerts', function () {
    NotificationCtrl.addAlert({type: 'success', msg: 'test'});
    expect(scope.alerts.length).toEqual(1);
  });
});
