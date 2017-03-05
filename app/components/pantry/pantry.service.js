'use strict';

angular.module('nutritionix.pantry', [ 'ngStorage' ]).factory('PantryService', PantryService);

PantryService.$inject = [ '$localStorage' ];

function PantryService($localStorage) {
    var aliments = {};
    
    PantryService.add = function (aliment, quantity) {
        if (quantity <= 0) {
            throw Error('quantity cannot be <= 0');
        }
        if (typeof aliment !== 'object') {
            throw Error('aliment must be an object');
        }
        if (!aliment._id || typeof aliment._id !== 'string') {
            throw Error('aliment must have a _id');
        }
        if (aliments[ aliment._id ]) { // already exist in the pantry
            aliments[ aliment._id ].quantity += quantity;
        } else {
            aliments[ aliment._id ]          = aliment;
            aliments[ aliment._id ].quantity = quantity;
        }
        this.sync();
        return aliments[ aliment._id ];
    };
    
    /**
     * Remove some quantity of a specified aliment
     *
     * @param aliment
     * @param [quantity]
     * @return {*}
     */
    PantryService.remove = function (aliment, quantity) {
        if (typeof aliment !== 'object') {
            throw Error('aliment must be an object');
        }
        if (!aliment._id || typeof aliment._id !== 'string') {
            throw Error('aliment must have a _id');
        }
        if (aliments[ aliment._id ]) { // already exist in the pantry
            if (!quantity) {
                delete aliments[ aliment._id ];
            } else {
                if (quantity <= 0) {
                    throw Error('Quantity cannot be <= 0');
                }
                if (aliments[ aliment._id ].quantity - quantity <= 0) {
                    delete aliments[ aliment._id ];
                }
                aliments[ aliment._id ].quantity -= quantity;
            }
        }
        this.sync();
        return aliments[ aliment._id ];
    };
    
    PantryService.isInPantry = function (id) {
        return aliments.hasOwnProperty(id);
    };
    
    PantryService.getFromID = function (id) {
        if (aliments[ id ]) {
            return aliments[ id ];
        }
    };
    
    PantryService.setQuantity = function (id, quantity) {
        if (aliments[ id ] && quantity >= 0) {
            aliments[ id ].quantity = quantity;
            if (quantity === 0) {
                this.remove(aliments[id]);
            }
        }
    };
    
    PantryService.getAll = function () {
        return _.values(aliments);
    };
    
    PantryService.sync = function () {
        $localStorage.pantry = aliments;
    };
    
    PantryService.calories = function () {
        return this.getAll().reduce(function (calories, item) {
            return calories + item.fields.nf_calories * item.quantity;
        }, 0);
    };
    
    PantryService.sodium = function () {
        return this.getAll().reduce(function (calories, item) {
                return calories + item.fields.nf_sodium * item.quantity;
            }, 0) / 100;
    };
    
    PantryService.saturatedFat = function () {
        return this.getAll().reduce(function (calories, item) {
            return calories + item.fields.nf_saturated_fat * item.quantity;
        }, 0);
    };
    
    if ($localStorage.pantry) {
        aliments = $localStorage.pantry;
    }
    
    return PantryService;
}