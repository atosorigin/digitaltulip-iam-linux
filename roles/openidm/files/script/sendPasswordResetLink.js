//response object
response = {}

//read in parameters
submittedUserName = request.params['userName'];
submittedPhoneNumber = request.params['phoneNumber'];

//find user using get-by-field-value using email address
userQuery = openidm.query("managed/user", { "_queryId" : "get-by-field-value", "field":"userName", "value" : submittedUserName });
user = userQuery.result[0];

//only do this stuff is user actually exists..
if (user) {

	//only respond if submitted phoneNumber matches what is registered
	if (user.phoneNumber === submittedPhoneNumber) {
	
		//sub function to send email
		function sendPasswordResetLink(email, url) {

			var params =  new Object();
			params._from = "openidm@example.com";
			params._to = email;
			params._subject = "Password Reset Link";
			params._type = "text/html";
			params._body = "<html><body>Password reset link: " + url + "</body></html>";
 
			//sends mail
			openidm.action("external/email", params);

		}

		//send email
		phoneNumber = user.phoneNumber;
		userName = user.userName;
		email=  user.email;
		url = "http://openidm.example.com:8080/openidm/endpoint/passwordReset?userName=" + userName + "&phoneNumber=" + phoneNumber + "&password=";
		sendPasswordResetLink(email, url);
		
		//send something back to ui
		response.comment = "Password reset email sent";	
	}

	//if already entered phonenumber doesnt match
	else {
	
	response.comment = "Invalid Details"; 
		
	}

}

//if user doesn't exist
else {
	
	response.comment = "Invalid Details";	
	
}

//send result back
response;
