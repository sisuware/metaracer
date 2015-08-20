(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('FormsNewController', FormsNewController);

  FormsNewController.$inject = ['$scope','form','$state'];

  function FormsNewController($scope, form, $state) {
    $scope.form = form;
    $scope.transitionTo = $state.transitionTo
    $scope.save = save;

    function save() {
      _reset();

      $scope.form.$save().then(function(res){
        console.log(res);
      }, function(errors){
        $scope.errors = errors;
      });
    }

    function _reset() {
      $scope.errors = false;
    }
  }

})();
