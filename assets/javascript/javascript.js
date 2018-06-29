var topics = ["dog", "cat", "rabbit", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "gerbil", "chicken", "capybara", "serval", "frog"];
console.log(topics);
var results;
// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

  var topic = $(this).attr("data-name");
  console.log(topic);
  var key = "dc6zaTOxFJmzC";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + key + "&limit=10" + "gif-non-animated";

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
      var animalDiv = $("<div class='col-md-4' 'animal'>");
     
      // Creating a paragraph tag with the result item's rating
      var p1 = $("<p>").text("Rating: " + results[i].rating);
      //runAnimate.attr(results[i].images_data-state.url);
      var animalImage = $("<img class='imag'>");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
      animalImage.attr("data-state", "still");
      
      // Displaying the rating and image
      animalDiv.append(p1);
      animalDiv.append(animalImage);
      $("#animalsView").prepend(animalDiv);
    }
  });
}
$(document).on("click",".imag", function () {
  var state = $(this).attr("data-state");
  
  //If the clicked image's state is still, update its src attribute to what its data-animate value is.
  //Then, set the image's data-state to animate
  //Else set src to the data-still value
  if (state === "still") {
    console.log(state);
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    console.log("data-state");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    //console.log();
    $(this).attr("data-state", "still");
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
