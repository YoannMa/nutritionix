'use strict';

angular.module('nutritionix.view1', [ 'ngRoute' ])
    .config([
        '$routeProvider', function ($routeProvider) {
            $routeProvider.when('/view1', {
                templateUrl : 'view1/view1.html',
                controller  : 'View1Ctrl'
            });
        }
    ])
    .controller('View1Ctrl', [
        '$scope',
        'nixApi',
        '$q',
        function ($scope, nixApi, $q) {
            var autoCompleteController = this;
    
            $scope.searchText             = '';
            $scope.autoCompleteSearchText = '';
            $scope.searchedItem           = undefined;
            $scope.foundResults = [];
            $scope.selectedItemChange = function (selectedItem) {
                var bulkSize = 10;
                if (!selectedItem) {
                    $scope.searchedItem = undefined;
                    return;
                }
                nixApi.search(selectedItem.text, bulkSize, 0).success(function (search) {
                    $scope.foundResults = search.results;
                    console.log(search.results.length + ' out of ' + search.total);
                    var offset = search.results.length;
                        
                    while (offset < search.total) {
                        nixApi.search(selectedItem.text, bulkSize, offset).success(function (search) {
                            search.results.forEach(function (items) {
                                $scope.foundResults.push(items);
                            })
                        });
                        console.log(offset + ' out of ' + search.total);
                        offset += bulkSize;
                    }
                });
            };
            
            $scope.autoCompleteQuerySearch = function (query) {
                return nixApi.autocomplete(query).then(function (result) {
                    return result.data
                });
            };
            //$scope.search           = function () {
            //    nixApi.autocomplete($scope.searchText).success(function (suggestions) {
            //        suggestions.forEach(suggestion => {
            //            $scope.researchedItem.push(suggestion);
            //            nixApi.search(suggestion.name).success(function (search) {
            //                search.results.forEach(item => {
            //                    $scope.researchedItem.push(item);
            //                    //nixApi.item(item.resource_id).success(function (item) {
            //                    //
            //                    //})
            //                });
            //            });
            //        });
            //    });
            //};
        }
    ]);