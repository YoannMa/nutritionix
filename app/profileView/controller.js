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
            function updateInfo() {
                $scope.profile = {
                    gender   : ProfileService.getGender(),
                    age      : ProfileService.getAge(),
                    sportive : ProfileService.getSportive(),
                    calories : ProfileService.getMaxCalories(),
                    sodium   : ProfileService.getMaxSodium(),
                }
            }
            
            $scope.$watch('profile.gender', function (gender) {
                ProfileService.setGender(gender);
                updateInfo();
            });
            
            $scope.$watch('profile.age', function (age) {
                ProfileService.setAge(age);
                updateInfo();
            });
            
            $scope.$watch('profile.sportive', function (sportive) {
                ProfileService.setSportive(sportive);
                updateInfo();
            });
    
            updateInfo();
        }
    ]);