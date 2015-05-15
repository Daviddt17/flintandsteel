/* global angular */

angular.module('flintAndSteel')
.controller('LoginViewCtrl', [
		'$scope',
		'$state',
		'$mdToast',
		'loginSvc',
		function($scope, $state, $mdToast, loginSvc) {
			$scope.loginUser = function(account) {
				loginSvc.checkLogin(account, function LoginSuccess(data) {
					if (data.status === 'AUTH_OK') {
						$mdToast.show(
							$mdToast.simple()
								.content(data.name + ' has successfully signed in!')
								.position('top right')
								.hideDelay(5000)
						);
						//$scope.$root.accout = data;
						$state.go('home');
					}
					else if (data.status === 'AUTH_ERROR') {
						$mdToast.show(
							$mdToast.simple()
								.content('Your credentials don\'t match the stored ones :(')
								.position('top right')
								.hideDelay(5000)
						);
					}
					else if (data.status === 'USER_NOT_FOUND') {
						$mdToast.show(
							$mdToast.simple()
								.content('The user was not found in the server!')
								.position('top right')
								.hideDelay(5000)
						);
					}
					
				},
				function loginError(data, status, headers, config) {
					console.log(status);
				});
			};

			$scope.signUpUser = function signUpUser(account) {
				$scope.$root.username = account.username;
				$state.go('signup');
			};
		}
	]
);