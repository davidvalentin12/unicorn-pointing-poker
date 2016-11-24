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
          _setWatchOnVotesShown();
        })
      });
    }

    function _setWatchOnVotesShown(){
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
      if(Object.keys(sumary).length>0 && sumary[Object.keys(sumary)[0]].vote != undefined){
        room.someoneVoted=true;
        room.$save();
      }else{
        room.someoneVoted=false;
        room.$save()
      }
    }




  }
})();
