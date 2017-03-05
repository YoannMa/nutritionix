'use strict';

angular.module('nutritionix.searchView', [ 'ngRoute', 'ngMaterial', 'nutritionix.pantry' ])
    .config([
        '$routeProvider', function ($routeProvider) {
            $routeProvider.when('/search', {
                templateUrl : 'app/searchView/view.html',
                controller  : 'searchViewController'
            });
        }
    ])
    .controller('searchViewController', [
        '$scope',
        '$location',
        'nutritionixApi',
        '$mdDialog',
        'PantryService',
        function ($scope, $location, nutritionixApi, $mdDialog, PantryService) {
            $scope.searchText             = '';
            $scope.autoCompleteSearchText = '';
            $scope.selectedItem           = $location.search().item ? { text : $location.search().item } : undefined;
            $scope.foundResults           = [];
            $scope.paging                 = {
                total         : 0,
                current       : $location.search().page ? $location.search().page : 1,
                onPageChanged : $scope.reloadListResults,
            };
            
            $scope.selectedItemChange = function (selectedItem) {
                if (!selectedItem) {
                    $scope.searchedItem = undefined;
                    $scope.foundResults = [];
                    $scope.paging.total = 0;
                    return;
                }
                $scope.selectedItem = selectedItem;
                $location.search({
                    item : selectedItem.text,
                    page : 1
                });
            };
            
            $scope.changePage = function () {
                $location.search({
                    item : $scope.selectedItem.text,
                    page : $scope.paging.current
                });
            };
            
            $scope.reloadListResults = function () {
                var bulkSize = 24;
                nutritionixApi.search($scope.selectedItem.text, bulkSize, ($scope.paging.current - 1) * bulkSize)
                    .success(function (search) {
                        $scope.foundResults = search.results;
                        $scope.paging.total = Math.floor(Math.min(search.total / bulkSize, (1000 / bulkSize) + 1));
                        // Math.min is used to limit the offset to 1000, the API won't respond if the offset is superior from 1000
                    });
                nutritionixApi.searchV1($scope.selectedItem.text, bulkSize, ($scope.paging.current - 1) * bulkSize)
                    .success(function (search) {
                        console.log(search);
                    });
            };
            
            $scope.autoCompleteQuerySearch = function (query) {
                return nutritionixApi.autocomplete(query).then(function (result) {
                    return _.sortBy(result.data, 'text');
                });
            };
            
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
            
            if ($location.search().item && $location.search().item !== '') {
                $scope.reloadListResults();
            }
            
            $scope.addItem = function (ev, item) {
                $mdDialog.show(
                    $mdDialog.quantityDialog({
                        targetEvent : ev,
                        locals      : {
                            item : item
                        }
                    })
                ).then(function (quantity) {
                    PantryService.add(item, quantity);
                });
            };
        }
    ]);