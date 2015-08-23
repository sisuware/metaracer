'use strict';

describe('Controller: OrganizationsIndexController', function () {

  // load the controller's module
  beforeEach(module('metaracerApp'));

  var OrganizationsIndexController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrganizationsIndexController = $controller('OrganizationsIndexController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
