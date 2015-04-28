//response object
response = {};

//read in parameters
id = request.value['id'];
patch = request.value['patch'];

path = "managed/user/" + id;

user = openidm.read(path);

logger.info("Read user {}  request value {} patch {}", path, request.value,
		patch);

// define functions we need
function sendEmail(email, message) {
	var params = new Object();
	params._from = "openidm@example.com";
	params._to = email;
	params._subject = "Account updated";
	params._body = message;
	openidm.action("external/email", params);
}

// Return true if we should send out a change notification to the user
function shouldSendNotification(user, patchList) {
	for (var i = 0; i < patchList.length; ++i) {
		p = patchList[i];
		if (p["replace"] == "/password") {
			logger.info("Password attribute updated - will send email");
			return true;
		}
	}
	return false;
}

if (user) {
	// patch list
	revision = (parseInt(user._rev) + 1).toString();
	try {
		response.result = openidm.patch(path, null, patch);
		if (shouldSendNotification(user, patch))
			sendEmail(
					user.email,
					"Your account has been updated. If you did not make these changes please call TELCO ");
	} catch (err) {
		logger.error("Error on update {}. Rollback change to {}", err, path);
		response.result = "error on update. Error =" + err;
	}
}
//if user doesn't exist
else {
	response.comment = "Invalid id";
}

//send result back
response;
