(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name pointingPoker.components:pointingPokerChat
   * @description
   *
   */

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
