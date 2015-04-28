//response object
response = {};

//read in parameters
submittedUserName = request.params['userName'];
submittedEmail = request.params['email'];

//find user using get-by-field-value using email address
userQuery = openidm.query("managed/user", { "_queryId" : "get-by-field-value", "field":"userName", "value" : submittedUserName });
user = userQuery.result[0];
logger.error("request user {} email {} User query {}", submittedUserName, submittedEmail, user);


//only do this stuff is user actually exists..
if (user) {

	//only respond if submitted phoneNumber matches what is registered
	if (user.userName === submittedUserName) {
	
		//sub function to send email
		function sendVerificationEmail(email, password) {

			var params =  new Object();
			params._from = "openidm@example.com";
			params._to = email;
			params._subject = "Password Reminder";
			params._type = "text/html";
			params._body = "<html><body>Your password to the system is: " + password + "</body></html>";
 
			//sends mail
			openidm.action("external/email", params);

		}

		//send email
		password = openidm.decrypt(user.password);
		sendVerificationEmail(user.email, password);
		
		//send something back to ui
		response.comment = "Password reminder sent to registered email address";	
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
