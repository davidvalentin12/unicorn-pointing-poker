(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:pointingPokerHeader
   * @description
   *
   */

  angular.module('pointingPoker').component('pointingPokerHeader', {
        bindings: {},
        controller: pointingPokerHeaderCtrl,
        controllerAs: 'pointingPokerHeaderCtrl',
        templateUrl: 'src/scripts/pointingPokerHeader/pointingPokerHeader.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name pointingPoker.controllers:pointingPokerHeaderCtrl
   * @description
   *
   */
  function pointingPokerHeaderCtrl( ) {

    var self = this;

  }
})();
