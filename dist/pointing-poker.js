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

        'dvm.templates'
      ]);

}());

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name poitingPoker.components:elseisPlay
   * @description
   *
   */

  pointingPokerCtrl.$inject = ["$window", "$scope"];
  angular.module('pointingPoker').component('pointingPoker', {
        bindings: {
        },
        controller: pointingPokerCtrl,
        controllerAs: 'pointingPokerCtrl',
        templateUrl: 'src/scripts/pointingPoker/pointingPoker.tpl.html'
      }
  );

  /**
   * @ngdoc controller
   * @name poitingPoker.controllers:pointingPokerCtrl
   * @description
   *
   */
  function pointingPokerCtrl($window, $scope) {

    var self = this;


    /**
     * @ngdoc method
     * @name $onInit
     * @methodOf pointingPoker.controllers:pointingPokerCtrl
     * @description
     *
     */
    self.$onInit = function $onInit() {
    };





  }
})();
