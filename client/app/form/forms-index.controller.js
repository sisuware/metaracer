(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('FormsIndexController', FormsIndexController);

  FormsIndexController.$inject = ['$scope', 'Forms'];

  function FormsIndexController($scope, Forms) {
    $scope.forms = Forms.query();
  }
})();
