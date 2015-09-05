(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('VerifyController', VerifyController);

  VerifyController.$inject = ['$scope', 'Auth', '$state'];
  
  function VerifyController($scope, Auth, $state) {
    Auth.getCurrentUser().$promise.then(function(user){
      $scope.user = user;

      if (user.verifiedEmail) {
        $state.go('confirm.email');
      }
    });
  }
})();