/////////////Ajax Requests////////////
$(document).ready(function () {
  refreshTable();

  setInterval(refreshTable, 500)
});

function refreshTable() {
  // var trHTML = '';

  $.getJSON(
    "https://spreadsheets.google.com/feeds/list/19w-_REjKOCMT2vZmgIAFoXAdflyAa_hDTwcctmt2D-Q/1/public/full?alt=json",
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
