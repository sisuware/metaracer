(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .directive('sidebar', sidebar);

  sidebar.$inject = ['$location', 'Auth', '$state'];
  
  function sidebar($location, Auth, $state) {
    var menus = {
      'organization': [
        {'title': 'Forms', 'link': 'organizations/:id/forms' },
        {'title': 'Members', 'link': 'organizations/:id/members' },
      ]
    };

    var directive = {
      templateUrl: 'components/sidebar/sidebar.html',
      link: sidebarLinkController
    };

    return directive;

    function sidebarLinkController(scope, element, attrs) {
      scope.menu = menus[attrs.menu] || [];

      scope.isLoggedIn = Auth.isLoggedIn;
      scope.isAdmin = Auth.isAdmin;
      scope.getCurrentUser = Auth.getCurrentUser;
      scope.isActive = isActive;
      scope.unwrapLink = unwrapLink;

      function isActive(route) {
        return route === $location.path();
      }

      function unwrapLink(link) {
        var keys = _.keys($state.params);
        var regex = new RegExp(':(' + keys.join('|') + ')');
        var match = link.match(regex);

        if (match.length) {
          link = link.replace(match[0], $state.params[match[1]]);
        } 

        return link;
      }
    }
  }
})();