angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $state, $filter, $ionicLoading, $timeout) {
	
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  	
	// var for show home page
		$scope.showHomeMsg 			= false;
		$scope.showHomeUserName 	= false;
		
	// var for show login logout or register links
		$scope.beforeloginLinks	 = false;
		$scope.afterloginLinks   = false;
		
	// var for show user details page
		$scope.showUserDetail  = false;
		$scope.loginThroughMsg = "CYR";
		
	// var for show logou tMsg
		$scope.logoutMsg  = false;
	
	// function for show Loading
		$scope.showLoading = function() {
			$ionicLoading.show({
			  template: '<ion-spinner icon="bubbles"></ion-spinner>'
			});
		  };
	// function for hide Loading
	    $scope.hideLoading = function(){
			$ionicLoading.hide();
		  };
	
	// Form data for the login modal
		$scope.loginData = [];
	
	// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
		}).then(function(loginModal) {
			$scope.loginModal = loginModal;
		});
	// Create the register modal that we will use later
		$ionicModal.fromTemplateUrl('templates/register.html', {
		scope: $scope
		}).then(function(registerModal) {
		$scope.registerModal = registerModal;
		});
		
	// Create the register thanks modal that we will use later
		$ionicModal.fromTemplateUrl('templates/registerThanks.html', {
		scope: $scope
		}).then(function(registerThanksModal) {
			$scope.registerThanksModal = registerThanksModal;
		});
		
	// Create the forgot password modal that we will use later
		$ionicModal.fromTemplateUrl('templates/forgotPassword.html', {
		scope: $scope
		}).then(function(forgotPasswordModal) {
			$scope.forgotPasswordModal = forgotPasswordModal;
		});
		
	// Create the user Detailss Modal that we will use later
		$ionicModal.fromTemplateUrl('templates/userDetails.html', {
		scope: $scope
		}).then(function(userDetailsModal) {
			$scope.userDetailsModal = userDetailsModal;
		});
	
	// Create the reset password Modal that we will use later
		$ionicModal.fromTemplateUrl('templates/resetPassword.html', {
		scope: $scope
		}).then(function(resetPasswordModal) {
			$scope.resetPasswordModal = resetPasswordModal;
		});
		
		
	////////////////////////////////////////////////////////////////////////////////////	
	
	// Triggered in the login modal to close it
		$scope.closeLogin = function() {
			$scope.loginModal.hide();
		};
	
	// Open the login modal
		$scope.login = function() {
			//hide registe modal and register thanks modal when open login modal
			$scope.vEmailMsg = false;
			$scope.registerModal.hide();
			$scope.registerThanksModal.hide();
			$scope.forgotPasswordModal.hide();
			$scope.loginModal.show();
		};
		
		
	// Triggered in the register modal to close it
		$scope.closeRegister = function() {
		$scope.registerModal.hide();
		};
		
	// Open the register modal
		$scope.register = function() {
		//hide registe modal and register thanks modal when open login modal
		$scope.loginModal.hide();
		$scope.registerThanksModal.hide();
		$scope.registerModal.show();
		};
		
	
	// check current user are present or not
		var currentUser = Parse.User.current();
		//alert(currentUser["name"]);
		//console.log(currentUser);
		if (currentUser) {
			//console.log('currentUser= yes');
			$scope.beforeloginLinks	 = false;
			$scope.afterloginLinks   = true;
			
			$scope.showHomeUserName 	= true;
		    $scope.name = currentUser.get("name");
			$scope.showUserDetail  = true;
			
			$timeout(function() {
			$scope.userDetails(); //auto close the popup after 1\2 seconds
			$scope.userDetailsModal.hide(); //hide detail popup after 1\2 seconds
		  }, 500);
		  
		} else {
			//console.log('currentUser= No');
			$scope.beforeloginLinks	 = true;
			$scope.afterloginLinks   = false;
			
			$scope.showHomeUserName 	 = false;
			
			$timeout(function() {
			 $scope.login(); //auto close the popup after 1\2 seconds
		  }, 500);
		}
	
	//logout current user
		$scope.logOut = function() {
			Parse.User.logOut();
			var currentUser = Parse.User.current();  // this will now be null
			$scope.beforeloginLinks	 = true;
			$scope.afterloginLinks   = false;
			$scope.showHomeUserName  = false;
			
			$timeout(function() {
			 $scope.login(); //auto close the popup after 1\2 seconds
		  }, 500);
		  
		  	$scope.logoutMsg  		= true;
			$scope.logoutMsgValue	= 'You have been successfully logout.';
			$timeout(function() {
			 $scope.logoutMsg  		= false;
			 $scope.logoutMsgValue	= '';
		  }, 10000);
		};
		
	// Triggered on a button click, or some other target
		/*$scope.succeslogOutPopup = function() {
		  //custom popup
		  var mySucceslogOutPopup = $ionicPopup.show({
				 title: 'You have been successfully logout.',
			  });
		  mySucceslogOutPopup.then(function(res) {
			console.log('LogOut!', res);
		  });
		  $timeout(function() {
			 mySucceslogOutPopup.close(); //auto close the popup after 1 seconds
		  }, 3000);
		 };*/


	
	// Perform the login action when the user submits the CYR login form ***********Start***********
		$scope.doLogin = function() {
		$scope.showLoading();
		console.log('Doing login', $scope.loginData);
		
		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		 $scope.vEmailMsg = false;
		   Parse.User.logIn(String($scope.loginData['username']), String($scope.loginData['password']), {
			  success: function(user) {
				 var emailVerified = user.get("emailVerified");
				  if (!emailVerified) 
				  {
					  $scope.hideLoading();
					 // $scope.logOut();
					  Parse.User.logOut();
					  $scope.vEmailMsg = true;
					  $scope.vEmailMsgValue ="Please verifying your email address before Login.";
					  $scope.beforeloginLinks	 = true;
					  $scope.afterloginLinks     = false;
					  $scope.$apply();
				  } 
				  else
				  {
					  user.save(); //save login module time
					  $scope.closeLogin();
					  $scope.showHomeMsg = true;
					  $scope.homeMsgValue ="You have been successfully logged in.";
					  $scope.beforeloginLinks	 = false;
					  $scope.afterloginLinks  	 = true;
					  $scope.showHomeUserName 	 = true;
		    		  $scope.name 				 = user.get("name");
					  $scope.email 			 	 = user.get("email");
					  $scope.phone 			 	 = user.get("phone");
					  $scope.firstName 			 = user.get("firstName");
					  $scope.middleName 		 = user.get("middleName");
					  $scope.surName 		     = user.get("surName");
					  $scope.dateOfBirth 		 = $filter('date')(user.get("dateOfBirth"), "dd/MM/yyyy");
					  $scope.loginThroughMsg   	 = $scope.loginThroughMsg;
					  
					  var query = new Parse.Query("ProfilePhoto");
						query.equalTo("userObjectId", user.id);
						query.equalTo("author", user.get("name"));
						query.find({
						  success: function(results){
							 // If the query is successful, store each image URL in an array of image URL's
        						//imageURLs = [];
							    for (var i = 0; i < results.length; i++) { 
								  var object = results[i];
								  //imageURLs.push(object.get('photoFile'));
								  var photoFileObj = object.get("photoFile");
								  var url 		   = photoFileObj.url();
								}
								$scope.photo 	= url;
							 	$scope.$apply();
						  }
						});
					  
					  
					  $state.go("app.home"); // go to home page
					  $timeout(function() {
						 $scope.showHomeMsg = false;
						}, 3000);
					  
					  
					  $scope.hideLoading();
					  $scope.$apply();
				  }
				  
			  },
			  error: function(user, error) {
				// The login failed. Check error to see.
				 $scope.hideLoading();
				 $scope.vEmailMsg = true;
				 $scope.vEmailMsgValue 	=$scope.firstCharCapital(error.message);
				 $scope.beforeloginLinks	 = true;
				 $scope.afterloginLinks   	 = false;
				 $scope.showHomeUserName 	 = false;
				 
				 $timeout(function() {
					 $scope.vEmailMsg = false;
					}, 3000);
				 $scope.$apply();
			  }
			});
		};
	// Perform the login action when the user submits the CYR login form ***********END***********
	
	// Perform the FB login start***********
		var fbLogged = new Parse.Promise();
		
		var fbLoginSuccess = function(response) {
		if (!response.authResponse){
		  fbLoginError("Cannot find the authResponse");
		  return;
		}
		var expDate = new Date(
		  new Date().getTime() + response.authResponse.expiresIn * 1000
		).toISOString();
		
		var authData = {
		  id: String(response.authResponse.userID),
		  access_token: response.authResponse.accessToken,
		  expiration_date: expDate
		}
		fbLogged.resolve(authData);
		console.log(response);
		};
		
		var fbLoginError = function(error){
		fbLogged.reject(error);
		};
		
		
		$scope.fbLogin = function() {
		console.log('Login');
		if (!window.cordova) {
			
		  //facebookConnectPlugin.browserInit('1129125900435568');
		  
		  //anil FB App id 
		  facebookConnectPlugin.browserInit('1442568932738358');
		}
		
		// window.open(facebookConnectPlugin.showDialog, '_blank', 'location=yes');
		facebookConnectPlugin.login(['email'], fbLoginSuccess, fbLoginError);
		
		fbLogged.then( function(authData) {
		console.log('Promised');
		return Parse.FacebookUtils.logIn(authData);
		
		})
		.then( function(userObject) {
		   facebookConnectPlugin.api('/me?fields=id,email,name,gender', null, 
			function(response) {
			  console.log(response);
			  
			  $scope.loginThroughMsg = "Facebook";
			  
			  //user not existed
			  if (!userObject.existed()) 
			  {
				  userObject.set('name', response.name);
				  userObject.set('email', response.email);
				  userObject.save();
				  console.log("User first time signed up and logged in through Facebook!");
				  $scope.vEmailMsg = true;
				  $scope.vEmailMsgValue ="User first time signed up and logged in through Facebook!";
				  $scope.$apply();
			  } 
			  else 
			  {
				  //user existed
				  userObject.save();
				  console.log("User already logged in through Facebook!");
				  $scope.vEmailMsg = true;
				  $scope.vEmailMsgValue ="User already logged in through Facebook!";
				  $scope.$apply();
			  }
			  $scope.loginModal.hide();
			},
			function(error) {
			   //Error found
			  $scope.loginModal.show();
			  console.log(error);
			  console.log("User cancelled the Facebook login or did not fully authorize.");
			  $scope.vEmailMsg = true;
			  $scope.vEmailMsgValue ="Error: " + error.code + " " + error.message;
			  $scope.$apply();
			}
		  );
		 
		}, function(error) {
		  //Error found
		  console.log(error);
		});
		};
	// Perform the FB login ***********END***********
	
	// Perform the Register action when the user submits the Register form  ***********Start***********
	
		// Form data for the register modal
		$scope.registerData = [];
		
		//check password match
		$scope.registerData['password'] = '';
		$scope.registerData['confirmPassword'] = '';
		$scope.passwordMatch = false;
		$scope.passwordMatchMsg = false;
		$scope.registerMsg 		= false;
		
		$scope.$watch("registerData['password']",function() {$scope.matchPassword();});
		$scope.$watch("registerData['confirmPassword']",function() {$scope.matchPassword();});	
		
		$scope.matchPassword = function() {
		  if ($scope.registerData['password'] === $scope.registerData['confirmPassword']) 
		  {
			$scope.passwordMatch = true;
		  } 
		  else 
		  {
			$scope.passwordMatch = false;
		  }
		  
		  if($scope.passwordMatch==false && $scope.registerData['password'].length>0 && $scope.registerData['confirmPassword'].length>0)
		  {
			$scope.passwordMatchMsg = true;
		  }
		  else
		  {
			$scope.passwordMatchMsg = false;
		  }
		  console.log('passwordNotMatch=', $scope.passwordMatch);
		};
		
		// Perform the register action when the user submits the register form
		$scope.doRegister = function() {
			$scope.showLoading();
			console.log('Doing register', $scope.registerData);
			
			// code if using a register system
			$scope.passwordMatchMsg = false;
			$scope.registerMsgValue = "";
			
			var userRegister = new Parse.User();
			userRegister.set("username", String($scope.registerData['username']));
			userRegister.set("name", String($scope.registerData['username']));
			userRegister.set("password", String($scope.registerData['password']));
			userRegister.set("email", String($scope.registerData['email']));
			userRegister.set("phone", String($scope.registerData['phoneNumber']));
			userRegister.set("firstName", String($scope.registerData['firstName']));
			userRegister.set("middleName", String($scope.registerData['middleName']));
			userRegister.set("surName", String($scope.registerData['surName']));
			userRegister.set("dateOfBirth", $scope.registerData['dateOfBirth']);
			
			userRegister.signUp(null, {
			  success: function(userRegisterResponse) {
				  
				var userObjectID=userRegisterResponse.id;
				
				var fileUploadControl = $("#photoFileUpload")[0];
				if (fileUploadControl.files.length > 0) {
					var file = fileUploadControl.files[0];
					var name = "photo.png";
					var parseFile = new Parse.File(name, file);
					parseFile.save().then(function(parseFile,userRegisterResponse) {
					  // The file has been saved to Parse. file's URL is only available 
					  //after you save the file or after you get the file from a Parse.Object.
					  //Get the function url() on the Parse.File object.
					   var ProfilePhoto =Parse.Object.extend("ProfilePhoto");
					   var photo = new ProfilePhoto();
						   photo.set("title", "Profile");
						   photo.set("photoFile", parseFile);
						   photo.set("author", String($scope.registerData['username']));
						   photo.set("userObjectId", userObjectID);
						   photo.save();
						  
						//url = parseFile.url();
						 console.log("success: file upload");
					}, 
					  function(error) {
						// The file either could not be read, or could not be saved to Parse.
						console.log("Error: " + error.code + " " + error.message);
					  });
				};
				  
				  
				$scope.hideLoading();
				Parse.User.logOut();
				$scope.beforeloginLinks	 = true;
				$scope.afterloginLinks   = false;
				
				$scope.registerThanks();
				$scope.registerMsg = true;
				$scope.registerMsgValue ="Please verifying your email address before Login.";
				$scope.$apply();
				//console.log("Register: " + userRegisterResponse.code + " " + userRegisterResponse.message);
				
				///////////////////////////////////////
				
			  },
			  error: function(userRegisterResponse, error) {
				// Show the error message somewhere and let the user try again.
				$scope.hideLoading();
				$scope.registerMsg = true;
				$scope.registerMsgValue = $scope.firstCharCapital(error.message);
				console.log("Error: " + error.code + " " + error.message);
				$scope.$apply();
			  }
			});
			
		};
		
		// Triggered in the rregister thanks modal to close it
		$scope.closeRegisterThanks = function() {
			$scope.registerThanksModal.hide();
		};
		
		// Open the register thanks modal
		$scope.registerThanks = function() {
			//hide registe modal and login modal when open register thanks modal
			$scope.loginModal.hide();
			$scope.registerModal.hide();
			$scope.registerThanksModal.show();
		};
	
	// Perform the Register action when the user submits the Register form   ***********End***********
	
	
	//function for first char capital in string
		$scope.firstCharCapital = function(input){
		  return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
		};
		
		
	// Perform user details   ***********start***********	
		
		// Triggered in the user detailss modal to close it
			$scope.closeUserDetailssModal = function() {
				$scope.userDetailsModal.hide();
			};
		
			//show user details
			$scope.userDetails = function() {
				// check current user are present or not
				var currentUser = Parse.User.current();
				if (currentUser) {
					$scope.userDetailsModal.show();
					$scope.showUserDetail = true;
					
					$scope.name 			= currentUser.get("name");
					$scope.email 			= currentUser.get("email");
					$scope.phone 			= currentUser.get("phone");
					$scope.firstName 		= currentUser.get("firstName");
					$scope.middleName 		= currentUser.get("middleName");
					$scope.surName 		    = currentUser.get("surName");
					$scope.dateOfBirth 		= $filter('date')(currentUser.get("dateOfBirth"), "dd/MM/yyyy");
					$scope.loginThroughMsg  = $scope.loginThroughMsg;
					
					 var query = new Parse.Query("ProfilePhoto");
					query.equalTo("userObjectId", currentUser.id);
					query.equalTo("author", currentUser.get("name"));
					query.find({
					  success: function(results){
						  // If the query is successful, store each image URL in an array of image URL's
        					//imageURLs = [];
						    for (var i = 0; i < results.length; i++) { 
							  var object = results[i];
							  //imageURLs.push(object.get('photoFile'));
							  var photoFileObj = object.get("photoFile");
							  var url 		   = photoFileObj.url();
							}
							$scope.photo 	= url;
							$scope.$apply();
					  }
					});
					
				} else {
					$scope.userDetailsModal.hide();
					$scope.showUserDetail 		 = false;
				}
			};
	// Perform user details   ***********End***********
	
	
	
	////////////////////////////////////////
	
	// Perform the Forgot Password action when the user submits the Forgot Password form  ***********Start***********
	
		// Form data for the register modal
		$scope.forgotPasswordData = [];
		$scope.forgotPasswordMsg = false;
		$scope.successForgotPasswordMsg = false;
		
		$scope.forgotPasswordMsgValue = "";
		$scope.successForgotPasswordMsgValue = "";
		
		$scope.doForgotPassword = function() {
			$scope.showLoading();
			console.log('Doing Forgot Password', $scope.forgotPasswordData);
			
			// code if using a Forgot Password system
			Parse.User.requestPasswordReset(String($scope.forgotPasswordData['email']), {
			  success: function() {
				$scope.hideLoading();
				$scope.login();
			    $scope.successForgotPasswordMsg = true;
				$scope.successForgotPasswordMsgValue ="Forgot password request was sent successfully, Please check your email.";
				$scope.$apply();
			  },
			  error: function(error) {
				// Show the error message somewhere
				$scope.hideLoading();
				$scope.forgotPasswordMsg 	 = true;
				$scope.forgotPasswordMsgValue = $scope.firstCharCapital(error.message);
				$timeout(function() {
					 $scope.forgotPasswordMsg = false;
					}, 3000);
				$scope.$apply();
			  }
			});
		};
		
		// Triggered in the forgot password modal to close it
		$scope.closeForgotPassword = function() {
			$scope.forgotPasswordModal.hide();
		};
		
		// Open the forgot password modal
		$scope.forgotPassword = function() {
			//hide registe modal, register thanks and login modal when open forgot password modal
			$scope.loginModal.hide();
			$scope.registerModal.hide();
			$scope.registerThanksModal.hide();
			$scope.forgotPasswordModal.show();
			$scope.$apply();
		};
	
	// Perform the Register action when the user submits the Register form   ***********End***********
	
	
	
	////////////////////////////////////////////////
	
	// Perform the Reset Password action when the user submits the Reset Password form  ***********Start***********
	
		// Form data for the reset password modal
		$scope.resetPasswordData = [];
		
		//check password match
		$scope.resetPasswordData['oldPassword'] = '';
		$scope.resetPasswordData['newPassword'] = '';
		$scope.resetPasswordData['confirmNewPassword'] = '';
		
		$scope.resetPasswordMsg 	 = false;
		$scope.resetPasswordMsgValue = "";
		
		$scope.resetPasswordMatch 	 = false;
		$scope.resetPasswordMatchMsg = false;
		
		$scope.$watch("resetPasswordData['newPassword']",function() {$scope.matchResetPassword();});
		$scope.$watch("resetPasswordData['confirmNewPassword']",function() {$scope.matchResetPassword();});	
		
		$scope.matchResetPassword = function() {
		  if ($scope.resetPasswordData['newPassword'] === $scope.resetPasswordData['confirmNewPassword']) 
		  {
			$scope.resetPasswordMatch = true;
		  } 
		  else 
		  {
			$scope.resetPasswordMatch = false;
		  }
		  
		  if($scope.resetPasswordMatch==false && $scope.resetPasswordData['newPassword'].length>0 && $scope.resetPasswordData['confirmNewPassword'].length>0)
		  {
			$scope.resetPasswordMatchMsg = true;
		  }
		  else
		  {
			$scope.resetPasswordMatchMsg = false;
		  }
		  console.log('resetPasswordNotMatch=', $scope.resetPasswordMatchMsg);
		};
		
		// Perform the reset password action when the user submits the reset password form
		$scope.doResetPassword = function() {
			$scope.showLoading();
			console.log('Doing reset password', $scope.resetPasswordData);
			
			// code if using reset password system
			$scope.passwordMatchMsg = false;
			$scope.resetPasswordMsgValue = "";
			
			//check current user
			var currentUser = Parse.User.current();
			if (currentUser) {
				var currentUserName 	= currentUser.get("username");
				Parse.User.logIn(String(currentUserName), String($scope.resetPasswordData['oldPassword']), {
				  success: function(user) {
					  
					user.set("password", String($scope.resetPasswordData['newPassword']));
					user.save();
					
					$scope.resetPasswordData['oldPassword'] = '';
					$scope.resetPasswordData['newPassword'] = '';
					$scope.resetPasswordData['confirmNewPassword'] = '';
					
					$scope.closeResetPassword();
					$scope.hideLoading();
					$state.go("app.home"); // go to home page
					$scope.showHomeMsg 	 	= true;
					$scope.homeMsgValue 	= "Password has been reset successfully.";
					$timeout(function() {
					 $scope.showHomeMsg = false;
					 $scope.homeMsgValue = "";
					}, 4000);
					$scope.$apply();
					  
				  },
				  error: function(user, error) {
					  $scope.hideLoading();
					  $scope.resetPasswordMsg 	 	= true;
					  $scope.resetPasswordMsgValue 	= "Invalid Old Password, Please Enter Correct Old Password.";
					  $scope.$apply();
				  }
				});
			} 
			else {
				$scope.hideLoading();
				$scope.resetPasswordMsg 	 	= true;
				$scope.resetPasswordMsgValue 	= "Invalid User.";
				$scope.$apply();
			}
			
		};
		
		// Triggered in the reset password modal to close it
		$scope.closeResetPassword = function() {
			$scope.resetPasswordModal.hide();
		};
		
		// Open the reset password modal
		$scope.resetPassword = function() {
			//hide user details modal and register thanks modal when open reset password modal
			$scope.userDetailsModal.hide();
			$scope.registerThanksModal.hide();
			$scope.resetPasswordModal.show();
		};
	
	// Perform the Reset Password action when the user submits the Reset Password form  ***********END***********
	
	
		////////////////////////////////////////////
	  	
		console.log('afterloginLinks=='+$scope.afterloginLinks);
	})