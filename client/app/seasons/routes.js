(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .config(metaracerAppConfig);

  metaracerAppConfig.$inject = ['$stateProvider'];

  function metaracerAppConfig($stateProvider) {
    organizationResolve.$inject = ['Organizations', '$stateParams'];
    seasonsResolve.$inject = ['Seasons', '$stateParams']; 
    seasonResolve.$inject = ['Seasons', '$stateParams']; 
    newSeasonResolve.$inject = ['Seasons', '$stateParams']; 

    function organizationResolve(Organizations, $stateParams) {
      return Organizations.get({'id': $stateParams.id});
    }

    function seasonsResolve(Seasons, $stateParams) {
      return Seasons.query()
    }

    function seasonResolve(Seasons, $stateParams) {
      return Seasons.get({'id': $stateParams.season_id });
    }

    function newSeasonResolve(Seasons, $stateParams) {
      return new Seasons({'_organization': $stateParams.id});
    }

    $stateProvider
      .state('seasons', {
        url: '/organizations/:id/seasons',
        templateUrl: 'app/seasons/layout.html',
        authenticate: true,
        abstract: true
      })
      .state('seasons.list', {
        url: '',
        templateUrl: 'app/seasons/list/index.html',
        controller: 'SeasonsIndexController',
        authenticate: true,
        resolve: {
          organization: organizationResolve,
          seasons: seasonsResolve
        }
      })
      .state('seasons.new', {
        url: '/new',
        templateUrl: 'app/seasons/new/index.html',
        controller: 'SeasonsNewController',
        authenticate: true,
        resolve: {
          //organization: organizationResolve,
          season: newSeasonResolve
        }
      })
      .state('seasons.show', {
        url: '/:season_id/show',
        templateUrl: 'app/seasons/show/index.html',
        controller: 'SeasonsShowController',
        authenticate: true,
        resolve: {
          season: seasonResolve
        }
      })
      .state('seasons.edit', {
        url: '/:season_id/edit',
        templateUrl: 'app/seasons/edit/index.html',
        controller: 'SeasonsEditController',
        authenticate: true,
        resolve: {
          season: seasonResolve
        }
      })
      .state('seasons.delete', {
        url: '/:season_id/delete',
        templateUrl: 'app/seasons/delete/index.html',
        controller: 'SeasonsDeleteController',
        authenticate: true,
        resolve: {
          season: seasonResolve
        }
      });
  }
})();