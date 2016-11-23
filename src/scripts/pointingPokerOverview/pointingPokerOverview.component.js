(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:pointingPokerOverview
   * @description
   *
   */

  angular.module('pointingPoker').component('pointingPokerOverview', {
        bindings: {},
        controller: pointingPokerOverviewCtrl,
        controllerAs: 'pointingPokerOverviewCtrl',
        templateUrl: 'src/scripts/pointingPokerOverview/pointingPokerOverview.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name pointingPoker.controllers:pointingPokerOverviewCtrl
   * @description
   *
   */
  function pointingPokerOverviewCtrl(firebasePointingPokerService, $stateParams) {

    var self = this;
    self.$onInit = $onInit;


    function $onInit() {

      _init();


    }


    function _init() {
      if (self.user != undefined) {
        self.signOut()
      }
      firebasePointingPokerService.getRoom($stateParams.roomNumber).then(function(roomObj) {
        self.room = roomObj;
        firebasePointingPokerService.createUser($stateParams.userName, self.room).then(function(userObj) {
          self.user = userObj;
        })
      });
    }
  }
})();
