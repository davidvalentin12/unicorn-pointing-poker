(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:pointingPokerRoomSelection
   * @description
   *
   */

  angular.module('pointingPoker').component('pointingPokerRoomSelection', {
        bindings: {},
        require:{
          pointingPokerCtrl: '^pointingPoker'
        },
        controller: pointingPokerRoomSelectionCtrl,
        controllerAs: 'pointingPokerRoomSelectionCtrl',
        templateUrl: 'src/scripts/pointingPokerRoomSelection/pointingPokerRoomSelection.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name pointingPoker.controllers:pointingPokerRoomSelectionCtrl
   * @description
   *
   */
  function pointingPokerRoomSelectionCtrl(firebasePointingPokerService, $state) {

    var self = this;

    self.generateRandomRoomNumber = generateRandomRoomNumber;
    self.joinRoom = joinRoom;
    

    function generateRandomRoomNumber() {
      self.roomNumber = Math.floor((Math.random() * 10000) + 1);
    }

    function joinRoom(number) {
      self.selectedRoom = number;

      if(number!='' && number!=undefined){
        $state.transitionTo('app.choose-name', {roomNumber: number});
      }else{
        alert('You don\'t want to  join that room, trust me, you don\'t :$');
      }
    }

  }
})();
