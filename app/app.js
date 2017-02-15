'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'nix.api',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]).config([
    '$locationProvider', '$routeProvider', 'nixApiProvider', function ($locationProvider, $routeProvider, nixApiProvider) {
        $locationProvider.hashPrefix('!');
        
        $routeProvider.otherwise({ redirectTo : '/view1' });
        
        nixApiProvider.setApiCredentials('a1dae454', '11d2ef2c51fc274cf359a274a1cc2df0');
    }
]);