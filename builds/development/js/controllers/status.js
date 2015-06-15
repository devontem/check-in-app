myApp.controller('StatusController', function($scope, $location, Authentication){
    
    $scope.logout = function(){
        Authentication.logout();
    }
    
});