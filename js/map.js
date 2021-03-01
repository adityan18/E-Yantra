/////////////Ajax Requests////////////
$(document).ready(function () {
  // Fetch the initial Map
  refreshMap();

  // Fetch every 5 second
  setInterval(refreshMap, 3000);
});

function refreshMap() {
  var container = L.DomUtil.get("map");

  if (container != null) {
    container._leaflet_id = null;
  }

  var map = L.map("map", { scrollWheelZoom: false }).setView(
    [21.5937, 78.9629],
    5.2
  );
  map.removeControl(map.zoomControl);
  // map.removeControl(map.scrollWheelZoom);
  var jsonDataObject = [];

  $.getJSON(
    "https://spreadsheets.google.com/feeds/list/1AhQHelY8bow_DsAJU7Pqo-CG6Q5T-jj-tRSoLKFE38g/1/public/full?alt=json",

    function (data) {
      for (var i = 0; i < data.feed.entry.length; ++i) {
        var json_data = {
          City: data.feed.entry[i].gsx$city.$t,
          OderID: data.feed.entry[i].gsx$orderid.$t,
          Item: data.feed.entry[i].gsx$item.$t,
          Latitude: parseFloat(data.feed.entry[i].gsx$latitude.$t),
          Longitude: parseFloat(data.feed.entry[i].gsx$longitude.$t),
          Dispatch: data.feed.entry[i].gsx$dispatched.$t,
          Shipped: data.feed.entry[i].gsx$shipped.$t,
        };
        jsonDataObject.push(json_data);
      }

      for (var j = 0; j < jsonDataObject.length; j++) {
        var LeafIcon = L.Icon.extend({
          options: {
            iconSize: [41, 41],
            iconAnchor: [21, 41],
            popupAnchor: [-3, -76],
          },
        });

        if (jsonDataObject[j].Shipped == "Yes") {
          var Icon = new LeafIcon({
            iconUrl: "img/green.png",
          });
        } else if (jsonDataObject[j].Dispatch == "Yes") {
          var Icon = new LeafIcon({
            iconUrl: "img/yellow.png",
          });
        } else {
          var Icon = new LeafIcon({
            iconUrl: "img/red.png",
          });
        }

        var marker = L.marker(
          L.latLng(
            parseFloat(jsonDataObject[j].Latitude),
            parseFloat(jsonDataObject[j].Longitude)
          ),
          { icon: Icon }
        );
        map.addLayer(marker);
        marker.on("mouseover", onClick_Marker);
        // Attach the corresponding JSON data to your marker:
        marker.myJsonData = jsonDataObject[j];
        if (marker.myJsonData.Dispatch != "Yes") {
          marker.myJsonData.Dispatch = "No";
        }
        if (marker.myJsonData.Shipped != "Yes") {
          marker.myJsonData.Shipped = "No";
        }

        function onClick_Marker(e) {
          var marker = e.target;
          popup = L.popup()
            .setLatLng(marker.getLatLng())
            .setContent(
              "<center>City:<b>" +
                marker.myJsonData.City +
                "</b></center>" +
                "<center>Order ID: <b>" +
                marker.myJsonData.OderID +
                "</b> || Item: <b>" +
                marker.myJsonData.Item +
                "</b></center><center>Dispatched: <b>" +
                marker.myJsonData.Dispatch +
                "</b> || Shipped: <b>" +
                marker.myJsonData.Shipped
            )
            .openOn(map);
        }

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
      }
    }
  );
}
