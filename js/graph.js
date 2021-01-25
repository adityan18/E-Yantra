$(document).ready(function () {
  // Fetch the initial Chart
  refreshChart();
  // Fetch every 5 second
  setInterval(refreshChart, 5000);
});
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(refreshChart);

function refreshChart() {
  var jsonDataObject = [];
  var graph_arr = [["Order ID", "Time Taken", { role: "style" }]];
  var bar_color = [];
  $.getJSON(
    "https://spreadsheets.google.com/feeds/list/1lzT1-uyyN5LcNVhmZIbCtUXJ-z5iHFt5da5m9emXyIM/1/public/full?alt=json",
    function (data) {
      for (var i = 0; i < data.feed.entry.length; ++i) {
        var json_data = {
          OderID: data.feed.entry[i].gsx$orderid.$t,
          TimeTaken: parseFloat(data.feed.entry[i].gsx$timetaken.$t),
          Priority: data.feed.entry[i].gsx$priority.$t,
        };
        jsonDataObject.push(json_data);
      }
      // Setting color for the coloumns of graph according to priority of items
      for (var j in jsonDataObject) {
        if (jsonDataObject[j].Priority == "HP") {
          var color = "#FF0000";
        } else if (jsonDataObject[j].Priority == "MP") {
          var color = "#FFFF00";
        } else if (jsonDataObject[j].Priority == "LP") {
          var color = "#00FF00";
        }
        bar_color.push(color);
      }

      // Converting Json Object to JavaScript Array
      for (var j in jsonDataObject) {
        graph_arr.push([
          jsonDataObject[j].OderID,
          jsonDataObject[j].TimeTaken,
          bar_color[j],
        ]);
      }
      var graphArray_Final = google.visualization.arrayToDataTable(graph_arr);

      var data = new google.visualization.DataView(graphArray_Final);

      var options = {
        title: "Time Taken for items to be Shipped",
        hAxis: { title: "Order ID" },
        vAxis: { title: "Time Taken (s)" },
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(
        document.getElementById("column_chart")
      );
      chart.draw(data, options);
    }
  );
}
