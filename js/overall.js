$(document).ready(function () {
  refreshTable();

  setInterval(refreshTable, 1000);
});

$(document).ready(function () {
  // Fetch the initial Chart
  refreshChart();
  // Fetch every 5 second

  setInterval(refreshChart, 5000);
});

$(document).ready(function () {
  // Fetch the initial Map
  refreshMap();

  // Fetch every 5 second
  setInterval(refreshMap, 5000);
});

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(refreshChart);

function refreshPage() {
  var graph_arr = [
    ["Order ID", "Time Taken", { role: "style" }, { role: "annotation" }],
  ];
  var bar_color = [];
  var bar_item = [];

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
          Dispatch: data.feed.entry[i].gsx$dispatched.$t,
          Shipped: data.feed.entry[i].gsx$shipped.$t,
          TimeTaken: parseFloat(data.feed.entry[i].gsx$timetaken.$t),
          Priority: data.feed.entry[i].gsx$priority.$t,
          OrderDateTime: data.feed.entry[i].gsx$orderdateandtime.$t,
          DispatchDateTime: data.feed.entry[i].gsx$dispatchdateandtime.$t,
          ShippedDateTime: data.feed.entry[i].gsx$shippeddateandtime.$t,
        };
        jsonDataObject.push(json_data);

      }

    }
  );
}
