(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope','$state'];

  function MainController($scope, $state) {
    if ($scope.organization) {
      $state.go('main.auth');
    }    
  }
})();
