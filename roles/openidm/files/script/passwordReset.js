//response object
response = {}

//read in parameters
submittedPhoneNumber = request.params['phoneNumber'];
submittedUserName = request.params['userName'];
submittedPassword = request.params['password'];

//find user using get-by-field-value using email address
userQuery = openidm.query("managed/user", { "_queryId" : "get-by-field-value", "field":"userName", "value" : submittedUserName });
user = userQuery.result[0];

//only do this stuff is user actually exists..
if (user) {

	//only respond if submitted userName matches what is registered with email address
	if (user.phoneNumber === submittedPhoneNumber) {

		var patch = [{ "replace" : "password", "value" : submittedPassword }];
		openidm.patch("managed/user/" + user._id, null, patch);
						
		//send something back to ui
		response.comment = "Password updated";	
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
