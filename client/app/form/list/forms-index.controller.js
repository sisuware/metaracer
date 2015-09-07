(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('FormsIndexController', FormsIndexController);

  FormsIndexController.$inject = ['$scope', 'forms'];

  function FormsIndexController($scope, forms) {
    $scope.forms = forms;
  }
})();
