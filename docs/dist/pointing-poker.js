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
        'firebase',
          'ui.router',
        'dvm.templates'
      ]);

}());

(function() {
  'use strict';

  angular.module('pointingPoker').config(["$stateProvider", function($stateProvider) {

    $stateProvider
        .state('app', {
          abstract: true,
          url: ''
        })
        .state('app.join-room', {
          url: '/',
          views: {
            'content@': {
              template: '<pointing-poker-room-selection></pointing-poker-room-selection>'
            },
            'sidebar@': {
              template: '<pointing-poker-overview></pointing-poker-overview>'
            }
          }
        })
        .state('app.choose-name', {
          url: '/:roomNumber',
          views: {
            'content@': {
              template: '<pointing-poker-user-selection></pointing-poker-user-selection>'
            },
            'sidebar@': {
              template: '<pointing-poker-overview></pointing-poker-overview>'
            }
          }
        })
        .state('app.pointing', {
          url: '/:roomNumber/:userName',

          views: {
            'content@': {
              template: '<pointing-poker-pointing></pointing-poker-pointing>'
            },
            'sidebar@': {
              template: '<pointing-poker-overview></pointing-poker-overview>'
            }
          }

        })
  }])
      .run(["$rootScope", "$state", "$stateParams", "$timeout", function($rootScope, $state, $stateParams,  $timeout) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $timeout(function(){
          if(!$stateParams.roomNumber){
             $state.transitionTo('app.join-room');
          }
        },500)


      }])

})();
(function() {
  'use strict';

  angular.module('pointingPoker').filter('reverse', function() {
    return function(items) {
      if(items){
        return items.slice().reverse();
      }
    };
  });

})();
(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:pointingPokerChat
   * @description
   *
   */

  pointingPokerChatCtrl.$inject = ["firebasePointingPokerService", "$anchorScroll", "$rootScope", "$location", "$stateParams"];
  angular.module('pointingPoker').component('pointingPokerChat', {
        bindings: {},
        controller: pointingPokerChatCtrl,
        controllerAs: 'pointingPokerChatCtrl',
        templateUrl: 'src/scripts/pointingPokerChat/pointingPokerChat.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name pointingPoker.controllers:pointingPokerChatCtrl
   * @description
   *
   */
  function pointingPokerChatCtrl(firebasePointingPokerService, $anchorScroll, $rootScope, $location, $stateParams) {

    var self = this;
    self.chatVisible = false;

    self.toggleChatVisibility = toggleChatVisibility;
    self.sendMessage = sendMessage;
    self.$onInit = $onInit;


    function $onInit() {
      _init();
      $rootScope.$watch(function() {
            return $location.path();
          },
          function(newValue, oldValue) {
            _init();

          });


    }

    function _init() {
      if ($stateParams.roomNumber) {
        firebasePointingPokerService.getRoom($stateParams.roomNumber).then(function(roomObj) {
          self.room = roomObj;
          firebasePointingPokerService.createUser($stateParams.userName, self.room).then(function(userObj) {
            self.user = userObj;
            _initWatchOnMessages();
          })
        });
      }

    }

    function toggleChatVisibility() {
      self.chatVisible = !self.chatVisible;
      _scrollToLastMessage();
    }

    function sendMessage(message) {
      if(message!=''){
        self.room = firebasePointingPokerService.sendMessage(self.room, self.user.$id, message);
        self.currentMessage = '';
        self.room.$save();
      }
    }

    function _initWatchOnMessages() {
      $anchorScroll.yOffset = 50;
      $rootScope.$watch(function() {
            return self.room.messages;
          },
          function(newValue, oldValue) {
            _scrollToLastMessage();
          });
    }

    function _scrollToLastMessage(){
      $location.hash('go-unicorns');
      $anchorScroll();
      $location.hash('');
    }

  }
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

  }
})();

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

(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:pointingPokerFooter
   * @description
   *
   */

  angular.module('pointingPoker').component('pointingPokerFooter', {
        bindings: {},
        controller: pointingPokerFooterCtrl,
        controllerAs: 'pointingPokerFooterCtrl',
        templateUrl: 'src/scripts/pointingPokerFooter/pointingPokerFooter.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name pointingPoker.controllers:pointingPokerFooterCtrl
   * @description
   *
   */
  function pointingPokerFooterCtrl( ) {

    var self = this;

  }
})();

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

(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:pointingPokerOverview
   * @description
   *
   */

  pointingPokerOverviewCtrl.$inject = ["firebasePointingPokerService", "$rootScope", "$stateParams"];
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
  function pointingPokerOverviewCtrl(firebasePointingPokerService, $rootScope, $stateParams) {

    var self = this;
    self.voteSumary = [];
    self.$onInit = $onInit;


    function $onInit() {
      _init();



    }
    
    function _init() {
      firebasePointingPokerService.getRoom($stateParams.roomNumber).then(function(roomObj) {
        self.room = roomObj;
        firebasePointingPokerService.createUser($stateParams.userName, self.room).then(function(userObj) {
          self.user = userObj;
          _setWatchOnRoom();
        })
      });
    }

    function _setWatchOnRoom(){
      $rootScope.$watch(function() {
            return self.room;
          },
          function(newValue, oldValue) {
            if(self.room && self.room.users){
              self.voteSumary = _calculateNewStatistics(self.room.users);
              _setSomeoneVoted(self.room, self.voteSumary);
            }
          }, true);
    }

    function _calculateNewStatistics(users){
      var voteSumary = {};
      angular.forEach(users,  function(user){
        if(voteSumary[user.vote]==undefined){
          voteSumary[user.vote] ={
              amount :1,
            vote: user.vote
          };
        }else{
          voteSumary[user.vote].amount = voteSumary[user.vote].amount+1;
        }
      });



      return voteSumary;
    }

    function _setSomeoneVoted(room, sumary){
      var somethingVoted = _somethingIsVoted(sumary);
      if(Object.keys(sumary).length>0 && somethingVoted){
        room.someoneVoted=true;
        if(Object.keys(sumary).length==1 && somethingVoted){
          room.totalAgreement=true;
        }else{
          room.totalAgreement=false;
        }
      }else{
        room.someoneVoted=false;
      }
      self.room.$save();
    }

    function _somethingIsVoted(sumary){
      var somethingIsVoted = false;
      angular.forEach(sumary, function(value){
        if(value.vote != undefined){
          somethingIsVoted = true;
        }
      });
      return somethingIsVoted;
    }




  }
})();

(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:pointingPokerPointing
   * @description
   *
   */

  pointingPokerPointingCtrl.$inject = ["$stateParams", "$rootScope", "$location", "$window", "firebasePointingPokerService"];
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
    self.toggleVoting = toggleVoting;
    self.agreement =agreement;
    self.explainStory = explainStory;

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
      self.user = firebasePointingPokerService.userVote(user, vote);
      self.user.$save();
    }

    function resetVotes(){
       self.room = firebasePointingPokerService.resetVotes(self.room);
       self.room = firebasePointingPokerService.toggleVoting(self.room, false);
      self.room.$save();
    }

    function toggleVotes() {
       self.room = firebasePointingPokerService.toggleVoting(self.room, false);
       self.room = firebasePointingPokerService.toggleVotesShown(self.room);
      self.room.$save()
    }

    function toggleVoting(){
      self.room = firebasePointingPokerService.toggleVotesShown(self.room, false);
      self.room = firebasePointingPokerService.toggleVoting(self.room, true);
      self.room.$save()
    }

    function agreement(){
      if(self.room.someoneVoted){
        firebasePointingPokerService.toggleVoting(self.room, true);
        firebasePointingPokerService.toggleVotesShown(self.room, true);
        self.room.$save()
      }else{
        alert('No, no, I\'m sorry to disappoint you but you can\'t get to an agreement without any votes :(')
      }
    }

    function explainStory(){
      firebasePointingPokerService.toggleVotesShown(self.room, false);
      firebasePointingPokerService.toggleVoting(self.room, false);
      firebasePointingPokerService.resetVotes(self.room);
      self.room.$save()
    }

    function _init() {
      if (self.user != undefined && self.user!='') {
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

(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:pointingPokerRoomSelection
   * @description
   *
   */

  pointingPokerRoomSelectionCtrl.$inject = ["firebasePointingPokerService", "$state"];
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

(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:pointingPokerUserSelection
   * @description
   *
   */

  pointingPokerUserSelectionCtrl.$inject = ["$stateParams", "$state", "firebasePointingPokerService"];
  angular.module('pointingPoker').component('pointingPokerUserSelection', {
        bindings: {},
        require: {
          pointingPokerCtrl: '^pointingPoker'
        },
        controller: pointingPokerUserSelectionCtrl,
        controllerAs: 'pointingPokerUserSelectionCtrl',
        templateUrl: 'src/scripts/pointingPokerUserSelection/pointingPokerUserSelection.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name pointingPoker.controllers:pointingPokerUserSelectionCtrl
   * @description
   *
   */
  function pointingPokerUserSelectionCtrl($stateParams,$state, firebasePointingPokerService) {

    var self = this;
    self.signIn = signIn;
    
    function signIn(userName) {
      if(userName!='' && userName!=undefined){
        $state.transitionTo('app.pointing', {roomNumber:  $stateParams.roomNumber, userName: userName});
      }else{
        alert('That can\'t be your name, don\'t lie to me. pls D:');
      }
    }

  }
})();

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

