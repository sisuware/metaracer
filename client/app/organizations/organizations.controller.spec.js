'use strict';

describe('Controller: OrganizationsCtrl', function () {

  // load the controller's module
  beforeEach(module('metaracerApp'));

  var OrganizationsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrganizationsCtrl = $controller('OrganizationsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
