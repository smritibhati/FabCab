function getData() {
    var params = (new URL(document.location)).searchParams;
    var src = params.get("src");
    var dest = params.get("dest");
    var date = params.get("date");
    var seats = params.get("seats");
    var price = params.get("price");
    var hour = params.get("hour");
    var data = {
        "source": src,
        "destinate": dest,
        "date": date,
        "seats": seats,
        "price": price,
        "hour": hour
    }
    displayData(data);
}

function displayData(data) {
    $("#frominsp").html(data.source);
    $("#toinsp").html(data.destinate);
    $("#dateinsp").html(data.date);
    $("#seatsinsp").html(data.seats);
    $("#priceinsp").html(data.price);
    $("#hourinsp").html(data.hour);
}

function signOut() {
    Cookies.remove('email');
    Cookies.remove('user_id');
    Cookies.remove('name');
    location.href = "../../../index.html";
}