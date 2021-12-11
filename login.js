var LOGIN_API = "https://youtube-api-challenger2.appspot.com/authentication";
var btnSubmit = document.getElementById("btnSubmit");
if(btnSubmit != null) {
    btnSubmit.onclick = function(){
        loginHandle();
    }
}

function loginHandle(){
    var username = document.forms["login-form"].elements["username"].value;
    var password = document.forms["login-form"].elements["password"].value;

    var obj = {
        "data": {
            "type": "MemberLogin",
            "attributes" : {
                "username": username,
                "password": password
            }
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", LOGIN_API, true);
    xhr.send(JSON.stringify(obj));
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var responseObject = JSON.parse(xhr.responseText);

            localStorage.setItem("secretToken", responseObject.data.attributes.secretToken);
            document.getElementById("total-msg").classList = "success-msg";
            document.getElementById("total-msg").innerHTML = "Login thành công.";
        }else {
            if(xhr.readyState === XMLHttpRequest.DONE){
                var responseObject = JSON.parse(xhr.responseText);
                document.getElementById("total-msg").classList = "error-msg";
                document.getElementById("total-msg").innerHTML = ""
                    | responseObject.errors[0].title + " " + responseObject.errors[0].detail;
            }
        }
    };
}