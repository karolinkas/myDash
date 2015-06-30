'use strict';

describe('Service: SimpleHttpLoader', function () {

  // load the service's module
  beforeEach(module('myDashApp'));

  // instantiate service
  var SimpleHttpLoader;
  beforeEach(inject(function (_SimpleHttpLoader_) {
    SimpleHttpLoader = _SimpleHttpLoader_;
  }));

  it('should do something', function () {
    expect(!!SimpleHttpLoader).toBe(true);
  });

});
