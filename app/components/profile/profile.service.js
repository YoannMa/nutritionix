'use strict';

angular.module('nutritionix.profile', [ 'ngStorage' ]).factory('ProfileService', ProfileService);

ProfileService.$inject = [ '$localStorage' ];

function ProfileService($localStorage) {
    var data = {
        weight   : 0,
        height   : 0,
        gender   : true,
        age      : 0,
        sportive : true
    };
    
    ProfileService.setWeight = function (weight) {
        data.weight = weight;
        this.sync();
    };
    
    ProfileService.getWeight = function () {
        return data.weight;
    };
    
    ProfileService.setHeight = function (height) {
        data.height = height;
        this.sync();
    };
    
    ProfileService.getHeight = function () {
        return data.height;
    };
    
    /**
     *
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
        data.gender = gender;
        this.sync();
    };
    
    ProfileService.getGender = function () {
        return data.gender;
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
        $localStorage.profile = data;
    };
    
    if ($localStorage.profile) {
        data = $localStorage.profile;
    }
    
    return ProfileService;
}