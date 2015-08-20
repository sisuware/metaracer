(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .directive('navbar', navbar);

  navbar.$inject = ['Auth', '$location'];
  
  function navbar(Auth, $location) {
    var directive = {
      templateUrl: 'components/navbar/navbar.html',
      link: navbarLinkController
    };

    return directive;

    function navbarLinkController(scope, element, attrs) {
      scope.isCollapsed = true;
      scope.isLoggedIn = Auth.isLoggedIn;
      scope.isAdmin = Auth.isAdmin;
      scope.getCurrentUser = Auth.getCurrentUser;

      scope.logout = function() {
        Auth.logout();
        $location.path('/login');
      };

      scope.isActive = function(route) {
        return route === $location.path();
      };
    }
  }
})();