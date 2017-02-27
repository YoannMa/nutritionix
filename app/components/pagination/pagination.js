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
 * Based on Crawlink version, modified by YoannMA
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
                clPages       : '=',
                clAlignModel  : '=',
                clPageChanged : '&',
                clSteps       : '=',
                clCurrentPage : '='
            },
            controller   : PaginationController,
            controllerAs : 'vm',
            template     : [
                '<md-button class="md-icon-button md-raised md-warn" aria-label="First" ng-hide="vm.pageArray().shift() == 1" ng-click="vm.gotoFirst()">{{ vm.first }}</md-button>',
                '<md-button class="md-icon-button md-raised md-primary" aria-label="Previous" ng-click="vm.gotoPrev()" ng-show="clCurrentPage > 1">{{ vm.previous }}</md-button>',
                '<md-button class="md-icon-button md-raised" aria-label="Go to page {{ i }}" ng-repeat="i in vm.pageArray()" ng-click="vm.goto(i)" ng-class="{\'md-primary\': i == clCurrentPage}"> {{ i }} </md-button>',
                '<md-button class="md-icon-button md-raised md-primary" aria-label="Next" ng-click="vm.gotoNext()" ng-show="clCurrentPage < clPages">{{ vm.next }}</md-button>',
                '<md-button class="md-icon-button md-raised md-warn" aria-label="Last" ng-click="vm.gotoLast()" ng-hide="vm.pageArray().pop() == clPages">{{ vm.last }}</md-button>',
            ].join('')
        };
    }
    
    PaginationController.$inject = [ '$scope' ];
    function PaginationController($scope) {
        var vm = this;
        
        vm.first    = '<<';
        vm.last     = '>>';
        vm.previous = '<';
        vm.next     = '>';
        
        vm.index = 0;
        
        vm.clSteps = $scope.clSteps;
        
        vm.pageArray = function () {
            var before = _.range(Math.max($scope.clCurrentPage - 4, 1), $scope.clCurrentPage + 6);
            var after = _.range($scope.clCurrentPage - 5, Math.min(parseInt($scope.clPages) + 1, parseInt($scope.clCurrentPage) + 5));
            return _.intersection(before, after);
        };
        
        vm.goto = function (page) {
            $scope.clCurrentPage = page;
        };
        
        vm.gotoPrev = function () {
            $scope.clCurrentPage--;
        };
        
        vm.gotoNext = function () {
            $scope.clCurrentPage++;
        };
        
        vm.gotoFirst = function () {
            $scope.clCurrentPage = 1;
        };
        
        vm.gotoLast = function () {
            $scope.clCurrentPage = $scope.clPages;
        };
        
        $scope.$watch('clCurrentPage', function () {
            $scope.clPageChanged();
        });
    }
})();