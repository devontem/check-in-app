var myApp = angular.module('myApp', ['ngRoute', 'firebase', 'appControllers']).
    constant('FIREBASE_URL', 'https://attendancedmapp.firebaseio.com/'); //add dependencies to main module

var appControllers = angular.module('appControllers', ['firebase']);

myApp.run(['$rootScope', '$location', function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(event, next, previous, error){
        if(error === 'AUTH_REQUIRED'){
            $rootScope.message = "You must log in to access the page!";
            $location.path('/login');
        }
    })
}]);


/* ROUTES */
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'RegistrationController'
        }).
        when('/meetings', {
            templateUrl: 'views/meetings.html',
            controller: 'MeetingsController',
            resolve: {//only lets you access this page if this computes as true
                currentAuth : function(Authentication){
                    return Authentication.requireAuth();
                }
            }
        }).
        when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegistrationController'
        }).
        when('/checkins/:uid/:mid', {
            templateUrl: 'views/checkins.html',
            controller: 'CheckInsController'
        }).
        when('/checkins/:uid/:mid/checkinsList', {
            templateUrl: 'views/checkinsList.html',
            controller: 'CheckInsController'
        }).
        otherwise({
            redirectTo: '/login'
        });
}]);