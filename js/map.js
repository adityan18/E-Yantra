/////////////Ajax Requests////////////
$(document).ready(function () {
  // Fetch the initial Map
  refreshMap();

  // Fetch every 5 second
  setInterval(refreshMap, 5000);
});

function refreshMap() {
  var container = L.DomUtil.get("map");

  if (container != null) {
    container._leaflet_id = null;
  }

  var map = L.map("map").setView([20.5937, 78.9629], 5);
  var jsonDataObject = [];

  $.getJSON(
    "https://spreadsheets.google.com/feeds/list/19w-_REjKOCMT2vZmgIAFoXAdflyAa_hDTwcctmt2D-Q/1/public/full?alt=json",
    function (data) {
      for (var i = 0; i < data.feed.entry.length; ++i) {
        var json_data = {
          City: data.feed.entry[i].gsx$city.$t,
          OderID: data.feed.entry[i].gsx$orderid.$t,
          Item: data.feed.entry[i].gsx$item.$t,
          Latitude: parseFloat(data.feed.entry[i].gsx$latitude.$t),
          Longitude: parseFloat(data.feed.entry[i].gsx$longitude.$t),
        };
        jsonDataObject.push(json_data);

        for (var j = 0; j < jsonDataObject.length; j++) {
          var marker = L.marker(
            L.latLng(
              parseFloat(jsonDataObject[j].Latitude),
              parseFloat(jsonDataObject[j].Longitude)
            )
          );
          marker.bindPopup(jsonDataObject[j].City, {
            autoClose: false,
          });
          map.addLayer(marker);
          marker.on("click", onClick_Marker);
          // Attach the corresponding JSON data to your marker:
          marker.myJsonData = jsonDataObject[j];

          function onClick_Marker(e) {
            var marker = e.target;
            popup = L.popup()
              .setLatLng(marker.getLatLng())
              .setContent(
                "Order ID: " +
                  marker.myJsonData.OderID +
                  " || Item: " +
                  marker.myJsonData.Item
              )
              .openOn(map);
          }

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);
        }
      }
    }
  );
}
