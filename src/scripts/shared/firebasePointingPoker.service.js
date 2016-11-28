(function() {
  'use strict';
  angular.module('pointingPoker')
      .provider('firebasePointingPokerService', function() {

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
          self.resetVotes = resetVotes;
          self.toggleVoting = toggleVoting;
          self.toggleVotesShown = toggleVotesShown;
          self.sendMessage = sendMessage;


          function initFirebaseConfig() {
            var config = {
              apiKey: 'AIzaSyB816_FHDl69dqH_PJzH5FqR6mAUztq1cM',
              authDomain: 'unicorn-pointing-poker.firebaseapp.com',
              databaseURL: 'https://unicorn-pointing-poker.firebaseio.com',
              storageBucket: 'unicorn-pointing-poker.appspot.com'
            };
            firebase.initializeApp(config);
          }

          function sendMessage(room, userName, message){
            var messageObj = {
              message: message,
              userName: userName,
              timestamp: new Date().getTime()
            };
            if(!room.messages){
              room.messages = [];
            }
            room.messages.push(messageObj);
            return room;
          }

          function toggleVotesShown(room, opt_bool) {
            room.votesShown = !room.votesShown;
            if (opt_bool != undefined) {
              room.votesShown = opt_bool;
            }
            return room;
          }

          function resetVotes(room) {
            angular.forEach(room.users, function(user) {
              user.vote = null;
            });
            room.votesShown = false;
            return room;
          }

          function toggleVoting(room, opt_bool) {
            room.votingInitialized = !room.votingInitialized;
            if (opt_bool != undefined) {
              room.votingInitialized = opt_bool;
            }
            return room;
          }

          function userVote(user, vote) {
            user.vote = vote;
            return user;
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
              var userRef = firebase.database().ref().child('rooms/' + room.$id + '/users/' + user.$id);
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

          function _addAndSaveBasicUserStructure(obj, userName) {
            obj.user = userName;
            obj.vote = null;
            obj.$save();
          }


          return self;
        }
      });
})();

