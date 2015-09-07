(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('FormsEditController', FormsEditController);

  FormsEditController.$inject = ['$scope','form','$state','organization'];

  function FormsEditController($scope, form, $state, organization) {
    $scope.form = form;
    $scope.update = update;
    $scope.sectionIndex = sectionIndex;


    function update() {
      _reset();

      $scope.form.$update().then(function(res){
        console.log(res);
      }, function(errors){
        $scope.errors = errors;
      });
    }

    function sectionIndex() {
      return parseInt($state.params.section);
    }

    function _reset() {
      $scope.errors = false;
    }
  }

})();
