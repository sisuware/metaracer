(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .directive('sidebar', sidebar);

  sidebar.$inject = ['$location', 'Auth'];
  
  function sidebar($location, Auth) {
    var directive = {
      templateUrl: 'components/sidebar/sidebar.html',
      link: sidebarLinkController
    };

    return directive;

    function sidebarLinkController(scope, element, attrs) {
      scope.menu = [
        {'title': 'Home', 'link': '/' },
        {'title': 'Forms', 'link': '/forms' },
        {'title': 'Organizations', 'link': '/organizations' }
      ];

      scope.isLoggedIn = Auth.isLoggedIn;
      scope.isAdmin = Auth.isAdmin;
      scope.getCurrentUser = Auth.getCurrentUser;

      scope.isActive = function(route) {
        return route === $location.path();
      };
    }
  }
})();