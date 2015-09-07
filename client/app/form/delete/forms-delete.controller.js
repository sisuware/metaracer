(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('FormsDeleteController', FormsDeleteController);

  FormsDeleteController.$inject = ['$scope','form','$state'];

  function FormsDeleteController($scope, form, $state) {
    $scope.form = form;
    $scope.deleteForm = deleteForm;

    function deleteForm() {
      $scope.form.$delete().then(function(){
        $state.go('forms.list');
      });
    }
  }
})();
