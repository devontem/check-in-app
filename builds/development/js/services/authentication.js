myApp.factory('Authentication', function($firebase, $firebaseAuth, $rootScope, $routeParams, $location, FIREBASE_URL){
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
    
    auth.$onAuth(function(authUser){
        if (authUser){//when logging into the site
            var ref = new Firebase(FIREBASE_URL+'users/'+authUser.uid);
            var user = $firebase(ref).$asObject();
            
            //sets a var scope for the entire site/controllers 
            $rootScope.currentUser = user;
            
        } else {//when logging out of the site
            
            $rootScope.currentUser = '';
            
        }
    });
    
    var myObject = {
        
        login: function(user){
            return auth.$authWithPassword({
            email: user.email,
            password: user.password
        });
        },
        
        logout: function(){
            return auth.$unauth();
        },
        
        register: function(user){
            return auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function(regUser){
                var ref = new Firebase(FIREBASE_URL+'users');
                var firebaseUsers = $firebase(ref);
                
                var userInfo = {
                    date: Firebase.ServerValue.TIMESTAMP,
                    regUser: regUser.uid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                };//user info
                
                firebaseUsers.$set(regUser.uid, userInfo);
                
            });//promise
        },//end of register function
        
        requireAuth: function(){
            return auth.$requireAuth();
        },//require authentication
        
        waitForAuth: function(){
            return auth.$waitForAuth();
        }//waits until loaded
    }; //End of myObjext
    
    return myObject;
    
});