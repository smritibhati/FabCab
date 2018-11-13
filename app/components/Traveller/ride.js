"use strict";

function findaride() {
    var sourceField = document.getElementById("source");
    var source = sourceField.value;
    var destField = document.getElementById("dest");
    var dest = destField.value;
    var dateField = document.getElementById("date");
    var date = dateField.value;
    var hourField = document.getElementById("hour");
    var hour = hourField.value;
    var seatsField = document.getElementById("seats");
    var seats = seatsField.value;
    var findride = {
        "source": source,
        "dest": dest,
        "date": date,
        "hour": hour,
        "seats": seats        
    };
    postRequest("http://127.0.0.1:5000/find-a-ride", findride, "");
}

function offeraride() {
    var sourceField = document.getElementById("source");
    var source = sourceField.value;
    var destField = document.getElementById("dest");
    var dest = destField.value;
    var dateField = document.getElementById("date");
    var date = dateField.value;
    var hourField = document.getElementById("hour");
    var hour = hourField.value;
    var seatsField = document.getElementById("seats");
    var seats = seatsField.value;
    var priceField = document.getElementById("price");
    var price = priceField.value;
    var offerride = {
        "source": source,
        "dest": dest,
        "date": date,
        "hour": hour,
        "seats": seats,
        "price":price        
    };
    postRequest("http://127.0.0.1:5000/offer", offerride, "/posting-successfull.html");
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