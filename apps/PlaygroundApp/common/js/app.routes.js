/**
 * @name app.routes
 * @desc Defines routes for app
 */


angular.module('playground')

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                templateUrl: 'templates/app.html',
                abstract: true,
                controller: 'AppCtrl'
            })

            .state('app.home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })

            .state('app.orders', {
                url: '/orders',
                templateUrl: 'templates/orders.html',
                controller: 'OrdersCtrl'
            });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');

    }]);
