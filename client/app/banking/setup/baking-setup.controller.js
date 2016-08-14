(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('BankingSetupController', BankingSetupController);

  BankingSetupController.$inject = ['$scope', 'Country', 'Banks', '$state'];

  function BankingSetupController($scope, Country, Banks, $state) {
    $scope.banking = new Banks({'_organization': $scope.organization._id});
    $scope.countries = Country.query;
    $scope.next = next;

    function next(state, form) {
      if (form.$invalid) { return false; }
      
      var _method = '$save';
      if ($scope.banking._id) {
        _method = '$update';
      }
      
      $scope.banking[_method]().then(_handleSuccess.bind(null, state), _handleError);
    }

    function _handleSuccess(state, res) {
      console.log(state, res);
      $state.go(state);
    }

    function _handleError(res) {
      $scope.errors = res;
    }
  }
})();