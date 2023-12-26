// Importing the 'express' framework and the 'os' module
var express = require("express");
var os = require("os");

// Creating an instance of the Express Router
var router = express.Router();

// Getting network interfaces information from the operating system
var ifaces = os.networkInterfaces();

// Initializing variables to store the local address and environment information
var localAddress = "";
var environment =
  process.env.NODE_ENV === "production" ? "production" : "development";
var environmentNotice =
  environment === "production" ? "" : environment + " environment";

// Iterating through the network interfaces to find the local IPv4 address
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    // Skipping over internal and non-IPv4 addresses
    if (
      "IPv4" !== iface.family ||
      iface.internal !== false ||
      localAddress !== ""
    ) {
      return;
    }
    localAddress = iface.address;
  });
});

/* GET home page. */
// Handling the GET request for the root path
router.get("/", function (req, res, next) {
  // Rendering the 'index' view with provided data
  res.render("index", {
    title: "Daftar Item", // Setting the title for the view
    environment: environment, // Passing the environment information to the view
    environmentNotice: environmentNotice, // Passing the environment notice to the view
    localAddress: localAddress, // Passing the local address to the view
  });
});

// Exporting the router for use in other modules
module.exports = router;
