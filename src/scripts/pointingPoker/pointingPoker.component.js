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
  function pointingPokerCtrl( firebase,$window,  firebasePointingPokerService) {

    var self = this;
    self.user = {};
    self.room = undefined;
    self.pointingValues = [0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?'];
    self.signIn = signIn;
    self.signOut = signOut;
    self.joinRoom = joinRoom;
    self.vote = vote;
    self.toggleVotes = toggleVotes;
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
      $window.onbeforeunload = function(){
        self.signOut();
      }
    };

    function joinRoom(number) {
      self.selectedRoom = number;
       firebasePointingPokerService.getRoom(number).then(function(roomObj){
         self.room = roomObj;
       })
    }

    function signIn(userName) {
      firebasePointingPokerService.createUser(userName, self.room).then(function(userObj){
        self.user = userObj;
      });
    }

    function signOut(){
      firebasePointingPokerService.removeUser(self.user, self.room);
    }

    function vote(user, vote){
      firebasePointingPokerService.userVote(user, vote);
    }

    function toggleVotes(){
      firebasePointingPokerService.toggleVotesShown(self.room);
    
    }
    
    function generateRandomRoomNumber(){
      self.roomNumber = Math.floor((Math.random() * 10000) +1);
    }


  }
})();
