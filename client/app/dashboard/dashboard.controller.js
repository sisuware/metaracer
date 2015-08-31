(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope','$state','Auth'];

  function DashboardController($scope, $state, Auth) {
    $scope.user = Auth.getCurrentUser();

    if ($scope.user && !$scope.user.verifiedEmail) {
      $state.go('dashboard.verifyEmail')
    }
  }
})();