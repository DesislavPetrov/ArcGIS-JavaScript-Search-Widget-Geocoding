require(["esri/Map", "esri/views/MapView", "esri/widgets/Search"], function (
    Map,
    MapView,
    Search
) {
    var map = new Map({
        basemap: "streets-navigation-vector"
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [23.317155, 42.664602],
        zoom: 18
    });

    // Geocoding
    var search = new Search({
        view: view
    });

    view.ui.add(search, "top-right");

    // Reverse geocoding
    view.on("click", function (evt) {
        search.clear();
        view.popup.clear();
        if (search.activeSource) {
            var geocoder = search.activeSource.locator; // World geocode service
            geocoder.locationToAddress(evt.mapPoint)
                .then(function (response) { // Show the address found
                    var address = response.address;
                    showPopup(address, evt.mapPoint);
                }, function (err) { // Show no address found
                    showPopup("No address found.", evt.mapPoint);
                });
        }
    });

    function showPopup(address, pt) {
        view.popup.open({
            title: + Math.round(pt.longitude * 100000) / 100000 + "," + Math.round(pt.latitude * 100000) / 100000,
            content: address,
            location: pt
        });
    }
});