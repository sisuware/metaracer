(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('FormsEditController', FormsEditController);

  FormsEditController.$inject = ['$scope','form','$state','organization'];

  function FormsEditController($scope, form, $state, organization) {
    $scope.organization = organization;
    $scope.form = form;
    $scope.transitionTo = transitionTo;
    $scope.save = save;

    $scope.form._organization = organization._id;

    function transitionTo(state) {
      $state.transitionTo(state, {'id': organization._id});
    }
    

    function save() {
      _reset();

      $scope.form.$update().then(function(res){
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
