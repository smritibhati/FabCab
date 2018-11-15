"use strict";
var data;
var sourceProf;

function searchRide(){
    var params = (new URL(document.location)).searchParams;
    if (params.get("src")) {
        var sourceParam = params.get("src");
        var destParam = params.get("dest");
        var hourParam = params.get("hour");
        var dateParam = params.get("date");
        var sourceField = document.getElementById("source");
        var destField = document.getElementById("dest");
        var dateField = document.getElementById("date");
        var hourField = document.getElementById("hour");
        var seatsField = document.getElementById("seats");
        sourceField.value = sourceParam;
        destField.value = destParam;
        hourField.value = hourParam;
        seatsField.value = 1;
        dateField.value = dateParam;

        var source = sourceField.value;
        var dest = destField.value;
        var date = dateField.value;
        var hour = hourField.value;
        var seats = seatsField.value;
        
        var findride = {
            "userId": Cookies.get("user_id"),
            "userMail": Cookies.get("email"),
            "source": source,
            "dest": dest,
            "date": date,
            "hour": hour,
            "seats": seats
        };
        postRequest("http://localhost:5000/find", findride, "");
    }
}

function findaride() {
    
    var source, dest, date, hour, seats;
    var sourceField = document.getElementById("source");
    var destField = document.getElementById("dest");
    var dateField = document.getElementById("date");
    var hourField = document.getElementById("hour");
    var seatsField = document.getElementById("seats");
     
    source = sourceField.value;
    dest = destField.value;
    date = dateField.value;
    hour = hourField.value;
    seats = seatsField.value;
    
    var findride = {
        "userId": Cookies.get("user_id"),
        "userMail": Cookies.get("email"),
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
        "userId": Cookies.get("user_id"),
        "userMail": Cookies.get("email"),
        "source": source,
        "dest": dest,
        "date": date,
        "hour": hour,
        "seats": seats,
        "price": price
    };
    postOfferRequest("http://localhost:5000/offer", offerride, "../user/posting-successful.html?src=" + offerride.source + "&dest=" + offerride.dest + "&date=" + offerride.date + "&seats=" + offerride.seats + "&price=" + offerride.price + "&hour=" + offerride.hour);
}

function postRequest(postUrl, userData, nextPageUrl) {
    var response = $.ajax({
        type: "POST",
        contentType: "application/json;",
        url: postUrl,
        data: JSON.stringify(userData),
        success: function(result) {
            data = result;
            displayFindRides(result)
                // location.href = nextPageUrl;

        }

    });

    response.error(function() {})
}

function getbookedrides() {
    $("#inbookings").html(Cookies.get("name"));
    var userObj = {
        "userId": Cookies.get("user_id"),
        "userMail": Cookies.get("email")
    }
    postBookedRequest("http://localhost:5000/booked", userObj);
}

function postBookedRequest(postUrl, userData) {
    var response = $.ajax({
        type: "POST",
        contentType: "application/json;",
        url: postUrl,
        data: JSON.stringify(userData),
        success: function(result) {
            console.log("Successfully received booked rides");
            displayBookedRides(result);
        }

    });

    response.error(function() {})
}

function displayBookedRides(result) {
    $("#pastbooking").html("");
    $("#upcomingbooking").html("");
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
            $("#upcomingboking").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span id='block-span'>Your trip with <strong>" + result.rides[len].name + "</strong> on <strong> " + result.rides[len].date + "</strong>  </span><span id='block-span'>Paid : <strong>" + result.rides[len].price + "</strong></span><span> " + result.rides[len].source + "</span><span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><button type='button' onclick = 'cancelbookedride(" + result.rides[len].rid + ")'class='btn btn-default' style='color: black!important; margin-bottom: 1em; background:gold; position: relative; left: 40%;'>Cancel Ride</button></div>");
        } else if (month == mm) {
            if (day > dd) {
                $("#upcomingbooking").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span id='block-span'>Your trip with <strong>" + result.rides[len].name + "</strong> on <strong> " + result.rides[len].date + "</strong>  </span><span id='block-span'>Paid : <strong>" + result.rides[len].price + "</strong></span><span> " + result.rides[len].source + "</span><span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><button type='button' onclick = 'cancelbookedride(" + result.rides[len].rid + ")' class='btn btn-default' style='color: black!important; margin-bottom: 1em; background:gold; position: relative; left: 40%;'>Cancel Ride</button></div>");
            } else if (day < dd) {
                $("#pastbooking").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span id='block-span'>Your trip with <strong>" + result.rides[len].name + "</strong> on <strong> " + result.rides[len].date + "</strong>  </span><span id='block-span'>Paid : <strong>" + result.rides[len].price + "</strong></span><span> " + result.rides[len].source + "</span><span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span></div>");
            } else {
                if (hour > hh) {
                    $("#upcomingbooking").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span id='block-span'>Your trip with <strong>" + result.rides[len].name + "</strong> on <strong> " + result.rides[len].date + "</strong>  </span><span id='block-span'>Paid : <strong>" + result.rides[len].price + "</strong></span><span> " + result.rides[len].source + "</span><span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><button type='button' onclick = 'cancelbookedride(" + result.rides[len].rid + ")' class='btn btn-default' style='color: black!important; margin-bottom: 1em; background:gold; position: relative; left: 40%;'>Cancel Ride</button></div>");
                } else if (hour == hh) {
                    $("#upcomingbooking").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span id='block-span'>Your trip with <strong>" + result.rides[len].name + "</strong> on <strong> " + result.rides[len].date + "</strong>  </span><span id='block-span'>Paid : <strong>" + result.rides[len].price + "</strong></span><span> " + result.rides[len].source + "</span><span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><button type='button' onclick = 'cancelbookedride(" + result.rides[len].rid + ")' class='btn btn-default' style='color: black!important; margin-bottom: 1em; background:gold; position: relative; left: 40%;'>Cancel Ride</button></div>");
                } else {
                    $("#pastbooking").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span id='block-span'>Your trip with <strong>" + result.rides[len].name + "</strong> on <strong> " + result.rides[len].date + "</strong>  </span><span id='block-span'>Paid : <strong>" + result.rides[len].price + "</strong></span><span> " + result.rides[len].source + "</span><span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span></div>");
                }
            }
        } else
            $("#pastbooking").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span id='block-span'>Your trip with <strong>" + result.rides[len].name + "</strong> on <strong> " + result.rides[len].date + "</strong>  </span><span id='block-span'>Paid : <strong>" + result.rides[len].price + "</strong></span><span> " + result.rides[len].source + "</span><span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span></div>");
    }
}

function cancelbookedride(rid) {
    var bbj = {
        "userId": Cookies.get("user_id"),
        "userMail": Cookies.get("email"),
        "rid": rid
    };
    postCancelRequest("http://localhost:5000/unbook", bbj);
}

function postCancelRequest(postUrl, userData) {
    var response = $.ajax({
        type: "POST",
        contentType: "application/json;",
        url: postUrl,
        data: JSON.stringify(userData),
        success: function(result) {
            getbookedridesrides();
        }

    });

    response.error(function() {})
}

function cancelofferedride(rid) {
    var bbj = {
        "userId": Cookies.get("user_id"),
        "userMail": Cookies.get("email"),
        "rid": rid
    };
    postCancelOfferRequest("http://localhost:5000/removeoffer", bbj);
}

function postCancelOfferRequest(postUrl, userData) {
    var response = $.ajax({
        type: "POST",
        contentType: "application/json;",
        url: postUrl,
        data: JSON.stringify(userData),
        success: function(result) {
            getofferedrides();
        }

    });

    response.error(function() {})
}

function subscribe() {
    var emailField = document.getElementById("pemail");
    var email = emailField.value;
    var emailobj = {
        "userId": Cookies.get("user_id"),
        "userMail": Cookies.get("email"),
        "rider-id": 4
    };
    postRequest("http://localhost:5000/subscribe", emailobj, "#");
}

function displaybooking() {
    var params = (new URL(document.location)).searchParams;
    var source = params.get("src");
    var dest = params.get("dest");
    var date = params.get("date");
    var seats = params.get("seats");
    var hour = params.get("hour");

    $("#frominbs").html(source);
    $("#toinbs").html(dest);
    $("#dateinbs").html(date);
    $("#hourinbs").html(hour);
    $("#seatsinbs").html(seats);
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
    $("#inofferedrides").html(Cookies.get("name"));
    var userObj = {
        "userId": Cookies.get("user_id"),
        "userMail": Cookies.get("email")
    }
    postOfferedRequest("http://localhost:5000/offered", userObj);
}

function postOfferedRequest(postUrl, userData) {
    var response = $.ajax({
        type: "POST",
        contentType: "application/json;",
        url: postUrl,
        data: JSON.stringify(userData),
        success: function(result) {
            console.log("Successfully received offerd rides");
            displayOfferedRides(result);
        }

    });

    response.error(function() {})
}

function displayFindRides(result) {
    $("#found").innerHtml = "";
    for (var len = 0; len < result.rides.length; len++)
        $("#found").append("<tr><td>" + result.rides[len].source + "</td><td>" + result.rides[len].dest + "</td><td>" + result.rides[len].name + "  </td><td> " + result.rides[len].price + "</td><td> <button class = 'btn btn-default' style='color: black; background-color: gold;' onclick='book(" + len + ")'>BOOK </button></td></tr>");
}

function book(index) {
    var required = data.rides[index];
    var bookride = {
        "userId": Cookies.get("user_id"),
        "userMail": Cookies.get("email"),
        "rid": required.rid
    };
    postOfferRequest("http://localhost:5000/book", bookride, "../user/booking-successful.html?src=" + required.source + "&dest=" + required.dest + "&date=" + required.date + "&seats=" + required.seats);
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
            $("#upcoming").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span><strong> " + result.rides[len].source + "</strong></span> <span> <i class='fa fa-long-arrow-right fa-2x' style='color:black; position:relative; top: 0.15em;' aria-hidden='true'> </i> </span><span> <strong>" + result.rides[len].dest + "</strong> </span><span  id='block-span'> <strong> At: </strong> " + result.rides[len].hour + "  </span><span id='block-span'> <strong>Price : </strong> " + result.rides[len].price + " </span></div>");
        } else if (month == mm) {
            if (day > dd) {
                $("#upcoming").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span><strong> " + result.rides[len].source + "</strong></span> <span> <i class='fa fa-long-arrow-right fa-2x' style='color:black; position:relative; top: 0.15em;' aria-hidden='true'> </i> </span><span> <strong>" + result.rides[len].dest + "</strong> </span><span  id='block-span'> <strong> At: </strong> " + result.rides[len].hour + "  </span><span id='block-span'> <strong>Price : </strong> " + result.rides[len].price + " </span></div>");
            } else if (day < dd) {
                $("#past").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span> " + result.rides[len].source + "</span> <span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><span  id='block-span'> <label> At: </label>" + result.rides[len].hour + "  </span><span id='block-span'>Price : <strong> " + result.rides[len].price + " </strong></span></div>");
            } else {
                if (hour > hh) {
                    $("#upcoming").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span><strong> " + result.rides[len].source + "</strong></span> <span> <i class='fa fa-long-arrow-right fa-2x' style='color:black; position:relative; top: 0.15em;' aria-hidden='true'> </i> </span><span> <strong>" + result.rides[len].dest + "</strong> </span><span  id='block-span'> <strong> At: </strong> " + result.rides[len].hour + "  </span><span id='block-span'> <strong>Price : </strong> " + result.rides[len].price + " </span></div>");
                } else if (hour == hh) {
                    $("#upcoming").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span><strong> " + result.rides[len].source + "</strong></span> <span> <i class='fa fa-long-arrow-right fa-2x' style='color:black; position:relative; top: 0.15em;' aria-hidden='true'> </i> </span><span> <strong>" + result.rides[len].dest + "</strong> </span><span  id='block-span'> <strong> At: </strong> " + result.rides[len].hour + "  </span><span id='block-span'> <strong>Price : </strong> " + result.rides[len].price + " </span></div>");
                } else {
                    $("#past").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span> " + result.rides[len].source + "</span> <span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><span  id='block-span'><label> At: </label> " + result.rides[len].hour + "  </span><span id='block-span'>Price : <strong> " + result.rides[len].price + " </strong></span></div>");
                }
            }
        } else
            $("#past").append("<div class = 'col-md-8 col-md-offset-1' style = 'border : dimgray 0.5px solid; position: relative; top: 3em; margin: 2em;padding: 1em;'> <span> " + result.rides[len].source + "</span> <span> <i class='fa fa-long-arrow-right' aria-hidden='true'> </i> </span><span>" + result.rides[len].dest + "</span><span  id='block-span'> <label> At: </label>" + result.rides[len].hour + "  </span><span id='block-span'>Price : <strong> " + result.rides[len].price + " </strong></span></div>");
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

function postUserDataRequest(postUrl, userData, nextPageUrl) {
    var response = $.ajax({
        type: "POST",
        contentType: "application/json;",
        url: postUrl,
        data: JSON.stringify(userData),
        success: function(result) {
            Cookies.set("user_id", result.userId);
            Cookies.set("name", result.userName);
            displayUserData(result)
                // location.href = nextPageUrl;

        }

    });

    response.error(function() {})
}

function getDataRequest(postUrl) {
    var response = $.ajax({
        type: "GET",
        url: postUrl,

        success: function(result) {
            Cookies.set("email", result.userMail);
            Cookies.set("name", result.userName);
            displayUserData(result);
        }

    });

    response.error(function() {})
}

function getUserData() {
    var data = {
        "userId": Cookies.get("user_id"),
        "userMail": Cookies.get("email")
    }
    postUserDataRequest("http://localhost:5000/profile", data, "");
}

function displayUserData(result) {
    $("#nameinnavbar").html(result.userName);
    $("#aname").html(result.userName);
    $("#aemail").html(result.userMail);
    $("#aphone").html(result.userMob);
    $("#adob").html(result.userDoj);
}

function addvehicledetails() {
    if (document.getElementById('agree').checked) {
        var regField = document.getElementById("reg");
        var reg = regField.value;
        var modelField = document.getElementById("model");
        var model = modelField.value;
        var vehicledetails = {
            "registration": reg,
            "model": model,
        };
        postRequest("http://localhost:5000/blabla", vehicledetails, "profilepage");
    } else {
        alert("Please agree to the Terms and Conditions");
    }
}

function postUserDataRequest(postUrl, userData, nextPageUrl) {
    var response = $.ajax({
        type: "POST",
        contentType: "application/json;",
        url: postUrl,
        data: JSON.stringify(userData),
        success: function(result) {
            Cookies.set("user_id", result.userId);
            displayUserData(result)
                // location.href = nextPageUrl;

        }

    });

    response.error(function() {})
}

function letsgo() {
    var sourceField = document.getElementById("source");
    var source = sourceField.value;
    var destField = document.getElementById("dest");
    var dest = destField.value;
    var dateField = document.getElementById("date");
    var date = dateField.value;
    var hourField = document.getElementById("hour");
    var hour = hourField.value;
    location.href = "app/components/Traveller/find-a-ride.html?src=" + source + "&dest=" + dest + "&date=" + date + "&hour=" + hour;
}

/*********************************************************************/
function checkSource(field) {
    if (field.value.length == 0) {
        document.getElementById("sourceX").innerHTML = "Required Field";
        return false;
    } else {
        document.getElementById("sourceX").innerHTML = "";
        return true;
    }
}

function checkDest(field) {
    if (field.value.length == 0) {
        document.getElementById("destX").innerHTML = "Required Field";
        return false;
    } else {
        document.getElementById("destX").innerHTML = "";
        return true;
    }
}

function rideFindValidate() {
    var x = checkSource(document.getElementById("source"));
    x = x & checkDest(document.getElementById("dest"));
    if (x == true) {
        return true;
    } else {
        return false
    }
}

function offerRideValidate() {
    if (!Cookies.get("email")) {
        alert("Please login to offer a ride");
        location.href = "../Login/login.html";
    } else {
        var x = checkSource(document.getElementById("source"));
        x = x & checkDest(document.getElementById("dest"));
        if (x == true) {
            var flag = 0;
            var seats = document.getElementById("seats");
            var price = document.getElementById("price");
            if (seats.value.length == 0) {
                document.getElementById("seatsX").innerHTML = "Required Field";
                flag = 1;
            }
            if (price.value.length == 0) {
                document.getElementById("priceX").innerHTML = "Required Field";
                flag = 1;
            }
            if (flag = 1) {
                return false;
            } else {
                return true;
            }
        } else {
            return false
        }
    }
}
/*********************************************************************/