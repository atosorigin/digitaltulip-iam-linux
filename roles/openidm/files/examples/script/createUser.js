
//read in parameters
id = request.value['_id'];
email = request.value['email'];

response = {};
try {
        //find user using get-by-field-value using email address
        response  = openidm.create("managed/user/" + id, request.value);
        sendEmail(email, "Your account has been created. Your user id is " + id +". Welcome to TELUS!");
}
catch(e) {
        // log and rethrow
        logger.error("Error creating account. e = {}", e);
        throw e;
}

logger.info("Created {} ", id);

// function to send email
function sendEmail(email, message) {
        var params = new Object();
        params._from = "openidm@example.com";
        params._to = email;
        params._subject = "Account updated";
        params._body = message;
        openidm.action("external/email", params);
}

//send result back
response;
