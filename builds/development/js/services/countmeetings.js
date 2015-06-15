myApp.factory('CountMeetings', function($firebase, $rootScope, FIREBASE_URL){
    
    var ref = new Firebase(FIREBASE_URL+'users/'+$rootScope.currentUser.$id+'/meetings');
    var meetingsInfo = $firebase(ref);
    var meetingsArray = meetingsInfo.$asArray(); //converts db info to array
    
    meetingsArray.$loaded().then(function(data){//assigns it to the variable once loaded
        $rootScope.howManyMeetings = meetingsArray.length;
    });
    
    meetingsArray.$watch(function(data){//watches for changes to bind automatically
        $rootScope.howManyMeetings = meetingsArray.length;
    });
    
    return true;
});