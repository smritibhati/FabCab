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
    postRequest("http://localhost:5000/find", findride, "");
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
        "price": price
    };
    postOfferRequest("http://localhost:5000/offer", offerride, "../user/posting-successful.html?src=" + offerride.source + "&dest=" + offerride.dest + "&date=" + offerride.date + "&seats=" + offerride.seats + "&price=" + offerride.price);
}

function postRequest(postUrl, userData, nextPageUrl) {
    var response = $.ajax({
        type: "POST",
        contentType: "application/json;",
        url: postUrl,
        data: JSON.stringify(userData),
        success: function(result) {
            displayFindRides(result)
                // location.href = nextPageUrl;

        }

    });

    response.error(function() {})
}

function postOfferRequest(postUrl, userData, nextPageUrl) {
    var response = $.ajax({
        type: "POST",
        contentType: "application/json;",
        url: postUrl,
        data: JSON.stringify(userData),
        success: function(result) {
            // displayFindRides(result)
            location.href = nextPageUrl;

        }

    });

    response.error(function() {})
}

function getofferedrides() {
    getRequest("http://localhost:5000/offered", "");
}

function displayFindRides(result) {
    $("#found").html = "";
    for (var len = 0; len < result.rides.length; len++)
        $("#found").append("<tr><td>" + result.rides[len].source + "</td><td>" + result.rides[len].dest + "</td><td>" + result.rides[len].price + "  </td><td> " + result.ride + "</td>" + " <button class = 'btn btn-default' style='width: 40%; color: black; background-color: gold;' > BOOK </button></td></tr>");
}

function displayOfferedRides(result) {
    $("#past").html("");
    $("#upcoming").html("");
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    for (var len = 0; len < result.rides.length; len++) {
        var date = result.rides[len].date;
        date = new Date(date);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = result.rides[len].hour;

        if (month > mm) {
            $("#upcoming").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span> " + result.rides[len].source + "</span> <span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><span  id='block-span'> At:" + result.rides[len].hour + "  </span><span id='block-span'>Price : <strong> " + result.rides[len].price + " </strong></span></div>");
        } else if (month == mm) {
            if (day > dd) {
                $("#upcoming").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span> " + result.rides[len].source + "</span> <span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><span  id='block-span'> At:" + result.rides[len].hour + "  </span><span id='block-span'>Price : <strong> " + result.rides[len].price + " </strong></span></div>");
            } else if (day < dd) {
                $("#past").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span> " + result.rides[len].source + "</span> <span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><span  id='block-span'> At:" + result.rides[len].hour + "  </span><span id='block-span'>Price : <strong> " + result.rides[len].price + " </strong></span></div>");
            } else {
                if (hour > hh) {
                    $("#upcoming").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span> " + result.rides[len].source + "</span> <span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><span  id='block-span'> At:" + result.rides[len].hour + "  </span><span id='block-span'>Price : <strong> " + result.rides[len].price + " </strong></span></div>");
                } else if (hour == hh) {
                    $("#upcoming").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span> " + result.rides[len].source + "</span> <span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><span  id='block-span'> At:" + result.rides[len].hour + "  </span><span id='block-span'>Price : <strong> " + result.rides[len].price + " </strong></span></div>");
                } else {
                    $("#past").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span> " + result.rides[len].source + "</span> <span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><span  id='block-span'> At:" + result.rides[len].hour + "  </span><span id='block-span'>Price : <strong> " + result.rides[len].price + " </strong></span></div>");
                }
            }
        } else
            $("#past").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span> " + result.rides[len].source + "</span> <span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><span  id='block-span'> At:" + result.rides[len].hour + "  </span><span id='block-span'>Price : <strong> " + result.rides[len].price + " </strong></span></div>");
    }
}

function getRequest(postUrl, nextPageUrl) {
    var response = $.ajax({
        type: "GET",
        contentType: "application/json;",
        url: postUrl,

        success: function(result) {
            displayOfferedRides(result)
                // location.href = nextPageUrl
        }

    });

    response.error(function() {})
}

function getUserData() {
    getDataRequest("http://localhost:5000/profile");
}

function getDataRequest(postUrl) {
    var response = $.ajax({
        type: "GET",
        url: postUrl,

        success: function(result) {
            displayUserData(result)
                // location.href = nextPageUrl
        }

    });

    response.error(function() {})
}