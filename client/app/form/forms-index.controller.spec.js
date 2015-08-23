'use strict';

describe('Controller: FormsIndexController', function () {

  // load the controller's module
  beforeEach(module('metaracerApp'));

  var FormsIndexController, scope;
  
  var Forms = {
    query: jasmine.createSpy('Forms.query')
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormsIndexController = $controller('FormsIndexController', {
      $scope: scope,
      Forms: Forms
    });
  }));

  it('should get the list of forms', function () {
    expect(Forms.query).toHaveBeenCalled()
  });
});
