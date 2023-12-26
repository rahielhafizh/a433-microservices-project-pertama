// Importing the Gulp module
var gulp = require("gulp");

// Importing build plugins for task automation
var concat = require("gulp-concat"); // Concatenates multiple files into one
var uglify = require("gulp-uglify"); // Minifies JavaScript files
var rename = require("gulp-rename"); // Renames files

// Gulp task to concatenate, minify, and rename JavaScript files
gulp.task("scripts", function () {
  return gulp
    .src([
      "public/javascripts/vendor/angular.min.js", // AngularJS library
      "public/javascripts/vendor/angular-*.min.js", // AngularJS additional modules
      "public/javascripts/*.js", // Custom JavaScript files
    ])
    .pipe(concat("dist.js")) // Concatenates all source files into a single file 'dist.js'
    .pipe(rename("dist.min.js")) // Renames the concatenated file to 'dist.min.js'
    .pipe(uglify()) // Minifies the JavaScript code
    .pipe(gulp.dest("public/javascripts/dist/")); // Saves the final minified file to the specified directory
});

// Default Gulp task that depends on the 'scripts' task
gulp.task("default", ["scripts"]);
