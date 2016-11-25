(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:pointingPokerChatMessage
   * @description
   *
   */

  angular.module('pointingPoker').component('pointingPokerChatMessage', {
        bindings: {
          message: '<',
          user: '<',
          timestamp: '<',
          currentUser: '<'
        },
        controller: pointingPokerChatMessageCtrl,
        controllerAs: 'pointingPokerChatMessageCtrl',
        templateUrl: 'src/scripts/pointingPokerChatMessage/pointingPokerChatMessage.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name pointingPoker.controllers:pointingPokerChatMessageCtrl
   * @description
   *
   */
  function pointingPokerChatMessageCtrl() {
    var self = this;

    

  }
})();
