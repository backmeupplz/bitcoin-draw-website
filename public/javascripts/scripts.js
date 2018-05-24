$(function (){
  $("#participants_button").click(searchParticipants);
  $("#participants_input").keyup(searchParticipants);
  var participantsRequest;
  function searchParticipants() {
    var query = $("#participants_input").val();
    if (participantsRequest) {
      participantsRequest.abort();
    }
    participantsRequest = $.get("participators?query=" + query, function (data, status) {
      if (status === 'success') {
        updateParticipants(data);
      } else {
        $("#participants_table").empty();
      }
    });
  }

  function updateParticipants(participants) {
    $("#participants_table").empty();
    for (var i = 0; i < participants.length; i++) {
      var participant = participants[i];
      $("#participants_table").append("<tr><td>" + participant.address + "</td><td>" + participant.numberOfTxs + "</td></tr>");
    }
  }

  $("#winners_button").click(searchWinners);
  $("#winners_input").keyup(searchWinners);
  var winnersRequest;
  function searchWinners() {
    var query = $("#winners_input").val();
    if (winnersRequest) {
      winnersRequest.abort();
    }
    winnersRequest = $.get("winners?query=" + query, function (data, status) {
      if (status === 'success') {
        updateWinners(data);
      } else {
        $("#winners_table").empty();
      }
    });
  }

  function updateWinners(winners) {
    $("#winners_table").empty();
    for (var i = 0; i < winners.length; i++) {
      var winner = winners[i];
      $("#winners_table").append("<tr><td>" + winner.address + "</td><td>" + winner.date + "</td><td>" + winner.prize + "฿</td></tr>");
    }
  }
});
