/**
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 Crawlink
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions
 * of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 */

/**
 * Based on Crawlink version, modified by Yoannma
 */

(function () {
    'use strict';
    
    var app = angular.module("pagination", []);
    
    app.directive('pagination', PaginationDirective);
    
    PaginationDirective.$inject = [];
    function PaginationDirective() {
        return {
            restrict     : 'EA',
            scope        : {
                ymPages        : '=',
                ymAlignModel   : '=',
                ymPageChanged  : '&',
                ymNbrPageShown : '=',
                ymCurrentPage  : '='
            },
            controller   : PaginationController,
            controllerAs : 'vm',
            template     : [
                '<md-button class="md-icon-button md-raised md-warn" aria-label="First" ng-hide="vm.pageArray().shift() == 1" ng-click="vm.gotoFirst()"><i class="material-icons">first_page</i></md-button>',
                '<md-button class="md-icon-button md-raised md-primary" aria-label="Previous" ng-click="vm.gotoPrev()" ng-show="ymCurrentPage > 1"><i class="material-icons">navigate_before</i></md-button>',
                '<md-button class="md-icon-button md-raised" aria-label="Go to page {{ i }}" ng-repeat="i in vm.pageArray()" ng-click="vm.goto(i)" ng-class="{\'md-primary\': i == ymCurrentPage}"> {{ i }} </md-button>',
                '<md-button class="md-icon-button md-raised md-primary" aria-label="Next" ng-click="vm.gotoNext()" ng-show="ymCurrentPage < ymPages"><i class="material-icons">navigate_next</i></md-button>',
                '<md-button class="md-icon-button md-raised md-warn" aria-label="Last" ng-click="vm.gotoLast()" ng-hide="vm.pageArray().pop() == ymPages"><i class="material-icons">last_page</i></md-button>',
            ].join('')
        };
    }
    
    PaginationController.$inject = [ '$scope' ];
    function PaginationController($scope) {
        var vm = this;
        
        vm.pageArray = function () {
            var nbr = parseInt($scope.ymNbrPageShown);
            
            return _.intersection(
                _.range(Math.max($scope.ymCurrentPage - nbr, 1), $scope.ymCurrentPage + (nbr + 2)),
                _.range($scope.ymCurrentPage - (nbr + 1), Math.min(parseInt($scope.ymPages) + 1, parseInt($scope.ymCurrentPage) + (nbr + 1)))
            );
        };
        
        vm.goto = function (page) {
            $scope.ymCurrentPage = page;
        };
        
        vm.gotoPrev = function () {
            $scope.ymCurrentPage--;
        };
        
        vm.gotoNext = function () {
            $scope.ymCurrentPage++;
        };
        
        vm.gotoFirst = function () {
            $scope.ymCurrentPage = 1;
        };
        
        vm.gotoLast = function () {
            $scope.ymCurrentPage = $scope.ymPages;
        };
        
        $scope.$watch('ymCurrentPage', function () {
            $scope.ymPageChanged();
        });
    }
})();