myApp.controller('CheckInsController', function($scope, 
  $rootScope, $firebase, $routeParams, 
  $location, Authentication, CountMeetings, FIREBASE_URL) {
    
    $scope.whichMeeting = $routeParams.mid;
    $scope.whichUser = $routeParams.uid;
    
    var ref = new Firebase(FIREBASE_URL+'users/'+$scope.whichUser
      +'/meetings/'+$scope.whichMeeting+'/checkins');
      
    var checkinsList = $firebase(ref).$asArray();
    $scope.checkins = checkinsList;
      
      
      $scope.addCheckin = function(){
        var checkinsObj = $firebase(ref);
        
        var myData = {
         firstname: $scope.firstname,
         lastname: $scope.lastname,
         email: $scope.email,
         date: Firebase.ServerValue.TIMESTAMP
        }
        
        checkinsObj.$push(myData).then(function(){
          $location.path('checkins/'+$scope.whichUser+'/'+$scope.whichMeeting+'/checkinsList');
        });
      };
      
      
    
});