'use strict';

// Declare app level module which depends on views, and components
angular.module('nutritionix', [
    'ngRoute',
    'ngMaterial',
    'ngAnimate',
    'nix.api',
    'pagination',
    'pagination',
    'nutritionix.searchView',
    'nutritionix.view2',
    'nutritionix.version'
]).config([
    '$locationProvider', '$routeProvider', 'nixApiProvider', function ($locationProvider, $routeProvider, nixApiProvider) {
        $locationProvider.hashPrefix('?');
        $routeProvider.otherwise({ redirectTo : '/home' });
        nixApiProvider.setApiCredentials('a1dae454', '11d2ef2c51fc274cf359a274a1cc2df0'); // App1
        //nixApiProvider.setApiCredentials('81074c61', 'd2fc5d0a8959ac2066130942e7a40e5d'); // App2
        //nixApiProvider.setApiCredentials('db67f640', '6d3a917f26933266438f8c90c4fb061f'); // App3 (not mine, nutritionix demo app)
    }
])
.constant('_', window._)
.run(function ($rootScope) {
    $rootScope._ = window._;
});