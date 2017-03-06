angular.module('nutritionix.menu', [ 'nutritionix.pantry', 'nutritionix.profile' ]).provider('Menu', function () {
    var _menu = [];
    
    this.$get = function () {
        return {
            getItems : function () {
                return _menu;
            }
        };
    };
    
    this.add = function (item) {
        _menu.push(item);
    };
})
    .controller('MenuCtrl', function ($scope, Menu, ProfileService, PantryService) {
        $scope.menu = Menu.getItems();
        $scope.floor = function (number, dec) {
            return Math.floor(number * Math.pow(10, dec)) / Math.pow(10, dec);
        };
        this.updateInfo = function () {
            $scope.calories     = PantryService.calories();
            $scope.sodium       = PantryService.sodium();
            $scope.saturatedFat = PantryService.saturatedFat();
    
            $scope.maxCalories = ProfileService.getMaxCalories();
            $scope.maxSodium   = ProfileService.getMaxSodium();
    
            $scope.warning = PantryService.isWarning();
        };
    
        $scope.$on('profile:updated', this.updateInfo);
        $scope.$on('pantry:updated', this.updateInfo);
        
        this.updateInfo();
    });