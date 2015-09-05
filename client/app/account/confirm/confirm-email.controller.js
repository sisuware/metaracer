(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('ConfirmEmailController', ConfirmEmailController);

  ConfirmEmailController.$inject = ['$scope', 'Auth', '$state', '$location'];
  
  function ConfirmEmailController($scope, Auth, $state, $location) {
    $scope.confirmed = false;
    
    $scope.user = Auth.getCurrentUser().$promise.then(function(user){
      var hash = $location.search().hash;
      if (!user.verifiedEmail) {
        if (hash) {
          verifyEmail(hash);
        } else {
          $scope.error = 'Verification token is missing or invalid.'; 
        }
      } else {
        $state.go('dashboard');
      }
    });

    function verifyEmail(hash) {
      Auth.verifyEmail(hash).$promise.then(function(res){
        $scope.confirmed = true;
      }, function(err){
        $scope.error = err;
        console.log(err);
      });
    }

    
  }
})();