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

          function initFirebaseConfig() {
            var config = {
              apiKey: 'AIzaSyB816_FHDl69dqH_PJzH5FqR6mAUztq1cM',
              authDomain: 'unicorn-pointing-poker.firebaseapp.com',
              databaseURL: 'https://unicorn-pointing-poker.firebaseio.com',
              storageBucket: 'unicorn-pointing-poker.appspot.com'
            };
            firebase.initializeApp(config);
          }

          function getRoom(roomNumber) {
            var deferred = $q.defer();
            var sessionsRef = firebase.database().ref().child('rooms/' + roomNumber);
            var obj = $firebaseObject(sessionsRef);
            obj.$loaded().then(function() {
              angular.forEach(obj, function(value, key) {
                console.log(key, value);
              });
              deferred.resolve(obj);
            });
            return deferred.promise;
          }


          function removeUser(userName) {

          }

          function createUser(userName, roomNumber){
            firebase.database().ref().child('rooms/' + roomNumber + '/'+userName);
          }


          return self;
        }
      });
})();

