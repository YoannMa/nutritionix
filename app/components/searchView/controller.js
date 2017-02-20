'use strict';

angular.module('nutritionix.searchView', [ 'ngRoute' ])
    .config([
        '$routeProvider', function ($routeProvider) {
            $routeProvider.when('/home', {
                templateUrl : 'app/components/searchView/view.html',
                controller  : 'searchViewController'
            });
        }
    ])
    .controller('searchViewController', [
        '$scope',
        'nixApi',
        '$q',
        function ($scope, nixApi) {
            $scope.searchText             = '';
            $scope.autoCompleteSearchText = '';
            $scope.searchedItem           = undefined;
            $scope.foundResults = [];
            $scope.selectedItemChange = function (selectedItem) {
                var bulkSize = 25;
                if (!selectedItem) {
                    $scope.searchedItem = undefined;
                    return;
                }
                nixApi.search(selectedItem.text, bulkSize, 0).success(function (search) {
                    $scope.foundResults = search.results;
                    console.log(search.results.length + ' out of ' + search.total);
                    //var offset = search.results.length;
                        
                    //while (offset < search.total) {
                    //    nixApi.search(selectedItem.text, bulkSize, offset).success(function (search) {
                    //        search.results.forEach(function (items) {
                    //            $scope.foundResults.push(items);
                    //        })
                    //    });
                    //    console.log(offset + ' out of ' + search.total);
                    //    offset += bulkSize;
                    //}
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