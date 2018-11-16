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
    var pass = passField.value;
    var user = {
        "user-mail": email,
        "user-pass": pass
    };

    //registerData.error(function(){alert("Something went wrong");})
    postLoginRequest("http://127.0.0.1:5000/login", user, "../user/account.html");
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

    postRequest("http://127.0.0.1:5000/verify", user, "/index.html");
}

function postRequest(postUrl, userData, nextPageUrl) {
    var response = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: postUrl,
        data: JSON.stringify(userData),
        success: function(result) {
            location.href = nextPageUrl;
        }
    });

    response.error(function() {})
}

/*************************************************************************/
function reqField(field) {
    if (field.value.length == 0) {
        document.getElementById("reqField").innerHTML = "Required Field";
        return false;
    } else {
        document.getElementById("reqField").innerHTML = "";
        return true;
    }
}


function nameValidate(field) {
    if (field.value.length == 0) {
        document.getElementById("nameError").innerHTML = "Required Field";
        return false;
    } else {
        document.getElementById("nameError").innerHTML = "";
        return true;
    }
}

function emailValidate(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailField.value.length == 0) {
        document.getElementById("emailError").innerHTML = "Required Field";
        return false;
    } else if (reg.test(emailField.value) == false) {
        document.getElementById("emailError").innerHTML = "Enter a valid Email";
        return false;
    } else {
        document.getElementById("emailError").innerHTML = "";
        return true;
    }
}

function numberValidate(mobileField) {
    var reg = /^[6789][0-9]{9}$/;
    if (mobileField.value.length == 0) {
        document.getElementById("mobileError").innerHTML = "Required Field";
        return false;
    } else if (reg.test(mobileField.value) == false) {
        document.getElementById("mobileError").innerHTML = "Enter a valid Number";
        return false;
    } else {
        document.getElementById("mobileError").innerHTML = "";
        return true;
    }
}

function passwordValidate(passField) {
    var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/;
    if (passField.value.length == 0) {
        document.getElementById("passError1").innerHTML = "Required Field";
        return false;
    } else if (reg.test(passField.value) == false) {
        document.getElementById("passError1").innerHTML = "Password must contain 8 characters, 1 uppercase, 1 lowercase, 1 special character and 1 numeric";
        return false;
    } else {
        document.getElementById("passError1").innerHTML = "";
        return true;
    }
}

function matchPasswords(passField) {
    var prev = document.getElementById("user-pass");
    if (passField.value.length == 0) {
        document.getElementById("passError2").innerHTML = "Required Field";
        return false;
    } else if (passField.value != prev.value) {
        document.getElementById("passError2").innerHTML = "The passwords do not match";
        return false;
    } else {
        document.getElementById("passError2").innerHTML = "";
        return true;
    }
}

function validateSignup() {
    var x = emailValidate(document.getElementById("user-mail"));
    x = x & nameValidate(document.getElementById("user-name"));
    x = x & numberValidate(document.getElementById("user-mob"));
    x = x & passwordValidate(document.getElementById("user-pass"));
    x = x & matchPasswords(document.getElementById("confirm-pass"));
    if (x == true)
        return true;
    else
        return false;
}

function validateLogin() {
    if (emailValidate(document.getElementById("user-mail")) == true)
        return true;
    else
        return false;
}

function checkForgotPassword() {
    if (emailValidate(document.getElementById("user-mail")) == true)
        return true;
    else
        return false;
}

function passChangeValidate() {
    var x = passwordValidate(document.getElementById("current"));
    x = x & passwordValidate(document.getElementById("user-pass"));
    x = x & passwordValidate(document.getElementById("confirm-pass"));
    if (x == true) {
        return true;
    } else {
        alert("Invalid Entries");
        return false;
    }

}
/*************************************************************************/
function postLoginRequest(postUrl, userData, nextPageUrl) {
    var response = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: postUrl,
        data: JSON.stringify(userData),
        success: function(result) {
            if (result.status == "login-success") {
                Cookies.set("email", userData["user-mail"]);
                location.href = nextPageUrl;
            } else {
                alert("Login Failed. Please try again.")
            }
        }
    });

    response.error(function() {})
}