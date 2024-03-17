function displatLetter(letter) {
  $("#letter").text(letter);
}

$(document).keypress(function (letter) {
  displatLetter(letter.key);
});
