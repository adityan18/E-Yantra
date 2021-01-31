$(document).ready(function () {
  // Fetch the initial Chart
  refreshChart();
  // Fetch every 5 second

  // setInterval(refreshChart, 5000);
});
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(refreshChart);

function refreshChart() {
  var jsonDataObject = [];
  var graph_arr = [
    ["Order ID", "Time Taken", { role: "style" }, { role: "annotation" }],
  ];
  var bar_color = [];
  var bar_item = [];

  $.getJSON(
    "https://spreadsheets.google.com/feeds/list/19w-_REjKOCMT2vZmgIAFoXAdflyAa_hDTwcctmt2D-Q/1/public/full?alt=json",
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
          var color1 =
            "fill-color:#ce465c;stroke-color:#FF0000;fill-opacity:0.5;stroke-width:5";
          var item = "\tMedicine\t";
        } else if (jsonDataObject[j].Priority == "MP") {
          var color1 =
            "fill-color:#ffe5ab;stroke-color:#ffc803;fill-opacity:0.5;stroke-width:5";
          var item = "Food";
        } else if (jsonDataObject[j].Priority == "LP") {
          var color1 =
            "fill-color:#3b956c;stroke-color:#106e45;fill-opacity:0.5;stroke-width:5";
          var item = "Clothes";
        }
        bar_color.push(color1);
        bar_item.push(item);
      }

      // Converting Json Object to JavaScript Array
      for (var j in jsonDataObject) {
        graph_arr.push([
          jsonDataObject[j].OderID,
          jsonDataObject[j].TimeTaken,
          bar_color[j],
          bar_item[j],
        ]);
      }
      var graphArray_Final = google.visualization.arrayToDataTable(graph_arr);

      var data = new google.visualization.DataView(graphArray_Final);

      var options = {
        titlePosition: "none",
        hAxis: {
          title: "Order ID",
          titleTextStyle: {
            color: "white",
            fontSize: 25,
            bold: "true",
            italic: "true",
          },
          textStyle: {
            color: "white",
            italic: "true",
            fontSize: 20,
          },
          gridlines: {
            color: "white",
          },
        },
        vAxis: {
          title: "Time Taken (s)",
          titleTextStyle: {
            color: "white",
            fontSize: 25,
            bold: "true",
            italic: "true",
          },
          textStyle: {
            color: "white",
            italic: "true",
            fontSize: 20,
          },
        },
        bar: { groupWidth: "65%" },
        legend: { position: "none" },
        backgroundColor: "black",
        annotations: {
          alwaysOutside: "true",
          textStyle: {
            fontSize: 20,
            fontName: "Times-Roman",
            italic: "true",
          },
        },
      };
      var chart = new google.visualization.ColumnChart(
        document.getElementById("column_chart")
      );
      chart.draw(data, options);
    }
  );
}
