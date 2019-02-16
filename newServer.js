// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 5500;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var tables = [{}, {}, {}, {}];

var waitingList = [];


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "main.html"));
});

app.get("/make", function (req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/view", function (req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
  console.log(tables);
});

// Displays all tables
app.get("/api/waitlist", function (req, res) {
  return res.json(waitingList);
});

app.get("/api/tables", function (req, res) {
  return res.json(tables);
});


// Create New Reservation - takes in JSON input
app.post("/api/tables", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  tables.push(newReservation);

  res.json(newReservation);
  console.log(newReservation);
});

app.post("/api/waitlist", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newWaitingList = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  waitingList.push(newWaitingList);

  res.json(newWaitingList);
  console.log(newWaitingList);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});