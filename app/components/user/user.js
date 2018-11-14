function getData() {
    var params = (new URL(document.location)).searchParams;
    var src = params.get("src");
    var dest = params.get("dest");
    var date = params.get("date");
    var seats = params.get("seats");
    var price = params.get("price");
    var data = {
        "source": src,
        "destinate": dest,
        "date": date,
        "seats": seats,
        "price": price
    }
    displayData(data);
}

function displayData(data) {
    $("#frominsp").html(data.source);
    $("#toinsp").html(data.dest);
    $("#dateinsp").html(data.date);
    $("#seatsinsp").html(data.seats);
    $("#priceinsp").html(data.price);
}
function subscribe(){
    var emailField = document.getElementById("pemail");
    var email = emailField.value;
    var emailobj = {
        "rider-id": 1
    };
    postRequest("http://localhost:5000/subscribe", emailobj, "#");
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