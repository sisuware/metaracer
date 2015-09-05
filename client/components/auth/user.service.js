'use strict';

angular.module('metaracerApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      verifyEmail: {
        method: 'PUT  ',
        params: {
          controller: 'verifyEmail'
        }
      }
	  });
  });
