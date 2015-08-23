(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('OrganizationsNewController', OrganizationsNewController);

  OrganizationsNewController.$inject = ['$scope', 'organization', 'user', '$state'];

  function OrganizationsNewController($scope, organization, user, $state) {
    $scope.organization = organization;
    $scope.organization._owner = user._id;
    $scope.create = create;

    function create(form) {
      $scope.submitted = true;

      if (form.$invalid) {
        return false;
      }

      $scope.organization.$save()
      .then(function(res){
        $state.transitionTo('organization', {'id': res._id});
      })
      .catch(function(err){
        $scope.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.data.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
      })
      
    }
  }
})();