myApp.controller('RegistrationController', function($scope, $firebaseAuth, $location, Authentication){
    
    var ref = new Firebase('https://attendancedmapp.firebaseio.com/');
    var auth = $firebaseAuth(ref);
    
    //LOGIN Function
    $scope.login = function(){
        Authentication.login($scope.user)
        .then(function(user){
            $location.path('/meetings'); /* changes page location */
        }).catch(function(error){
            $scope.message = error.message;
        });
    };
    
    //REGISTRATION Function
    $scope.register = function(){
        Authentication.register($scope.user)
        .then(function(user){
            Authentication.login($scope.user);
            $location.path('/meetings'); /* changes page location */
        }).catch(function(error){
            $scope.message= error.message;
        });
    }
});