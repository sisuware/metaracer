(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope','$state','Auth'];

  function DashboardController($scope, $state, Auth) {
    Auth.getCurrentUser().$promise.then(function(user){
      $scope.user = user;
      determineState();
    });

    function determineState() {
      if ($scope.user && !$scope.user.verifiedEmail) {
        $state.go('verify.email');
      }  

      if (!$scope.organization) {
        
      }
    }
  }
})();