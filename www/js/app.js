angular.module('appMain', ['ionic','app.user.auth', 'starter.services'])

.constant('Fitbit', {
  authorize: 'https://api.fitbit.com/oauth/authorize',
  key: '8cda22173ee44a5bba066322ccd5ed34',
  secret: '12beae92a6da44bab17335de09843bc4',
  callback: '/auth/fitbit/callback',
  signature_method: 'HMAC-SHA1'
})

.constant('Jawbone', {
  authorize: 'https://jawbone.com/auth/oauth2/auth',
  client_id: 'ONz6lq9qyb8',
  secret: '4db8566134bb2ccab904bf6fb3c0b6fee563193b',
  scope: 'uneric_event_read',
  redirect_uri: 'https://fitbitrpg.azurewebsites.net/jawbone'
})

.run(function($rootScope, $ionicPlatform, $http) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'AppCtrl'
        }
      }
    })

    .state('tab.logout', {
      url: '/logout',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'LogoutCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

