$(document).ready(function () {

    // Array of puppies

    var puppies = ["Mastiff", "Poodle", "Pug", "Labrador", "Bulldog"];


    // JSON content for each button goes into the div
    function displayPuppyInfo() {
        //button gets called, then makes a call to GIPHY
        //var APIkey = "xoBCr30wBCUG0mnqM0tJxN0XjEChOXsM"
        var puppy = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + puppy + "&limit=10&api_key=xoBCr30wBCUG0mnqM0tJxN0XjEChOXsM";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //$("#puppy-view").text(JSON.stringify(response));

            var results = response.data;
            //for loop to pick 10 random gifs
            for (var i = 0; i < results.length; i++) {
                //creating a new div for the gifs
                var newDiv = $("<div>");
                console.log(newDiv);
                //var urlP = $("<p>");
                //nameP.text(name);
                //$("#puppy-div").append(urlP);
                var gifyURL = $("<img>");
                gifyURL.attr('src', results[i].images.fixed_height.url);

                var p = $("<p>");
                p.text("Rating: " + results[i].rating);

                gifyURL.attr("data-still", results[i].images.fixed_height_still.url);
                gifyURL.attr("data-state", "still");
                gifyURL.addClass("gif");
                gifyURL.attr("data-animate", results[i].images.fixed_height.url);

                newDiv.prepend(p);
                newDiv.prepend(gifyURL);
                $("#puppy-div").prepend(newDiv);
            }
        });

    }

    $(document).on('click', '.gif', function() {
        var state = $(this).attr('data-state');
        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    });

    // Display puppy data
    function renderButtons() {

        // Deleting the buttons prior to adding new puppies
        $("#buttons-view").empty();
        // Looping through the array of puppies
        for (var i = 0; i < puppies.length; i++) {

            var a = $("<button>");
            // Adding a class of movie to our button
            a.addClass("puppy");
            // Adding a data-attribute
            a.attr("data-name", puppies[i]);
            // Providing the initial button text
            a.text(puppies[i]);
            // Adding button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // When a button is clicked..
    $("#add-puppy").on("click", function (event) {
        event.preventDefault();

        var puppy = $("#puppy-input").val().trim();
        puppies.push(puppy);

        // Calling renderButtons 
        renderButtons();

    });

    //$(document).on('click', '.gif', function(){


    //});

    // Updating display for PuppyInfo
    $(document).on("click", ".puppy", displayPuppyInfo);

    // Updating display for the intial buttons
    renderButtons();

});