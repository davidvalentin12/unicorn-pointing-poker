(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:pointingPokerUserSelection
   * @description
   *
   */

  angular.module('pointingPoker').component('pointingPokerUserSelection', {
        bindings: {},
        require: {
          pointingPokerCtrl: '^pointingPoker'
        },
        controller: pointingPokerUserSelectionCtrl,
        controllerAs: 'pointingPokerUserSelectionCtrl',
        templateUrl: 'src/scripts/pointingPokerUserSelection/pointingPokerUserSelection.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name pointingPoker.controllers:pointingPokerUserSelectionCtrl
   * @description
   *
   */
  function pointingPokerUserSelectionCtrl($stateParams,$state, firebasePointingPokerService) {

    var self = this;
    self.signIn = signIn;
    
    function signIn(userName) {


      $state.transitionTo('app.pointing', {roomNumber:  $stateParams.roomNumber, userName: userName});
    }

  }
})();
