"use strict";

function register(){
  if(check_pass() == false){
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
    "user-mail" : email,
    "user-name" : name,
    "user-pass": pass,
    "user-mob": mobile
  };

  var registerData = $.ajax({
    type: "POST",
    contentType: "application/json;",
    url: "http://127.0.0.1:5000/register",
    data: JSON.stringify(user),
    success: function(result){
      alert("Registered successfully");
      location.href = "/verification.html";
    }
  });

  //registerData.error(function(){alert("Something went wrong");})
}

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});

function check_pass() {
  if (document.getElementById('user_pass').value == document.getElementById('confirm_pass').value) {
    return true;
  }else{
    alert("The Passwords Do Not Match");
    return false;
  }
}