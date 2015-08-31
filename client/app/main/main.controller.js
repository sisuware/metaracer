(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope','$state','Auth'];

  function MainController($scope, $state, Auth) {
    if ($scope.organization) {
      if (Auth.isLoggedIn()) {
        $state.go('dashboard');
      } else {
        $state.go('main.auth');
      }
    }    
  }
})();
