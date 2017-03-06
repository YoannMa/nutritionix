'use strict';

angular.module('nutritionix.profile', [ 'ngStorage' ]).factory('ProfileService', ProfileService);

ProfileService.$inject = [ '$localStorage', '$rootScope' ];

function ProfileService($localStorage, $rootScope) {
    var data = {
        gender   : true, // true = male
        age      : 19,
        sportive : true
    };
    
    /**
     * I sexually Identify as an Attack Helicopter.
     * Ever since I was a boy I dreamed of soaring over the oilfields dropping hot sticky loads on disgusting foreigners.
     * People say to me that a person being a helicopter is Impossible and I’m fucking retarded but I don’t care, I’m beautiful.
     * I’m having a plastic surgeon install rotary blades, 30 mm cannons and AMG-114 Hellfire missiles on my body.
     * From now on I want you guys to call me “Apache” and respect my right to kill from above and kill needlessly.
     * If you can’t accept me you’re a heliphobe and need to check your vehicle privilege.
     * Thank you for being so understanding.
     *
     * @param gender
     */
    ProfileService.setGender = function (gender) {
        data.gender = gender === 'male';
        this.sync();
    };
    
    ProfileService.getGender = function () {
        return data.gender ? 'male' : 'female';
    };
    
    ProfileService.setAge = function (age) {
        data.age = age;
        this.sync();
    };
    
    ProfileService.getAge = function () {
        return data.age;
    };
    
    ProfileService.setSportive = function (sportive) {
        data.sportive = sportive;
        this.sync();
    };
    
    ProfileService.getSportive = function () {
        return data.sportive;
    };
    
    ProfileService.sync = function () {
        $rootScope.$broadcast('profile:updated');
        $localStorage.profile = data;
    };
    
    ProfileService.getMaxSodium = function () {
        return 5;
    };
    
    ProfileService.getMaxCalories = function () {
        var base = data.sportive ? 500 : 0;
        
        if (data.age <= 10) {
            return base + 1600;
        }
        if (data.age <= 20) {
            return base + (data.gender ? 2900 : 2400);
        }
        if (data.age <= 65) {
            return base + (data.gender ? 2800 : 2200);
        }
        return base + (data.gender ? 2000 : 1800);
    };
    
    if ($localStorage.profile) {
        data = $localStorage.profile;
    }
    
    
    return ProfileService;
}