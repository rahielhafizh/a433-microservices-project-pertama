// Importing necessary modules and packages
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var bodyParser = require("body-parser");
var lessMiddleware = require("less-middleware");
var MongoClient = require("mongodb").MongoClient,
  assert = require("assert");

// Setting up MongoDB connection parameters based on environment variables
var host = process.env.DB_HOST ? process.env.DB_HOST : "localhost";
var url = "mongodb://" + host + ":27017/accumulator";
var db;

// Importing the 'index' route module
var index = require("./routes/index");

// Setting the process title
process.title = "ca-app";

// Setting the environment based on the NODE_ENV environment variable
var environment = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
environment = environment.trim();
console.log("NODE_ENV: " + environment);

// Creating an instance of the Express application
var app = express();

// Connecting to MongoDB
MongoClient.connect(url, function (err, mongoDb) {
  assert.equal(null, err);
  console.log("Connected to database");
  db = mongoDb;
});

// Configuring view engine and middleware for development environment
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
if (environment === "development") {
  app.locals.pretty = true;
}

// Configuring middleware for logging, parsing requests, and serving static files
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(lessMiddleware(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

// Using the 'index' route module for the root path
app.use("/", index);

// Function to insert a document into the MongoDB collection
var insertDocument = function (db, document, callback) {
  var collection = db.collection("documents");
  collection.insertOne(document, function (err, result) {
    callback(err, JSON.stringify(result.ops[0]));
  });
};

// Function to find all documents in the MongoDB collection
var findAllDocuments = function (db, callback) {
  var collection = db.collection("documents");
  collection.find({}).toArray(function (err, result) {
    if (result) {
      result = result.reverse();
    }
    callback(err, result);
  });
};

// Endpoint to insert a message into the MongoDB collection
app.post("/api", function (req, res) {
  var data = req.body;
  insertDocument(db, data, function (err, result) {
    res.status(201).send(result);
  });
});

// Endpoint to get messages from the MongoDB collection
app.get("/api", function (req, res) {
  findAllDocuments(db, function (err, result) {
    res.send(result);
  });
});

// Handling 404 errors by forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler for development environment
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = environment === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Exporting the Express application
module.exports = app;
