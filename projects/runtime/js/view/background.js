var background = function (window) {
  "use strict";

  window.opspark = window.opspark || {};
  var draw = window.opspark.draw;
  var createjs = window.createjs;

  /*
   * Create a background view for our game application
   */
  window.opspark.makeBackground = function (app, ground) {
    /* Error Checking - DO NOT DELETE */
    if (!app) {
      throw new Error("Invalid app argument");
    }
    if (!ground || typeof ground.y == "undefined") {
      throw new Error("Invalid ground argument");
    }

    // useful variables
    var canvasWidth = app.canvas.width;
    var canvasHeight = app.canvas.height;
    var groundY = ground.y;

    // container which will be returned
    var background;

    //////////////////////////////////////////////////////////////////
    // ANIMATION VARIABLES HERE //////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    // TODO (several):
    var tree;
    var buildings = [];

    // called at the start of game and whenever the page is resized
    // add objects for display in background. draws each image added to the background once
    function render() {
      background.removeAllChildren();

      // TODO 1:
      // this currently fills the background with an obnoxious yellow;
      // you should modify both the height and color to suit your game
     
      var backgroundFill = draw.rect(canvasWidth, groundY, "yellow"); //draws a rectangle and stores it in the var backgroundFill
      background.addChild(backgroundFill); //adds the background rectangle to the background container to make it visible

      // TODO 2: - Add a moon and starfield
     

      var moon = draw.bitmap("img/north.png"); //creates a bitmpa object using the moon image and stores it in the moon variable
      moon.x = canvas.width /2; // sets the moon x position
      moon.y = canvas.height - canvasHeight / 1.055; //sets the moons y position
      moon.scaleX = 1.5; //scales the moons width
      moon.scaleY = 1.5; //scales the moons height
      background.addChild(moon); //add the moon to the background container

      for (var i = 0; i < 100; i++) {
        var circle = draw.circle(10, "white", "LightGray", 2); //create a circle with a specified radius, border color, fill color,alpha_
        circle.x = canvasWidth * Math.random(); // set random x pos within canvas width
        circle.y = groundY * Math.random(); // set random y pos within groundY range
        background.addChild(circle); //adds the star to the background container
      }

      // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
      for (var i = 0; i < 5; i++) {
        var walkImage = draw.bitmap("img/walk.png");
        walkImage.x = 300 * i; // Space out the images horizontally
        walkImage.y = groundY - 160; // Position above the ground
        walkImage.scaleX = 0.5; // Scale down the image
        walkImage.scaleY = 0.5; // Scale down the image
        background.addChild(walkImage);
        buildings.push(walkImage); // Add to the buildings array for animation
      }
      // TODO 3: Part 1 - Add a tree
      
      //tree = draw.bitmap("img/tree.png"); // creates a bitmap for the tree image, stores it in var tree
      //tree.x = canvasWidth; //place the tree off-screen to the right
      //tree.y = groundY - 225; //places the tree above the ground
      //background.addChild(tree); //add the tree to the background container
      
    } // end of render function - DO NOT DELETE

    // Perform background animation
    // called on each timer "tick" - 60 times per second
    function update() {
      // useful variables
      var canvasWidth = app.canvas.width;
      var canvasHeight = app.canvas.height;
      var groundY = ground.y;

      // TODO 3: Part 2 - Move the tree!
      /* tree.x -= 3; //moves the tree to the left by subracting 3 from its current x pos
      if (tree.x < -200) {
          tree.x = canvasWidth - 100;
      }
      */

      // TODO 4: Part 2 - Parallax
      for(var i = 0; i < buildings.length; i++) {
        var building = buildings[i]; //the individual index of the buildings array stored in a var
        building.x -= 1; //subtracts 1 from the x pos
        if (building.x < -100) {
          building.x = canvasWidth; //checks if the x pos of the building is less than -100, and if it is, then it resets the building
        }
      
      } 
    } // end of update function - DO NOT DELETE
    

    /* Make a createjs Container for the background and let it know about the render and upate functions*/
    background = new createjs.Container();
    background.resize = render;
    background.update = update;

    /* make the background able to respond to resizing and timer updates*/
    app.addResizeable(background);
    app.addUpdateable(background);

    /* render and return the background */
    render();
    return background;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = background;
}
