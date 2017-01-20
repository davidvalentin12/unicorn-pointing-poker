(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/scripts/pointingPoker/pointingPoker.tpl.html',
    '<pointing-poker-header></pointing-poker-header><main class="slds-p-top--xx-large slds-grid slds-grid--frame slds-grid--align-center"><div class="slds-size--4-of-5 slds-p-top--xx-large"><div class="slds-size--2-of-3 slds-float--left slds-p-horizontal--medium"><div ui-view=content id=container></div></div><div class="slds-size--1-of-3 slds-float--right slds-p-horizontal--medium"><div ui-view=sidebar id=sidebar></div></div></div></main><pointing-poker-footer></pointing-poker-footer><pointing-poker-chat></pointing-poker-chat>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/scripts/pointingPokerChat/pointingPokerChat.tpl.html',
    '<div class="slds-docked_container unicorn-chat"><div role=dialog aria-labelledby=dialog-heading-id class="slds-docked-composer slds-grid slds-grid--vertical slds-nowrap" ng-class="{\'slds-is-open\':pointingPokerChatCtrl.chatVisible}"><header class="slds-docked-composer__header slds-grid slds-grid--align-spread slds-shrink-none"><div class="slds-media slds-media--center"><div class=slds-media__figure><span class="slds-icon_container unicorn-image-wrapper"><img class=unicorn-image src=/unicorn-pointing-poker/src/images/uni_logo.jpg><span class=slds-assistive-text></span></span></div><div class=slds-media__body><h2 id=dialog-heading-id>Unicorn Chat {{pointingPokerChatCtrl.room.$id}} - {{pointingPokerChatCtrl.user.$id}}</h2></div></div><div class=slds-docked-composer__actions><button class="slds-button slds-button--icon slds-button--icon-inverse" title="Minimize window" ng-click=pointingPokerChatCtrl.toggleChatVisibility()><svg aria-hidden=true class=slds-button__icon><use xlink:href=/unicorn-pointing-poker/assets/icons/utility-sprite/svg/symbols.svg#minimize_window></use></svg> <span class=slds-assistive-text>Minimize window</span></button></div></header><div class="slds-docked-composer__body slds-scrollable--y slds-col slds-grid slds-grid--vertical slds-nowrap slds-size--1-of-1"><div id=go-unicorns>-<br>-</div><pointing-poker-chat-message ng-repeat="message in pointingPokerChatCtrl.room.messages | reverse" message=message.message user=message.userName timestamp=message.timestamp currentuser=pointingPokerChatCtrl.user.$id></pointing-poker-chat-message></div><footer class="slds-docked-composer__footer slds-shrink-none"><div ng-show="pointingPokerChatCtrl.user.$id!=\'undefined\'"><div class="slds-float--left slds-grid slds-size--3-of-4"><div class="slds-form-element slds-grid slds-size--4-of-4"><textarea id=textarea-input-01 class=slds-textarea ng-model=pointingPokerChatCtrl.currentMessage placeholder="Placeholder Text" ng-keyup="$event.keyCode == 13 && pointingPokerChatCtrl.sendMessage(pointingPokerChatCtrl.currentMessage)"></textarea></div></div><div class="slds-float--right slds-grid slds-grid--align-end slds-size--1-of-4 slds-text-align--right"><button class="slds-button slds-button--brand slds-size--3-of-4" ng-click=pointingPokerChatCtrl.sendMessage(pointingPokerChatCtrl.currentMessage)>Send</button></div></div><div class="slds-m-vertical--medium slds-grid slds-grid--align-center" ng-show="pointingPokerChatCtrl.user.$id==\'undefined\'"><label>Join a room! And chat with your team mates!</label></div></footer></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/scripts/pointingPokerChatMessage/pointingPokerChatMessage.tpl.html',
    '<div class=slds-m-around--xx-small><div class="slds-float--left slds-size--5-of-6 slds-text-align--left"><label class=chat-message>{{pointingPokerChatMessageCtrl.message}}</label></div><div class="slds-float--right message-user slds-size--1-of-7 slds-text-align--right"><label ng-bind=pointingPokerChatMessageCtrl.user></label></div><div class=message-info><label ng-bind="pointingPokerChatMessageCtrl.timestamp  | date :  \'h:mm:ss a\' "></label></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/scripts/pointingPokerFooter/pointingPokerFooter.tpl.html',
    '<div class=slds-docked-form-footer><label class=slds-text-align--center>Once a Unicorn, always a Unicorn!</label></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/scripts/pointingPokerHeader/pointingPokerHeader.tpl.html',
    '<header class=slds-global-header_container><div class="slds-global-header slds-grid"><div class="slds-order--2 slds-medium-order--3 slds-align--absolute-center">UNICORN POINTING POKER</div><div class="slds-order--1 slds-medium-order--1"><div class=slds-global-header__item><div class=slds-global-header__logo><img src=/unicorn-pointing-poker/src/images/smile.jpg alt=""></div></div></div></div></header>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/scripts/pointingPokerOverview/pointingPokerOverview.tpl.html',
    '<div ng-if=pointingPokerOverviewCtrl.room.votesShown><h3 class="slds-text-heading--small slds-text-align--center slds-m-vertical--medium">Statistic</h3><div class="statistics-table slds-size--1-of-1 slds-m-top--small"><table class="slds-table slds-table--bordered slds-table--fixed-layout" role=grid><thead><tr class=slds-text-title--caps><th class=slds-is-sortable scope=col aria-label=Points><a href=javascript:void(0); class="slds-th__action slds-text-link--reset"><span class=slds-truncate title="Opportunity Name">Points</span></a></th><th class=slds-is-sortable scope=col aria-label=Votes><a href=javascript:void(0); class="slds-th__action slds-text-link--reset"><span class=slds-truncate title="Account Name">Votes</span></a></th></tr></thead><tbody><tr class=slds-hint-parent ng-repeat="vote in pointingPokerOverviewCtrl.voteSumary"><th scope=row data-label=Unicorn><div class=slds-truncate title=Vote><div ng-bind=vote.vote ng-if="vote.vote && vote.vote!=\'coffee\'"></div><div ng-show="vote.vote==\'coffee\'"><svg aria-hidden=true class="slds-button__icon coffee-icon"><use xlink:href=/unicorn-pointing-poker/assets/icons/custom-sprite/svg/symbols.svg#custom65></use></svg> <span class=slds-assistive-text>Settings</span></div><label ng-if=!vote.vote>Not voted</label></div></th><td role=gridcell data-label="Unicorn Points"><div class=slds-truncate title="Unicorn Points" ng-hide="!pointingPokerPointingCtrl.room.votesShown &&\n' +
    '                     user.user!=pointingPokerPointingCtrl.user.$id"><label ng-bind=vote.amount></label></div></td></tr></tbody></table></div><img src=/unicorn-pointing-poker/src/images/awesome.jpg ng-show=!pointingPokerOverviewCtrl.room.totalAgreement><div ng-show=pointingPokerOverviewCtrl.room.totalAgreement><img src=/unicorn-pointing-poker/src/images/awesome2.gif><h3 class="slds-text-heading--small slds-text-align--center slds-m-vertical--medium">TOTAL AGREEMENT!!!</h3></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/scripts/pointingPokerUserSelection/pointingPokerUserSelection.tpl.html',
    '<h3 class=slds-text-heading--small>Insert your unicorn name:</h3><div class="join-room-wrapper slds-grid slds-grid--pull-padded-medium slds-size--1-of-1"><input type=text ng-model=pointingPokerUserSelectionCtrl.userName class="slds-input room-number-input slds-size--1-of-2" placeholder="Unicorn name"> <button ng-click=pointingPokerUserSelectionCtrl.signIn(pointingPokerUserSelectionCtrl.userName) class="slds-button slds-size--1-of-2 slds-button--neutral login-btn">SignIn</button></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/scripts/pointingPokerPointing/pointingPokerPointing.tpl.html',
    '<div class="buttons-wrapper slds-m-vertical--medium slds-grid slds-grid--align-center"><button ng-click=" pointingPokerPointingCtrl.toggleVotes() " class="slds-button slds-size--1-of-3 slds-button--neutral"><svg aria-hidden=true class="slds-button__icon slds-button__icon--hint" ng-hide=pointingPokerPointingCtrl.room.votesShown><use xlink:href=/unicorn-pointing-poker/assets/icons/utility-sprite/svg/symbols.svg#preview></use></svg> <svg aria-hidden=true class="slds-button__icon slds-button__icon--hint" ng-hide=!pointingPokerPointingCtrl.room.votesShown><use xlink:href=/unicorn-pointing-poker/assets/icons/utility-sprite/svg/symbols.svg#close></use></svg><label ng-bind="pointingPokerPointingCtrl.room.votesShown ? \'Hide Votes\' : \'Show Votes\' "></label></button> <button ng-click=" pointingPokerPointingCtrl.resetVotes() " class="slds-button slds-size--1-of-3 slds-button--neutral"><svg aria-hidden=true class="slds-button__icon slds-button__icon--hint"><use xlink:href=/unicorn-pointing-poker/assets/icons/utility-sprite/svg/symbols.svg#refresh></use></svg><label ng-bind="\'Reset Votes\'"></label></button></div><div class="pointing-values-wrapper slds-m-vertical--medium slds-grid slds-grid--align-center"><button ng-click="pointingPokerPointingCtrl.vote(pointingPokerPointingCtrl.user, value)" ng-repeat="value in pointingPokerPointingCtrl.pointingValues" ng-class="{\'selected\':(value==pointingPokerPointingCtrl.user.vote)}" class="slds-button slds-button--neutral">{{value}}</button> <button class="slds-button slds-button--neutral" title=Coffee ng-click="pointingPokerPointingCtrl.vote(pointingPokerPointingCtrl.user, \'coffee\')" ng-class="{\'selected\':(\'coffee\'==pointingPokerPointingCtrl.user.vote)}"><svg aria-hidden=true class="slds-button__icon coffee-icon"><use xlink:href=/unicorn-pointing-poker/assets/icons/custom-sprite/svg/symbols.svg#custom65></use></svg></button></div><div class=slds-grid><div class=slds-tabs--path role=application><ul class=slds-tabs--path__nav role=tablist><li class=slds-tabs--path__item role=presentation ng-click=pointingPokerPointingCtrl.explainStory() ng-class="{\n' +
    '                \'slds-is-complete\':pointingPokerPointingCtrl.room.someoneVoted || pointingPokerPointingCtrl.room.votingInitialized,\n' +
    '                 \'slds-is-current\':!pointingPokerPointingCtrl.room.someoneVoted && !pointingPokerPointingCtrl.room.votingInitialized }"><a class=slds-tabs--path__link id=tabs-path-421 aria-controls=content-path-1 aria-selected=false tabindex=-1 role=tab href=javascript:void(0); aria-live=assertive><span class=slds-tabs--path__stage><svg aria-hidden=true class="slds-icon slds-icon--x-small"><use xlink:href=/unicorn-pointing-poker/assets/icons/utility-sprite/svg/symbols.svg#check></use></svg> <span class=slds-assistive-text>Stage Complete</span> </span><span class=slds-tabs--path__title>Explain Story</span></a></li><li class=slds-tabs--path__item role=presentation ng-click=pointingPokerPointingCtrl.toggleVoting() ng-class="{\n' +
    '                \'slds-is-current\':(pointingPokerPointingCtrl.room.someoneVoted && !pointingPokerPointingCtrl.room.votesShown) ||\n' +
    '                 (pointingPokerPointingCtrl.room.votingInitialized && !pointingPokerPointingCtrl.room.votesShown),\n' +
    '                \'slds-is-incomplete\':!pointingPokerPointingCtrl.room.someoneVoted && !pointingPokerPointingCtrl.room.votingInitialized,\n' +
    '                 \'slds-is-complete\': pointingPokerPointingCtrl.room.votesShown && pointingPokerPointingCtrl.room.someoneVoted}"><a class=slds-tabs--path__link id=tabs-path-422 aria-controls=content-path-1 aria-selected=false tabindex=-1 role=tab href=javascript:void(0); aria-live=assertive><span class=slds-tabs--path__stage><svg aria-hidden=true class="slds-icon slds-icon--x-small"><use xlink:href=/unicorn-pointing-poker/assets/icons/utility-sprite/svg/symbols.svg#check></use></svg> <span class=slds-assistive-text>Stage Complete</span> </span><span class=slds-tabs--path__title>Vote</span></a></li><li class=slds-tabs--path__item role=presentation ng-click=pointingPokerPointingCtrl.agreement() ng-class="{\'slds-is-current\':pointingPokerPointingCtrl.room.someoneVoted && pointingPokerPointingCtrl.room.votesShown, \'slds-is-incomplete\':!pointingPokerPointingCtrl.room.someoneVoted || !pointingPokerPointingCtrl.room.votesShown}"><a class=slds-tabs--path__link id=tabs-path-423 aria-controls=content-path-1 aria-selected=false tabindex=-1 role=tab href=javascript:void(0); aria-live=assertive><span class=slds-tabs--path__stage><svg aria-hidden=true class="slds-icon slds-icon--x-small"><use xlink:href=/unicorn-pointing-poker/assets/icons/utility-sprite/svg/symbols.svg#check></use></svg> </span><span class=slds-tabs--path__title>Agreement</span></a></li></ul></div></div><div class="votes-table slds-size--1-of-1 slds-m-top--small"><table class="slds-table slds-table--bordered slds-table--fixed-layout" role=grid><thead><tr class=slds-text-title--caps><th class=slds-cell-shrink scope=col><label class=slds-checkbox><input type=checkbox name=options></label></th><th class=slds-is-sortable scope=col aria-label=Unicorn><a href=javascript:void(0); class="slds-th__action slds-text-link--reset"><span class=slds-truncate title="Opportunity Name">Unicorn</span></a></th><th class=slds-is-sortable scope=col aria-label="Unicorn Points"><a href=javascript:void(0); class="slds-th__action slds-text-link--reset"><span class=slds-truncate title="Account Name">Unicorn Points</span></a></th></tr></thead><tbody><tr class=slds-hint-parent ng-repeat="user in pointingPokerPointingCtrl.room.users"><td role=gridcell class=slds-cell-shrink><span class="slds-icon_container checked-icon slds-icon-standard-account" title="description of icon when needed" ng-if=user.vote><svg aria-hidden=true class=slds-icon><use xlink:href=/unicorn-pointing-poker/assets/icons/standard-sprite/svg/symbols.svg#task2></use></svg> <span class=slds-assistive-text>Description of icon</span></span></td><th scope=row data-label=Unicorn><div class=slds-truncate title=Unicorn>{{user.user}}</div></th><td role=gridcell data-label="Unicorn Points"><div class=slds-truncate title="Unicorn Points" ng-hide="!pointingPokerPointingCtrl.room.votesShown &&\n' +
    '                     user.user!=pointingPokerPointingCtrl.user.$id"><label ng-bind=user.vote ng-show="user.vote!=\'coffee\'"></label><div ng-show="user.vote==\'coffee\'"><svg aria-hidden=true class="slds-button__icon coffee-icon"><use xlink:href=/unicorn-pointing-poker/assets/icons/custom-sprite/svg/symbols.svg#custom65></use></svg></div></div></td></tr></tbody></table></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('src/scripts/pointingPokerRoomSelection/pointingPokerRoomSelection.tpl.html',
    '<h3 class=slds-text-heading--small>Select a room:</h3><div class="join-room-wrapper slds-grid slds-size--1-of-1"><button ng-click=pointingPokerRoomSelectionCtrl.generateRandomRoomNumber() class="create-room-btn slds-button slds-size--1-of-3 slds-button--neutral">Create Room</button> <input ng-model=pointingPokerRoomSelectionCtrl.roomNumber class="slds-input room-number-input slds-size--1-of-3" placeholder="Room ID"> <button ng-click=pointingPokerRoomSelectionCtrl.joinRoom(pointingPokerRoomSelectionCtrl.roomNumber) class="slds-button slds-button--neutral join-room-btn slds-size--1-of-3">Join Room</button></div>');
}]);
})();
