(function () {
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
    function pointingPokerCtrl(firebase, $window, firebasePointingPokerService, $http) {

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

            $http.get('/api/rooms').then(function (res) {
                console.log(res);
            });
            $http.post('/api/room', {name: 'roomName2'}).then(function (res) {
                console.log(res);
            })
        };

    }
})();
