'use strict';

angular.module('authicationAngularApp')
  .controller('LoginCtrl', function ($scope, alert, auth, $auth, $state) {
    $scope.submit = function () {

      $auth.login({
        email: $scope.email,
        password: $scope.password
      })
        .then(greetUser)
        .catch(handleError);
    };

    $scope.authenticate = function (provider) {
      $auth.authenticate(provider).then(greetUser, handleError);
    };

    $scope.vk = function () {
      auth.vkAuth().then(greetUser, handleError);
    };

    function handleError (err) {
      alert('warning', 'Something went wrong :( ', err.message);
    }

    function greetUser (res) {
      var message = 'Thanks for coming back ' + (res.data.user.email || res.data.user.displayName) + '!';

      if (!res.data.user.active) {
        message = 'Please activate your account soon';
      }

      alert('success', 'Welcome', message );
      $state.go('main');
    }
  });
