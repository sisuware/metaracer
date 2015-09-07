(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('FormsNewController', FormsNewController);

  FormsNewController.$inject = ['$scope','form','$state', 'Seasons'];

  function FormsNewController($scope, form, $state, Seasons) {
    $scope.form = form;
    $scope.save = save;
    $scope.sectionIndex = sectionIndex;
    $scope.seasons = Seasons.years();

    function save() {
      _reset();

      $scope.form.$save().then(function(res){
        $state.go('forms.edit', {'form_id': res._id});
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
      $scope.form.fields = [];
      $scope.form.fields.push({'name':'Personal Information', 'description':''});
    }

    _formDefaults();
  }

})();
