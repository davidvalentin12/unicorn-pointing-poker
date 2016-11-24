(function() {
  'use strict';

  angular.module('pointingPoker').config(function($stateProvider) {

    $stateProvider
        .state('app', {
          abstract: true,
          url: '',

        })
        .state('app.join-room', {
          url: '/',
          views: {
            'content@': {
              template: '<pointing-poker-room-selection></pointing-poker-room-selection>'
            },
            'sidebar@': {
              template: '<pointing-poker-overview></pointing-poker-overview>'
            }
          }
        })
        .state('app.choose-name', {
          url: '/:roomNumber',
          views: {
            'content@': {
              template: '<pointing-poker-user-selection></pointing-poker-user-selection>'
            },
            'sidebar@': {
              template: '<pointing-poker-overview></pointing-poker-overview>'
            }
          }
        })
        .state('app.pointing', {
          url: '/:roomNumber/:userName',

          views: {
            'content@': {
              template: '<pointing-poker-pointing></pointing-poker-pointing>'
            },
            'sidebar@': {
              template: '<pointing-poker-overview></pointing-poker-overview>'
            }
          }

        })
  })
      .run(function($rootScope, $state, $stateParams,  $timeout) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $timeout(function(){
          if(!$stateParams.roomNumber){
             $state.transitionTo('app.join-room');
          }
        },500)


      })

})();