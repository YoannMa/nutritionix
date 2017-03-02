angular.module('nutritionix.menu', []).provider('Menu', function() {
    var _menu = [];
    
    this.$get = function() {
        return {
            getItems: function() {
                return _menu;
            }
        };
    };
    
    this.add = function(item) {
        _menu.push(item);
    };
})
.controller('MenuCtrl', function($scope, Menu) {
    $scope.menu = Menu.getItems();
});