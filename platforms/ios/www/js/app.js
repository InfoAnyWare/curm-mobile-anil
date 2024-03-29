// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [

		'ionic','ionic.service.core','ionic.service.push',
  		'ngCordova',
		'ngOpenFB',
		'ui.thumbnail',
		'starter.controllers',
		"ngTagsInput",
	])


.run(function($ionicPlatform,$rootScope,$cordovaPush,$http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
  });
  
})

.config(function ($stateProvider, $urlRouterProvider, $cordovaFacebookProvider, $cordovaAppRateProvider, $cordovaInAppBrowserProvider, ThumbnailServiceProvider) 
 {
	 //set default thumbnil width and height
	 ThumbnailServiceProvider.defaults.width = 100;
     ThumbnailServiceProvider.defaults.height = 100;

    var browserOptions = {
      location: "yes",
      toolbar: "yes"
    };

  $cordovaInAppBrowserProvider.setDefaultOptions(browserOptions);
	 
	 
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  /*.state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
		controller: 'AppCtrl'
      }
    }
  })*/

 .state('app.addMemory', {
    url: '/addMemory/:id',
	cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/addMemory.html',
		 controller: "CYRmeMemory"
      }
    }
  })
  
   .state('app.viewMemory', {
    url: '/viewMemory',
	cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/viewMemory.html',
		 controller: "viewMemory"
      }
    }
  })
  
  .state('app.memoryDetails', {
	url: "/memoryDetails/:id",
	cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/memoryDetails.html',
		 controller: "memoryDetails"
      }
    }
  })
  
  .state('app.activity', {
	url: "/activity/:mId/:aId/:toUser/:mPrivacy",
	cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/activity.html',
		 controller: "activity"
      }
    }
  })
  
   .state('app.viewAllActivities', {
	url: "/viewAllActivities/:id/:mTitle",
	cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/viewAllActivities.html',
		 controller: "viewAllActivities"
      }
    }
  })
  
  .state('app.activityDetails', {
	url: "/activityDetails/:id/:mTitle",
	cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/activityDetails.html',
		 controller: "activityDetails"
      }
    }
  })


  .state('app.home', {
      url: '/home',
	  cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
		  controller:  "homePage"
         }
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
