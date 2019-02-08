// in class example

var now = moment();
var start = moment("05:00", "HH mm");
var frequency = 10;

var minutesElapsed = now.diff(start, "minutes");

// route 1
// var lastStopMin = minutesElapsed % frequency;

//route 2
var stopsElapsed = Math.floor(minutesElapsed / frequency);

var nextStopMinutes = (stopsElapsed + 1) * frequency;

start.add(nextStopMinutes, "minutes");

console.log(start.format("HH:mm"));