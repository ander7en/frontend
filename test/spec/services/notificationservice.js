'use strict';

describe('Service: NotificationService', function () {

  // load the service's module
  beforeEach(module('frontendTaxiApp'));

  // instantiate service
  var NotificationService;
  beforeEach(inject(function (_NotificationService_) {
    NotificationService = _NotificationService_;
  }));

  it('should add alerts', function () {
    NotificationService.addAlert({type: 'success', msg: 'test'});
    expect(NotificationService.alerts.length).toEqual(1);
  });

  it('should remove alerts', function () {
    NotificationService.addAlert({type: 'success', msg: 'test'});
    NotificationService.addAlert({type: 'success', msg: 'test'});
    NotificationService.closeAlert(1);
    expect(NotificationService.alerts.length).toEqual(1);
  })

  it('should remove alert with specific index', function () {
    NotificationService.addAlert({type: 'success', msg: 'test1'});
    NotificationService.addAlert({type: 'success', msg: 'test2'});
    NotificationService.closeAlert(1);
    expect(NotificationService.alerts[0]).toEqual({type: 'success', msg: 'test1'});
    expect(NotificationService.alerts[1]).toEqual(undefined);
  })

});
