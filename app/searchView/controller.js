'use strict';

angular.module('nutritionix.searchView', [ 'ngRoute', 'ngMaterial' ])
    .config([
        '$routeProvider', function ($routeProvider) {
            $routeProvider.when('/search', {
                templateUrl : 'app/components/searchView/view.html',
                controller  : 'searchViewController'
            });
        }
    ])
    .controller('searchViewController', [
        '$scope',
        '$location',
        'nixApi',
        '$mdDialog',
        function ($scope, $location, nixApi, $mdDialog) {
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
                nixApi.search($scope.selectedItem.text, bulkSize, ($scope.paging.current - 1) * bulkSize)
                    .success(function (search) {
                        $scope.foundResults = search.results;
                        $scope.paging.total = Math.floor(Math.min(search.total / bulkSize, (1000 / bulkSize) + 1));
                        // Math.min is used to limit the offset to 1000, the API won't respond if the offset is superior from 1000
                    });
            };
            
            $scope.autoCompleteQuerySearch = function (query) {
                return nixApi.autocomplete(query).then(function (result) {
                    return result.data
                });
            };
            
            $scope.showItemInfo = function (ev, item) {
                $mdDialog.show({
                    controller          : DialogController,
                    templateUrl         : 'app/components/searchView/itemInfo.tmpl.html',
                    parent              : angular.element(document.body),
                    targetEvent         : ev,
                    clickOutsideToClose : true,
                    locals : {
                        item : item
                    }
                })
                    .then(function (answer) {
                        console.log(answer);
                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };
            
            if ($location.search().item && $location.search().item !== '') {
                $scope.reloadListResults();
            }
            
            function DialogController($scope, $mdDialog, item) {
                $scope.item = item;
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                
                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
            }
        }
    ]);