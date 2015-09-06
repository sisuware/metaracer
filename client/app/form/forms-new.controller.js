(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('FormsNewController', FormsNewController);

  FormsNewController.$inject = ['$scope','form','$state','organization', '$stateParams'];

  function FormsNewController($scope, form, $state, organization, $stateParams) {
    $scope.organization = organization;
    $scope.form = form;
    $scope.save = save;
    $scope.sectionIndex = sectionIndex;
    

    function save() {
      _reset();

      $scope.form.$save().then(function(res){
        console.log(res);
      }, function(errors){
        $scope.errors = errors;
      });
    }

    function sectionIndex() {
      console.log($state.params);
      return parseInt($state.params.section);
    }

    function _reset() {
      $scope.errors = false;
    }

    function _formDefaults() {
      $scope.form._organization = organization._id;
      $scope.form.fields = [];
      $scope.form.fields.push({'name':'Personal Information', 'description':''});
    }

    _formDefaults();
  }

})();
