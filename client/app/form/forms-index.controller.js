(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('FormsIndexController', FormsIndexController);

  FormsIndexController.$inject = ['$scope', 'forms', 'organization'];

  function FormsIndexController($scope, forms, organization) {
    $scope.forms = forms;
    $scope.organization = organization;
  }
})();
