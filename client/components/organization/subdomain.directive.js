(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .directive('subdomain', subdomain);

  subdomain.$inject = ['$location', 'Organizations', '$state', '$timeout'];

  function subdomain($location, Organizations, $state, $timeout) {
    subdomainController.$inject = ['$scope','$element'];

    var directive = {
      controller: subdomainController
    };

    return directive;

    function subdomainController($scope, $element) {
      var host = $location.host();

      if (host && host.split('.').length === 2) {
        host = host.split('.');
        
        Organizations.subdomain({'id':host[0]}).$promise.then(function(res){
          $scope.organization = res;
          broadcast(res);
        }, function(error){
          broadcast(false);
          window.location.hostname = host[1];
        });
      } else {
        broadcast(false);
      }

      function broadcast(org) {
        $timeout(function(){
          $scope.$broadcast('subdomain', org);
        }, 150);
      }
    }
  }
})();