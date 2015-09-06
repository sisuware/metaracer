(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('FormsShowController', FormsShowController);

  FormsShowController.$inject = ['$scope','form','$state'];

  function FormsShowController($scope, form, $state) {
    $scope.form = form;
  }
})();
