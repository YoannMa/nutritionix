'use strict';

// Declare app level module which depends on views, and components
angular.module('nutritionix', [
    'ngRoute',
    'ngMaterial',
    'ngAnimate',
    'nix.api',
    'pagination',
    'pagination',
    'nutritionix.menu',
    'nutritionix.searchView',
    'nutritionix.version'
]).config([
    '$locationProvider',
    '$routeProvider',
    'nixApiProvider',
    function ($locationProvider, $routeProvider, nixApiProvider) {
        $routeProvider.otherwise({ redirectTo : '/#/pantry' });
        //nixApiProvider.setApiCredentials('a1dae454', '11d2ef2c51fc274cf359a274a1cc2df0'); // App1
        //nixApiProvider.setApiCredentials('81074c61', 'd2fc5d0a8959ac2066130942e7a40e5d'); // App2
        //nixApiProvider.setApiCredentials('db67f640', '6d3a917f26933266438f8c90c4fb061f'); // App3 (not mine, nutritionix demo app)
        nixApiProvider.setApiCredentials('51d31f2b', '0af0130e116927468561ae1f536068d2'); // App4
    }
])
    .config(function (MenuProvider) {
        MenuProvider.add({
            url   : '#/search',
            icone : 'search',
            title : 'Search aliment'
        });
        
        MenuProvider.add({
            url   : '#/config',
            icone : 'accessibility',
            title : 'Change your design'
        });
        
        MenuProvider.add({
            url   : '#/pantry',
            icone : 'restaurant_menu',
            title : 'What you\'ll eat'
        });
    })
    .constant('_', window._)
    .run(function ($rootScope) {
        $rootScope._ = window._;
    });