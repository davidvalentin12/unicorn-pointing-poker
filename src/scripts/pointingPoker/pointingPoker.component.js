(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:elseisPlay
   * @description
   *
   */

  angular.module('pointingPoker').component('pointingPoker', {
        bindings: {},
        controller: pointingPokerCtrl,
        controllerAs: 'pointingPokerCtrl',
        templateUrl: 'src/scripts/pointingPoker/pointingPoker.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name pointingPoker.controllers:pointingPokerCtrl
   * @description
   *
   */
  function pointingPokerCtrl( firebase, firebasePointingPokerService) {

    var self = this;
    self.user = {};
    self.room = undefined;
    self.signIn = signIn;
    self.signOut = signOut;
    self.joinRoom = joinRoom;
    self.generateRandomRoomNumber = generateRandomRoomNumber;

    /**
     * @ngdoc method
     * @name $onInit
     * @methodOf pointingPoker.controllers:pointingPokerCtrl
     * @description
     *
     */
    self.$onInit = function $onInit() {

      firebasePointingPokerService.initFirebaseConfig();

    };

    function joinRoom(number) {
      self.selectedRoom = number;
       firebasePointingPokerService.getRoom(number).then(function(value){
         self.room = value;
         console.log(value);
       })

    }

    function signIn(userName) {
      firebasePointingPokerService.createUser(userName, self.room.$id);
    }

    function signOut(){
      firebasePointingPokerService.removeUser();
    }

    

    function generateRandomRoomNumber(){
      self.roomNumber = Math.floor((Math.random() * 10000) +1);
    }


  }
})();
