(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .directive('sidebar', sidebar);

  sidebar.$inject = ['$location'];
  
  function sidebar($location) {
    var directive = {
      templateUrl: 'components/sidebar/sidebar.html',
      link: sidebarLinkController
    };

    return directive;

    function sidebarLinkController(scope, element, attrs) {
      scope.menu = [
        {'title': 'Home', 'link': '/' },
        {'title': 'Forms', 'link': '/forms' }
      ];

      scope.isActive = function(route) {
        return route === $location.path();
      };
    }
  }
})();