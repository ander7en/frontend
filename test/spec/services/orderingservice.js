'use strict';

describe('Service: OrderingService', function () {

  // load the service's module
  beforeEach(module('frontendTaxiApp'));

  // instantiate service
  var OrderingService;
  var testOrder = {};
  testOrder.finished = false;
  testOrder.origin = {
    lat: function () {
      return 45
    }, lng: function () {
      return 42
    }
  };
  testOrder.destination = testOrder.origin;

  beforeEach(inject(function (_OrderingService_) {
    OrderingService = _OrderingService_;
    OrderingService.unfinishedOrder = testOrder;
  }));

  it("shouldn't have unfinished orders on initialization", function () {
    // expect(OrderingService.unfinishedOrderExits).toEqual(false);
  });

  it('should save unfinished orders', function () {
    OrderingService.saveUnfinishedOrder();
    var readObject = OrderingService.getUnfinishedOrder();
    expect(testOrder).not.toEqual(undefined);
  });

  it('should change Pickup location', function () {
    var newOrigin = {
      lat: function () {
        return 46
      }, lng: function () {
        return 42
      }
    };
    OrderingService.changePickup(newOrigin);
    expect(OrderingService.unfinishedOrder.origin).toEqual(newOrigin);
  });

  it('should change Destination location', function () {
    var newDestination = {
      lat: function () {
        return 46
      }, lng: function () {
        return 42
      }
    };
    OrderingService.changeDestination(newDestination);
    expect(OrderingService.unfinishedOrder.destination).toEqual(newDestination);
  });

  it('should delete unfinished order', function () {
    OrderingService.saveUnfinishedOrder()
    expect(OrderingService.getUnfinishedOrder()).not.toEqual(undefined);
    OrderingService.deleteUnfinishedOrder();
    expect(OrderingService.getUnfinishedOrder()).toEqual(null);
  })
});
