'use strict';

angular.module('nutritionix.profileView', [ 'ngRoute', 'nutritionix.profile' ])
    .config([
        '$routeProvider', function ($routeProvider) { // register the route to the router
            $routeProvider.when('/profile', { // route
                templateUrl : 'app/profileView/view.html', // template
                controller  : 'profileViewController' // controller
            });
        }
    ])
    .controller('profileViewController', ProfileViewController);

ProfileViewController.$inject = [ '$scope', 'ProfileService' ];
function ProfileViewController($scope, ProfileService) {
    
    /**
     * Update the data of the view
     */
    function updateInfo() {
        $scope.profile = {
            gender   : ProfileService.getGender(),
            age      : ProfileService.getAge(),
            sportive : ProfileService.getSportive(),
            calories : ProfileService.getMaxCalories(),
            sodium   : ProfileService.getMaxSodium(),
        }
    }
    
    /**
     * Watch an update from the view
     */
    $scope.$watch('profile.gender', function (gender) {
        ProfileService.setGender(gender);
        updateInfo();
    });
    
    /**
     * Watch an update from the view
     */
    $scope.$watch('profile.age', function (age) {
        ProfileService.setAge(age);
        updateInfo();
    });
    
    /**
     * Watch an update from the view
     */
    $scope.$watch('profile.sportive', function (sportive) {
        ProfileService.setSportive(sportive);
        updateInfo();
    });
    
    updateInfo();
    
    return ProfileViewController;
}