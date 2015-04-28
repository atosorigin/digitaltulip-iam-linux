function createUsers(){
    var firstname,
        lastname,
        xml,
        txt,
        username,
        email,
        i=0,
        numUsers = $('#numUsers').val(),
        data,
        callParams,
        deferredCount = 0;
    
    $('#users').html('');
    
    for(i=0;i<numUsers;i++){
        firstname = createName(3,11);
        lastname = createName(3,11);
        username = firstname.substring(0,1) + '.' + lastname;
        email = username + '@userCreator.gen';
        
        data = {
                givenName: firstname,
                sn: lastname,
                mail: email.toLowerCase(),
                userName: username.toLowerCase(),
                telephoneNumber: "9876543210",
                password: "Passw0rd1",
                roles: ["openidm-authorized"]
        }    
        
        callParams = {
            "url":"/openidm/managed/user?_action=create",
            "type":"POST",
            "data":JSON.stringify(data),
            "headers":{"X-Requested-With":"XMLHttpRequest"},
            "contentType":"application/json",
            "dataType":"json",
            "xhrFields":{"withCredentials":true},
            "success": function(d){
                $('#users').append("<br/>Created: " + d.userName);
            }
        }
        
        $.ajax(callParams).then(function(d){
            deferredCount++;
            $('#successCount').remove();
            $('#users').before("<h3 id='successCount'>Successfully Created " + deferredCount + " Users</h3>");
        });
    }
}


