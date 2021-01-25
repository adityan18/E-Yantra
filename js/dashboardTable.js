/////////////Ajax Requests////////////
$(document).ready(function () {
    // Fetch the initial table
    refreshTable();

    // Fetch every 1 second
    setInterval(refreshTable, 1000);
  });

  function refreshTable() {
    // var trHTML = '';

    $.getJSON(
      "https://spreadsheets.google.com/feeds/list/1lzT1-uyyN5LcNVhmZIbCtUXJ-z5iHFt5da5m9emXyIM/1/public/full?alt=json",
      function (data) {
        var trHTML = "";

        for (var i = 0; i < data.feed.entry.length; ++i) {
          var myData_map, myData_order;

          trHTML +=
            "<tr><td>" +
            data.feed.entry[i].gsx$orderid.$t +
            "</td><td>" +
            data.feed.entry[i].gsx$item.$t +
            "</td><td>" +
            data.feed.entry[i].gsx$priority.$t +
            "</td><td>" +
            data.feed.entry[i].gsx$city.$t +
            "</td><td>" +
            data.feed.entry[i].gsx$dispatched.$t +
            "</td><td>" +
            data.feed.entry[i].gsx$shipped.$t +
            "</td><td>" +
            data.feed.entry[i].gsx$orderdateandtime.$t +
            "</td><td>" +
            data.feed.entry[i].gsx$dispatchdateandtime.$t +
            "</td><td>" +
            data.feed.entry[i].gsx$shippeddateandtime.$t +
            "</td><td>" +
            data.feed.entry[i].gsx$timetaken.$t +
            "</td></tr>";
        }

        console.log(trHTML);
        $("#tableContent").html(trHTML);
        var trHTML = "";
      }
    );
  }