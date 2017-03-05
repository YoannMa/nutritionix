'use strict';

angular.module('nutritionix.pantryView', [ 'ngRoute', 'ngMaterial', 'nutritionix.pantry' ])
    .config([
        '$routeProvider', function ($routeProvider) {
            $routeProvider.when('/pantry', {
                templateUrl : 'app/pantryView/view.html',
                controller  : 'pantryViewController'
            });
        }
    ])
    .controller('pantryViewController', [
        '$scope',
        '$location',
        '$mdDialog',
        'PantryService',
        function ($scope, $location, $mdDialog, PantryService) {
            function hydrateData() {
                $scope.items = PantryService.getAll();
                console.log($scope.items);
            }
            
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
            
            $scope.more = function (item) {
                PantryService.add(item, 1);
                hydrateData();
            };
            $scope.less = function (item) {
                PantryService.remove(item, 1);
                hydrateData();
            };
            
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
            
            $scope.deleteItem = function (ev, item) {
                $mdDialog.show(
                    $mdDialog.confirm()
                        .title('Please confirm')
                        .textContent('Are you sure you want to remove ' + item.item_name + ' from your pantry ?')
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
        }
    ]);