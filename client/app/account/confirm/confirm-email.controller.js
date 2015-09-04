(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('ConfirmEmailController', ConfirmEmailController);

  ConfirmEmailController.$inject = ['$scope', 'Auth', '$state', '$location'];
  
  function ConfirmEmailController($scope, Auth, $state, $location) {
    $scope.confirmed = false;
    $scope.user = Auth.getCurrentUser();

    Auth.verifyEmail($location.search().hash).$promise.then(function(res){
      $scope.confirmed = true;
    }, function(err){
      $scope.error = err;
      console.log(err);
    });
  }
})();