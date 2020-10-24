var gameName = $("#game-Name").val().trim();
inIt();
$("#Search-Btn").on("click", function () {
  gameName = $("#game-Name").val().trim();
  localStorage.setItem("game-Name", gameName);
  gameInfoGet();
});
function inIt() {
  var storedGame = localStorage.getItem("game-Name");

  if (storedGame !== null) {
    gameName = storedGame;
  }
  gameInfoGet(gameName);
}
function gameInfoGet() {
  var apiKey = "3ec2268b285d466b9f4b6c8932e66318";
  var queryURL =
    "https://api.rawg.io/api/games?key=" + apiKey + "&search=" + gameName;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    displayGameInfo(response);
  });
}
function displayGameInfo(game) {
  $("#game-Info").empty();
  $("#game-Name").val("");
  $("#game-Title").empty();
  $("#screenshot").empty();
  $("#stat").attr("style", "visibility: visible");
  $("#game-Title").attr("style", "visibility: visible");
  $("#screenshot").attr("style", "visibility: visible");
  $("<div>")
    .text("Title: " + game.results[0].name)
    .appendTo("#game-Title");
  $("<img>")
    .attr("src", game.results[0].background_image)
    .css("width", "30%", "height", "30%")
    .appendTo("#screenshot");
  $("<li>")
    .text("Rating: " + game.results[0].score)
    .appendTo("#game-Info");
  $("<li>")
    .text("Release Date: " + game.results[0].released)
    .appendTo("#game-Info");
  var tags = "";
  for (var i = 0; i < game.results[0].tags.length; i++) {
    tags += game.results[0].tags[i].name + ", ";
  }
  $("<li>")
    .text("Tags: " + tags)
    .appendTo("#game-Info");

  var platforms = "";
  for (var i = 0; i < game.results[0].platforms.length; i++) {
    platforms += game.results[0].platforms[i].platform.name + ", ";
  }
  $("<li>")
    .text("Platforms: " + platforms)
    .appendTo("#game-Info");
}
