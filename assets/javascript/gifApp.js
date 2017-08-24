//Variables
var stateButtons = ["OHIO", "ALASKA", "NEW YORK", "CALIFORNIA", "TEXAS"]

var allStates = ["ALABAMA", "ALASKA", "ARIZONA", "ARKANSAS", "CALIFORNIA", "COLORADO","CONNECTICUT","DELAWARE", "FLORIDA", "GEORGIA", "HAWAII", "IDAHO", "ILLINOIS", "INDIANA", "IOWA", "KANSAS", "KENTUCKY", "LOUISIANA", "MAINE", "MARYLAND", "MASSACHUSETTS", "MICHIGAN", "MINNESOTA", "MISSISSIPPI", "MISSOURI", "MONTANA", "NEBRASKA", "NEVADA", "NEW HAMPSHIRE", "NEW JERSEY", "NEW MEXICO", "NEW YORK", "NORTH CAROLINA", "NORTH DAKOTA", "OHIO", "OKLAHOMA", "OREGON", "PENNSYLVANIA", "RHODE ISLAND", "SOUTH CAROLINA", "SOUTH DAKOTA", "TENNESSEE", "TEXAS", "UTAH", "VERMONT", "VIRGINIA", "WASHINGTON", "WEST VIRGINIA", "WISCONSIN", "WYOMING"];

var index;
var newState;

//Functions
function firstButtons() {
	for (var i = 0; i < stateButtons.length; i++){
		makeButton(i);
	}
}

function makeButton (x) {
	var newButton = $("<button>");
	newButton.addClass("btn btn-primary stateButton");
	newButton.attr("data-name", stateButtons[x]);
	newButton.text(stateButtons[x]);
	$("#state-buttons").append(newButton);
}

function notAState (){
	var notAState = false
	if(allStates.indexOf(newState) === -1){
			notAState = true
	} 
	return notAState;
}

function alreadyChosen () {
	var repeatState = false;
	if (stateButtons.indexOf(newState) != -1) {
		repeatState = true;
	}
	return(repeatState);
}

function displayGifs () {
	console.log("the displayGifs function was called")
	$("#images").empty();
	var thisState = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        thisState + "&api_key=dc6zaTOxFJmzC&limit=10";
    $("#message").text(thisState + " GIFs:")
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function (response) {
		console.log("The .done function was called")
		var results = response.data;
		console.log(results);
		for (var i = 0; i < results.length; i++) {
			var imageDiv = $("<div class='col-xs-12 col-sm-6'>");
			var p = $("<p>").text("Rating: " + results[i].rating);
			var stateImage = $("<img>");
			stateImage.attr("src", results[i].images.fixed_height_still.url);
			stateImage.attr("still", results[i].images.fixed_height_still.url);
			stateImage.attr("animate", results[i].images.fixed_height.url);
			stateImage.attr("motion", "still");
			imageDiv.append(p);
			imageDiv.append(stateImage);
			$("#images").prepend(imageDiv);	
		}
	});
}

function changeMotion () {
	if (($(this).attr("motion"))=== "still") {
		$(this).attr("src", $(this).attr("animate"));
		$(this).attr("motion", "animate");
	} else {
		$(this).attr("src", $(this).attr("still"));
		$(this).attr("motion", "still");
	}
}


//App
//Create the starting buttons
firstButtons ();

$("#add-state").on("click", function(event) {
	event.preventDefault();
	newState = $("#state-input").val().trim().toUpperCase();
	if (notAState()) {
		alert("Please type the name of a state.")
	} else if (alreadyChosen()) {
		alert(newState + " already has a button.");
	} else {
		stateButtons.push(newState);
		$("input").empty();
		$("#state-input").empty();
		var index = stateButtons.length - 1;
		makeButton(index);
	} 
});

$(document).on("click", ".stateButton", displayGifs);

$(document).on("click", "img", changeMotion);
	
	


	 
















