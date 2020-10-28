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
    gameInfoGet(gameName);
  }
}
function gameDesGet() {
  var apiKey = "48e7971f0afc14da18804ba215d72302b787f0f2";
  var baseUrl = "http://www.giantbomb.com/api";
  var queryURL = baseUrl + "/search/?api_key=" + apiKey + "&format=json";

  $.ajax({
    url:
      "https://cors-anywhere.herokuapp.com/" +
      queryURL +
      "&query=" +
      encodeURI(gameName),
    dataType: "json",
    success: gameDescription,
  });
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
  $("#search-Info").empty();
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
  for (var i = 0; i < 4; i++) {
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
  gameDesGet();
}
function gameDescription(game) {
  console.log(game);
  $("<li>")
    .text("Descirption: " + game.results[0].deck)
    .appendTo("#game-Info");
}
