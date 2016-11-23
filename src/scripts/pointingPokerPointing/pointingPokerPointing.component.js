(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:pointingPokerPointing
   * @description
   *
   */

  angular.module('pointingPoker').component('pointingPokerPointing', {
        bindings: {},
        controller: pointingPokerPointingCtrl,
        controllerAs: 'pointingPokerPointingCtrl',
        templateUrl: 'src/scripts/pointingPokerPointing/pointingPokerPointing.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name pointingPoker.controllers:pointingPokerPointingCtrl
   * @description
   *
   */
  function pointingPokerPointingCtrl($stateParams, $rootScope, $location, $window, firebasePointingPokerService) {

    var self = this;

    self.pointingValues = [0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?'];

    self.$onInit = $onInit;
    self.signOut = signOut;
    self.vote = vote;
    self.toggleVotes = toggleVotes;
    self.resetVotes = resetVotes;

    function $onInit() {
      $window.onbeforeunload = function() {
        self.signOut();
      };

      $rootScope.$watch(function() {
            return $location.path();
          },
          function(newValue, oldValue) {
            _removeOldUser(newValue, oldValue);
          });
      _init();
    }

    function signOut() {
      firebasePointingPokerService.removeUser(self.user, self.room);
    }

    function vote(user, vote) {
      firebasePointingPokerService.userVote(user, vote);
    }

    function resetVotes(){

      firebasePointingPokerService.resetVotes(self.room);
    }

    function toggleVotes() {
      firebasePointingPokerService.toggleVotesShown(self.room);
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

    function _removeOldUser(newPath, oldPath) {
      var newPathArg = newPath.split('/');
      var oldPathArg = oldPath.split('/');
      if (newPathArg[2] != oldPathArg[2]) {
        firebasePointingPokerService.getRoom(oldPathArg[1]).then(function(roomObj) {
          firebasePointingPokerService.createUser(oldPathArg[2], oldPathArg[1]).then(function(userObj) {
            firebasePointingPokerService.removeUser(userObj, roomObj);
          })
        });
      }
    }

  }
})();
