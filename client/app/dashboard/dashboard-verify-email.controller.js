(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('DashboardVerifyEmailController', DashboardVerifyEmailController);

  DashboardVerifyEmailController.$inject = ['$scope','$state','Auth'];

  function DashboardVerifyEmailController($scope, $state, Auth) {
    $scope.user = Auth.getCurrentUser();

    
  }
})();