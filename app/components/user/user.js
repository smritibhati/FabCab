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
    initialize();
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

function initialize() {
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var map;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lang: position.coords.longitude
            };
            var curr_loc = {
                lat: pos.lat,
                lng: pos.lang
            }
            var mapOptions = {
                zoom: 15,
                center: curr_loc
            };
            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            directionsDisplay.setMap(map);
            // google.maps.event.addDomListener(document.getElementById('routebtn'), 'click', calcRoute);

            var geocoder = new google.maps.Geocoder();
            var source = document.getElementById("frominsp").innerText;
            var dest = document.getElementById("toinsp").innerText;
            var slat, slng, dlat, dlng;
            geocoder.geocode({ 'address': source }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    slat = results[0].geometry.location.lat();
                    slng = results[0].geometry.location.lng();
                }
            });
            geocoder.geocode({ 'address': dest }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    dlat = results[0].geometry.location.lat();
                    dlng = results[0].geometry.location.lng();
                }
                var start = new google.maps.LatLng(slat, slng);
                var end = new google.maps.LatLng(dlat, dlng);
                var bounds = new google.maps.LatLngBounds();
                bounds.extend(start);
                bounds.extend(end);
                map.fitBounds(bounds);
                var request = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        directionsDisplay.setMap(map);
                    } else {
                        alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
                    }
                });
            });

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}