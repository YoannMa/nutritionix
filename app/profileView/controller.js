'use strict';

angular.module('nutritionix.profileView', [ 'ngRoute', 'nutritionix.profile' ])
    .config([
        '$routeProvider', function ($routeProvider) {
            $routeProvider.when('/profile', {
                templateUrl : 'app/profileView/view.html',
                controller  : 'profileViewController'
            });
        }
    ])
    .controller('profileViewController', [
        '$scope',
        '$location',
        'ProfileService',
        function ($scope, $location, ProfileService) {
            $scope.profile = {
                weight : 0,
                height : 0
            }
        }
    ]);