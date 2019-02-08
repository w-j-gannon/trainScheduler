// 1. Initialize Firebase
// 2. Create button to add new trains. Push data to firebase and clear fields.
// 3. Retrieve data from firebase, do moment.js and math, then post to table

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDozgKIsALHrOPmXjs0lpDbB-tNNhS2wA0",
    authDomain: "trainscheduler-7f87e.firebaseapp.com",
    databaseURL: "trainscheduler-7f87e.firebaseio.com",
    storageBucket: "trainscheduler-7f87e.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();


// 2. Button for adding Trains
$("#train-submit-button").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var timeStart = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: timeStart,
        rate: trainFrequency
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.rate);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

// 3. Retrieve data from firebase, do moment.js and math, then post to table
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var timeStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().rate;

    // Show Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(timeStart);
    console.log(trainFrequency);

    var now = moment();
    var start = moment("05:00", "HH mm");
    var frequency = 10;

    var minutesElapsed = now.diff(start, "minutes");

    var stopsElapsed = Math.floor(minutesElapsed / frequency);

    var nextStopMinutes = (stopsElapsed + 1) * frequency;

    start.add(nextStopMinutes, "minutes");

    console.log(start.format("HH:mm"));
    /*
    // Prettify the employee start
    var empStartPretty = moment.unix(timeStart).format("MM/DD/YYYY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(timeStart, "X"), "months");
    console.log(empMonths);

    // Calculate the total billed rate
    var empBilled = empMonths * trainFrequency;
    console.log(empBilled);
    */

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        //$("<td>").text(empMonths),
        $("<td>").text(nextStopMinutes),
        $("<td>").text(nextStopMinutes)
    );

    // Append the new row to the table
    $("#time-table > tbody").append(newRow);
});


  