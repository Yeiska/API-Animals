var topics = ["dog", "cat", "rabbit", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "gerbil", "chicken", "capybara", "serval", "frog"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
$("button").on("click", function () {

  var topic = $(this).attr("data-animal");
  console.log(topic);
  //var key = "43zrqxk7ngThmC5o8RMJrClvim3djS9f";
  var key = "dc6zaTOxFJmzC";
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + key + "&limit=10";
  
  console.log(queryURL);

  // Creates AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      // Creating and storing a div tag
      var animalDiv = $("<div>");
      console.log(animalDiv);
      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);

      // Creating a div to hold animal
      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height.url);


      // Displaying the rating
      animalDiv.append(p);

      // Storing the release year
      var released = response.Released;

      // Creating an element to hold the release year
      var pTwo = $("<p>").text("Released: " + released);

      // Displaying the release year
      animalDiv.append(pTwo);

      // Storing the plot
      var plot = response.Plot;

      // Creating an element to hold the plot
      var pThree = $("<p>").text("Plot: " + plot);

      // Appending the plot
      animalDiv.append(pThree);

      // Retrieving the URL for the image
      var imgURL = response.Poster;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      animalDiv.append(image);

      $("#animalsView").prepend(animalDiv);
    }
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (topic === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

});


      // function renderButtons() {

      //   // Deletes the movies prior to adding new movies
      //   // (this is necessary otherwise you will have repeat buttons)
      //   $("#buttonsView").empty();

      //   // Loops through the array of movies
      //   for (var i = 0; i < topics.length; i++) {

      //     // Then dynamicaly generates buttons for each movie in the array
      //     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      //     var a = $("<button>");
      //     // Adds a class of movie to our button
      //     a.addClass("animal-btn");
      //     // Added a data-attribute
      //     a.attr("data-name", topics[i]);
      //     // Provided the initial button text
      //     a.text(topics[i]);
      //     // Added the button to the buttons-view div
      //     $("#buttonsView").append(a);
      //   }
      // }

      // This function handles events where the add movie button is clicked
      // $("#addAnimal").on("click", function(event) {
      //   event.preventDefault();
      //   // This line of code will grab the input from the textbox
      //   var animal = $("#animalInput").val().trim();

      //   // The movie from the textbox is then added to our array
      //   animals.push(animal);

      //   // Calling renderButtons which handles the processing of our movie array
      //   renderButtons();

      // });

      // // Adding click event listeners to all elements with a class of "movie"
      // $(document).on("click", ".animal-btn", displayAnimalInfo);

      // // Calling the renderButtons function to display the intial buttons
      // renderButtons();