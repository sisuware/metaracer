(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope','$state','Auth'];

  function MainController($scope, $state, Auth) {
    $scope.$on('subdomain', determineState);

    function determineState(event, org) {
      if (!org) {
        if (Auth.isLoggedIn()) {
          $state.go('dashboard');
        } else {
          $state.go('main.public');  
        }
      }

      if (org) {
        if (Auth.isLoggedIn()) {
          $state.go('dashboard');
        } else {
          $state.go('main.organization')
        }
      }
    }

    determineState(null, $scope.organization);
  }
})();
