"use strict";

function register() {
    if (check_pass() == false) {
        return false;
    }
    var emailField = document.getElementById("user-mail");
    var email = emailField.value;
    var nameField = document.getElementById("user-name");
    var name = nameField.value;
    var passField = document.getElementById("user-pass");
    var pass = passField.value;
    var mobileField = document.getElementById("user-mob");
    var mobile = mobileField.value;
    var user = {
        "user-mail": email,
        "user-name": name,
        "user-pass": pass,
        "user-mob": mobile
    };
    postRequest("http://127.0.0.1:5000/register", user, "verification.html?email=" + email);
}

function login() {
    var emailField = document.getElementById("user-mail");
    var email = emailField.value;
    var passField = document.getElementById("user-pass");
    var mobile = mobileField.value;
    var user = {
        "user-mail": email,
        "user-pass": pass
    };

    //registerData.error(function(){alert("Something went wrong");})
    postRequest("http://127.0.0.1:5000/login", user, "/verification.html");
}

function check_pass() {
    if (document.getElementById('user-pass').value == document.getElementById('confirm-pass').value) {
        return true;
    } else {
        alert("The Passwords Do Not Match");
        return false;
    }
}

function verify() {
    var otpField = document.getElementById("otp");
    var otp = otpField.value;
    var params = (new URL(document.location)).searchParams;
    var email = params.get("email");
    var user = {
        "user-mail": email,
        "otp": otp
    };

    postRequest("http://127.0.0.1:5000/verify", user, "/verification.html");
}

function postRequest(postUrl, userData, nextPageUrl) {
    var response = $.ajax({
        type: "POST",
        contentType: "application/json;",
        url: postUrl,
        data: JSON.stringify(userData),
        success: function(result) {
            location.href = nextPageUrl;
        }
    });

    response.error(function() {})
}