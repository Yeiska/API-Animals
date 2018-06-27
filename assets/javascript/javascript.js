var topics = ["dog", "cat", "rabbit", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "gerbil", "chicken", "capybara", "serval", "frog"];
console.log(topics);
var results;
// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

  var topic = $(this).attr("data-name");
  console.log(topic);
  var key = "dc6zaTOxFJmzC";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + key + "&limit=10";

  console.log(queryURL);

  // Creates AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    results = response.data;
    for (var i = 0; i < results.length; i++) {
      // Creating and storing a div tag with class animal
      var animalDiv = $("<div class = 'animal'>");
      console.log(animalDiv);
      // Storing the rating data
      // var rating = response.Rated;
      // Creating a paragraph tag with the result item's rating
      var p1 = $("<p>").text("Rating: " + results[i].rating);
      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height.url);
      // Displaying the rating
      animalDiv.append(p1);
      animalDiv.append(animalImage);
      // Retrieving the URL for the image
      var imgURL = response.Poster;
      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);
      // Appending the image
      animalDiv.append(image);
      $("#animalsView").prepend(animalDiv);
    }


  });
}
$(document).on("click", ".animal", function () {
  event.preventDefault();

  // Then dynamicaly generates buttons
  var a = $("<button>");
  //added class
  a.addClass("animal-btn");
  // Added a data-attribute
  a.attr("data-state", results);
  console.log(a);
  // Provided the initial button text
  //a.text(topics[i]);
  // Added the button to the buttons-view div
  $("#buttonsView").append(a);
  //console.log(".gif");
  var state = $(a).attr("data-state");
  //var state = $(this).attr("data-state");
  console.log(state);
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    console.log(state);
    $(".gif").attr("src", $(".gif").attr("data-animate"));
    //console.log(state);
    $(".gif").attr("data-state", "animate");
    console.log("data-state");
  } else {
    $(".gif").attr("src", $(".gif").attr("data-still"));
    //console.log();
    $(".gif").attr("data-state", "still");
  }
});

function renderButtons() {

  $("#buttonsView").empty();

  // Loops through the array topics
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generates buttons
    var a = $("<button>");
    //added class
    a.addClass("animal-btn");
    // Added a data-attribute
    a.attr("data-name", topics[i]);
    // Provided the initial button text
    a.text(topics[i]);
    // Added the button to the buttons-view div
    $("#buttonsView").append(a);
  }
}

//This function handles events where the add animal button is clicked
$("#addAnimal").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var animal = $("#animalInput").val().trim();

  // The animal from the textbox is then added to the array
  topics.push(animal);

  // Calling renderButtons funtion
  renderButtons();

});

// Adding click event listeners to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();