(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name
   *
   * @description
   *
   */
  angular.module(
      'pointingPoker',

      // DEPENDENCIES
      [
        'firebase'
        //'dvm.templates'
      ]);

}());

(function() {
  'use strict';
  angular.module('pointingPoker')
      .provider('firebasePointingPokerService', function() {

        firebasePointingPokerService.$inject = ["firebase", "$firebaseObject", "$q"];
        this.$get = firebasePointingPokerService;

        /**
         * @ngdoc service
         * @name tsi.webtastic.track.dialog.notes:tsiNotesCRUDService
         * @description
         *
         */
        function firebasePointingPokerService(firebase, $firebaseObject, $q) {
          var self = this;

          self.initFirebaseConfig = initFirebaseConfig;

          self.getRoom = getRoom;
          self.removeUser = removeUser;
          self.createUser = createUser;
          self.userVote = userVote;
          self.toggleVotesShown = toggleVotesShown;

          function initFirebaseConfig() {
            var config = {
              apiKey: 'AIzaSyB816_FHDl69dqH_PJzH5FqR6mAUztq1cM',
              authDomain: 'unicorn-pointing-poker.firebaseapp.com',
              databaseURL: 'https://unicorn-pointing-poker.firebaseio.com',
              storageBucket: 'unicorn-pointing-poker.appspot.com'
            };
            firebase.initializeApp(config);
          }

          function toggleVotesShown(room){
            room.votesShown = !room.votesShown;
            room.$save();
          }

          function userVote(user, vote){
            user.vote = vote;
            user.$save();
          }

          function getRoom(roomNumber) {
            var deferred = $q.defer();
            var sessionsRef = firebase.database().ref().child('rooms/' + roomNumber);
            var obj = $firebaseObject(sessionsRef);

            obj.$loaded().then(function() {
              deferred.resolve(obj);
            });
            return deferred.promise;
          }

          function removeUser(user, room) {
            if (user.$id && room.$id) {
              var userRef = firebase.database().ref().child('rooms/' + room.$id + '/users/'+user.$id);
              var obj = $firebaseObject(userRef);
              obj.$remove().then(function(ref) {
                console.log('user removed')
              }, function(error) {
                console.log("Removing Error:", error);
              });
            }
          }

          function createUser(userName, room) {
            var deferred = $q.defer();
            var userRef = firebase.database().ref().child('rooms/' + room.$id + '/users/' + userName);
            var obj = $firebaseObject(userRef);
            _addAndSaveBasicUserStructure(obj, userName)
            obj.$loaded().then(function() {
              deferred.resolve(obj);
            });
            return deferred.promise;

          }

          function _addAndSaveBasicUserStructure(obj, userName){
            obj.user = userName;
            obj.vote = null;
            obj.$save();
          }


          return self;
        }
      });
})();


(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:elseisPlay
   * @description
   *
   */

  pointingPokerCtrl.$inject = ["firebase", "$window", "firebasePointingPokerService"];
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
