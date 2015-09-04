(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('VerifyController', VerifyController);

  VerifyController.$inject = ['$scope', 'Auth'];
  
  function VerifyController($scope, Auth) {
    $scope.user = Auth.getCurrentUser();
  }
})();