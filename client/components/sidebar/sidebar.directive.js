(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .directive('sidebar', sidebar);

  sidebar.$inject = ['$location', 'Auth', '$state'];
  
  function sidebar($location, Auth, $state) {
    var menus = {
      'organization': [
        {'title': 'Forms', 'param': 'organizations', 'go':'forms.list' },
        {'title': 'Members', 'param': 'organizations', 'go':'members' },
      ],
      'settings': [
        {'title': 'Account', 'link': 'settings', 'go':'settings'},
        {'title': 'Password', 'link': 'settings/password', 'go':'settings.password' }
      ],
      'legal': []
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
      scope.stateParam = stateParam;

      function isActive(route) {
        return route === $location.path();
      }

      function stateParam() {
        if ($state.params) {
          return $state.params;
        } else {
          return false;
        }
      }

      function unwrapLink(link) {
        var keys = _.keys($state.params);
        var regex = new RegExp(':(' + keys.join('|') + ')');
        var match = link.match(regex);

        if (match && match.length) {
          link = link.replace(match[0], $state.params[match[1]]);
        } 

        return link;
      }
    }
  }
})();