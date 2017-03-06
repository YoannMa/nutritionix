'use strict';

angular.module('nutritionix.pantryView', [ 'ngRoute', 'ngMaterial', 'nutritionix.pantry' ])
    .config([
        '$routeProvider', function ($routeProvider) { // register the route to the router
            $routeProvider.when('/pantry', { // route
                templateUrl : 'app/pantryView/view.html', // template
                controller  : 'pantryViewController' // controller
            });
        }
    ])
    .controller('pantryViewController', PantryViewController);

PantryViewController.$inject = [ '$scope', '$mdDialog', 'PantryService' ];

function PantryViewController($scope, $mdDialog, PantryService) {
    
    /**
     * Just to update the data
     */
    function hydrateData() {
        $scope.items        = PantryService.getAll();
        $scope.calories     = PantryService.calories();
        $scope.sodium       = PantryService.sodium();
        $scope.saturatedFat = PantryService.saturatedFat();
    }
    
    /**
     * When you click on an aliment, to show other information
     * @param {object} ev
     * @param {object} item
     */
    $scope.showItemInfo = function (ev, item) {
        $mdDialog.show(
            $mdDialog.infoDialog({
                targetEvent : ev,
                locals      : {
                    item : item
                }
            })
        );
    };
    
    /**
     * When you are so angry that you want more of that aliment.
     *
     * @param {object} item The aliment you want to increment the quantity
     */
    $scope.more = function (item) {
        PantryService.add(item, 1);
        hydrateData();
    };
    
    /**
     * Too much, i understand
     *
     * @param {object} item The aliment you want to decrement the quantity
     */
    $scope.less = function (item) {
        if (item.quantity <= 1) {
            $scope.deleteItem(null, item);
        } else {
            PantryService.remove(item, 1);
            hydrateData();
        }
    };
    
    /**
     * To change directly the quantity, annoying to press more/less sometime
     * @param {object} ev
     * @param {object} item
     */
    $scope.changeQuantity = function (ev, item) {
        $mdDialog.show(
            $mdDialog.quantityDialog({
                targetEvent : ev,
                locals      : {
                    item : item
                }
            })
        ).then(function (quantity) {
            PantryService.setQuantity(item._id, quantity);
            hydrateData();
        });
    };
    
    /**
     * Calculate the percentage of calories of an aliment from the pantry
     * @param {object} item
     * @return {number}
     */
    $scope.getPercentageCaloriesOfThePantry = function (item) {
        return Math.floor((item.fields.nf_calories * item.quantity) / $scope.calories * 100);
    };
    
    /**
     * Calculate the percentage of sodium of an aliment from the pantry
     * @param {object} item
     * @return {number}
     */
    $scope.getPercentageSodiumOfThePantry = function (item) {
        return Math.floor((item.fields.nf_sodium / 1000 * item.quantity) / $scope.sodium * 100);
    };
    
    /**
     * Calculate the percentage of saturated fat of an aliment from the pantry
     * @param {object} item
     * @return {number}
     */
    $scope.getPercentageSaturatedFatOfThePantry = function (item) {
        return Math.floor((item.fields.nf_saturated_fat * item.quantity) / $scope.saturatedFat * 100);
    };
    
    /**
     * Generate that cool looking gradient that allow me to create a chart only with CSS, so magic
     * @param {object} item
     * @return {{background: string}}
     */
    $scope.getGradientStyle = function (item) {
        var percentage = $scope.getPercentageCaloriesOfThePantry(item);
        return {
            'background' : 'linear-gradient(to right, rgba(230, 230, 255, 1) 0%, rgba(230, 230, 255, 1) ' + percentage + '%, transparent ' + percentage + '%)'
        }
    };
    
    /**
     * When you hate the long floating number, you cut them off, it's so funny
     *
     * @param number
     * @param dec
     * @return {number}
     */
    $scope.floor = function (number, dec) {
        return Math.floor(number * Math.pow(10, dec)) / Math.pow(10, dec);
    };
    
    /**
     * Remove an item from the pantry
     * @param {object} ev
     * @param {object} item
     */
    $scope.deleteItem = function (ev, item) {
        $mdDialog.show(
            $mdDialog.confirm()
                .title('Please confirm')
                .textContent('Are you sure you want to remove ' + item.fields.item_name + ' from your pantry ?')
                .ariaLabel('confirmation deletion')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('Cancel')
        ).then(function () {
            PantryService.remove(item);
            hydrateData();
        });
    };
    
    hydrateData();
    
    return PantryViewController;
}