'use strict';

// Declare app level module which depends on views, and components
angular.module('nutritionix', [
    'ngRoute',
    'ngMaterial',
    'ngAnimate',
    'nix.api',
    'nutritionix.searchView',
    'nutritionix.view2',
    'nutritionix.version'
]).config([
    '$locationProvider', '$routeProvider', 'nixApiProvider', function ($locationProvider, $routeProvider, nixApiProvider) {
        $locationProvider.hashPrefix('!');
        
        $routeProvider.otherwise({ redirectTo : '/home' });
        
        nixApiProvider.setApiCredentials('81074c61', 'd2fc5d0a8959ac2066130942e7a40e5d');
    }
])
.constant('_', window._)
.run(function ($rootScope) {
    $rootScope._ = window._;
});