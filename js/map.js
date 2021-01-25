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
    "YOUR JSON https://spreadsheets.google.com/feeds/list/1lzT1-uyyN5LcNVhmZIbCtUXJ-z5iHFt5da5m9emXyIM/1/public/full?alt=json",
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

          L.tileLayer(
            "http://{s}.tile.cloudmade.com/e7b61e61295a44a5b319ca0bd3150890/997/256/{z}/{x}/{y}.png",
            {
              attribution:
                'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="http://cloudmade.com">CloudMade</a>',
              maxZoom: 18,
            }
          ).addTo(map);
        }
      }
    }
  );
}
