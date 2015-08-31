(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['$scope','Auth','$state','$window'];

  function SignupController($scope, Auth, $state, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          firstName: $scope.user.firstName,
          lastName: $scope.user.lastName,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          if ($scope.organization) {
            $state.go('dashboard')
          } else {
            $state.go('main');
          }
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            if (form && form[field]) {
              form[field].$setValidity('mongoose', false);
            }
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }

})();
