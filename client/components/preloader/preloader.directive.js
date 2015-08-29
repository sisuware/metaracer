(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .directive('preloader', preloader);

  preloader.$inject = ['$location', 'Organizations', '$state'];

  function preloader($location, Organizations, $state) {
    preloaderController.$inject = ['$scope','$element'];

    var directive = {
      controller: preloaderController
    };

    return directive;

    function preloaderController($scope, $element) {
      var host = $location.host();

      if (host && host.split('.').length === 2) {
        host = host.split('.')[0];
        
        Organizations.subdomain({'id':host}).$promise.then(function(res){
          $scope.organization = res;
        }, function(error){
          window.location.hostname = "localhost";          
        });
      }
    }
  }
})();