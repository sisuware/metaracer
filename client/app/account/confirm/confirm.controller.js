(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('ConfirmController', ConfirmController);

  ConfirmController.$inject = ['$scope', 'Auth'];
  
  function ConfirmController($scope, Auth) {
    $scope.user = Auth.getCurrentUser();
  }
})();