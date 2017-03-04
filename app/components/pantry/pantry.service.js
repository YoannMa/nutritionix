'use strict';

angular.module('nutritionix.pantry', []).factory([PantryService]);

function PantryService() {
    var aliments = [];
    
    this.add = function (aliment) {
        // test
        var result = aliments.push(aliment);
        this.sync();
        return result;
    };
    
    this.remove = function (aliment) {
        // test
        var result = aliments.remove(aliment);
        this.sync();
        return result;
    };
    
    this.getFromID = function (id) {
        // test
        
    };
    
    this.getAll = function () {
        return aliments;
    };
    
    this.sync = function () {
        // sync with local storage
    };
    
    return PantryService;
}