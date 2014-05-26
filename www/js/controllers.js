angular.module('app.user.auth', ['LocalStorageModule'])

// Handles scope over the entire app to check if we are authenticated throughout
// every single page. Never shows a page unless the fitbit-token/jawbone-token is stored locally
.controller('AppCtrl', function ($scope, $state, $window, localStorageService) {

  // Check our local storage for the proper credentials to ensure we are logged in
  if (localStorageService.get('fitbit-token') || localStorageService.get('jawbone-token')) {
    $scope.isAuthenticated = true;
  } else {
    $scope.isAuthenticated = false;
  }

  $scope.logout = function () {
    localStorageService.clearAll();
    location.reload();
  };

})

.controller('LoginCtrl', function ($scope, $state, FitbitLoginService, JawboneLoginService) {

  $scope.fitbitlogin = FitbitLoginService.login;
  $scope.jawbonelogin = JawboneLoginService.login;

})

.factory('JawboneLoginService', function ($window, Jawbone, $state, localStorageService) {
  var url = 'https://fitbitrpg.azurewebsites.net/jawbone';
  var loginWindow;
  var token;

  return {
    login: function () {
      loginWindow = $window.open(url, '_blank', 'location=no,toolbar=no');
      loginWindow.addEventListener('loadstart', function (event) {
        hasToken = event.url.indexOf('?token=');
        if (hasToken > -1) {
          var token = event.url.substring(hasToken + 7);
          $window.alert(event.url);
          location.reload();
          loginWindow.close();
          localStorageService.set('jawbone-token', token);
          //eventually set the user id here too + unique app ID
        } else {
          //do nothing
        }
      });
    },
  };
})

.factory('FitbitLoginService', function ($window, Fitbit, $state, localStorageService) {
  var url = 'http://fitbitrpg.azurewebsites.net/auth/fitbit';
  var loginWindow;
  var hasToken;
  return {
    login: function () {
      loginWindow = $window.open(url, '_blank', 'location=no,toolbar=no');
      loginWindow.addEventListener('loadstart', function (event) {
        hasToken = event.url.indexOf('?oauth_token=');
        if (hasToken > -1) {
          var token = event.url.substring(hasToken + 13);
          localStorageService.set('fitbit-token', token);
          location.reload();
          loginWindow.close();
          //eventually set the user id here too + unique app ID
        } else {
          //do nothing
        }
      });
    },
  };
})