'use strict';

describe('Controller: FormsNewController', function () {

  // load the controller's module
  beforeEach(module('metaracerApp'));

  var FormsNewController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormsNewController = $controller('FormsNewController', {
      $scope: scope,
      form: {},
      $state: {}
    });
  }));

  it('$scope.form should be defined', function () {
    
  });
});
