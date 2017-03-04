'use strict';

angular.module('nutritionix.profile', []).factory([ ProfileService ]);

function ProfileService() {
    var data = {
        weight   : 0,
        height   : 0,
        male     : true,
        age      : 0,
        sportive : true
    };
    
    this.setWeight = function (weight) {
        data.weight = weight;
        this.sync();
    };
    
    this.getWeight = function () {
        return data.weight;
    };
    
    this.setHeight = function (height) {
        data.height = height;
        this.sync();
    };
    
    this.getHeight = function () {
        return data.height;
    };
    
    this.setMale = function (male) {
        data.male = male;
        this.sync();
    };
    
    this.getMale = function () {
        return data.male;
    };
    
    this.setAge = function (age) {
        data.age = age;
        this.sync();
    };
    
    this.getAge = function () {
        return data.age;
    };
    
    this.setSportive = function (sportive) {
        data.sportive = sportive;
        this.sync();
    };
    
    this.getSportive = function () {
        return data.sportive;
    };
    
    this.sync = function () {
        // sync with local storage
    };
    
    return ProfileService;
}