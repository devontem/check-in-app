myApp.controller('MeetingsController', function($scope, $rootScope, $firebase, CountMeetings, FIREBASE_URL){
    
    var ref = new Firebase(FIREBASE_URL+'users/'+$rootScope.currentUser.$id+'/meetings');
    var meetingsInfo = $firebase(ref);
    var meetingsObj = meetingsInfo.$asObject(); //converts db info to object
    
    meetingsObj.$loaded().then(function(data){//assigns db meeting info after it is loaded
        $scope.meetings = data;
    });
    
    $scope.addMeeting = function(){
        meetingsInfo.$push({
            name: $scope.meetingname,
            date: Firebase.ServerValue.TIMESTAMP
        }).then(function(){ //callback 'promise' function upon completion
            $scope.meetingname="";
        });
    };
    
    $scope.deleteMeeting = function(key){
        meetingsInfo.$remove(key);
    }
    
});