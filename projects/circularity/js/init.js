var init = function (window) {
  "use strict";
  var draw = window.opspark.draw,
    physikz = window.opspark.racket.physikz,
    app = window.opspark.makeApp(),
    canvas = app.canvas,
    view = app.view,
    fps = draw.fps("#000");

  window.opspark.makeGame = function () {
    window.opspark.game = {};
    var game = window.opspark.game;

    ////////////////////////////////////////////////////////////
    ///////////////// PROGRAM SETUP ////////////////////////////
    ////////////////////////////////////////////////////////////

    // TODO 1 : Declare and initialize our variables
    var circle; //holds a single circle when creating circles
    var circles = []; //stores all circles in an array
    // TODO 2 : Create a function that draws a circle
    function drawCircle() {
      //new function
      circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
      physikz.addRandomVelocity(circle, canvas, 50, 100); //the 10, 10 at the end is to enlarge the speed of the circles in x, y
      view.addChild(circle);
      circles.push(circle);
    }

    // TODO 3 / 7 : Call the drawCircle() function
    /*
    drawCircle(); //calling the new function (Obsolete)
    drawCircle(); //calling the new function
    drawCircle(); //calling the new function
    drawCircle(); //calling the new function
    drawCircle(); //calling the new function
    */
    for (var i = 0; i < 100; i++) {
      //Initializing the var under for at 0, and it is setting a max amount of circles of 100. The i++ is changing the created var each time it runs to add one.
      drawCircle(circles[i]); //calls drawCircle with the paramter of circles[i] which increases every time it runs, fulfilling the loop until 100.
    }

    ////////////////////////////////////////////////////////////
    ///////////////// PROGRAM LOGIC ////////////////////////////
    ////////////////////////////////////////////////////////////

    /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
    function update() {
      // TODO 4 : Update the circle's position //
      /*
      physikz.updatePosition(circles[0]); (all obsolete)
      physikz.updatePosition(circles[1]);
      physikz.updatePosition(circles[2]);
      physikz.updatePosition(circles[3]);
      physikz.updatePosition(circles[4]);
        */
      // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
      /*
      game.checkCirclePosition(circles[0]);
      game.checkCirclePosition(circles[1]);
      game.checkCirclePosition(circles[2]);
      game.checkCirclePosition(circles[3]);
      game.checkCirclePosition(circles[4]);
      */
      // TODO 9 : Iterate over the array
      for (var i = 0; i < circles.length; i++) {
        //creates a var i that runs as long as i is less than the length of the array, and increases every time it runs
        physikz.updatePosition(circles[i]); //calling this function
        game.checkCirclePosition(circles[i]); //calling this function
      }
    }

    /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
    game.checkCirclePosition = function (circle) {
      if (circle.x > canvas.width) {
        // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
        circle.x = 0;
      }

      // TODO 6 : YOUR CODE STARTS HERE //////////////////////
      if (circle.x < 0) {
        //checks if the circles go off the left side, which is less than 0, then brings it to right side
        circle.x = canvas.width;
      }
      if (circle.y > canvas.height) {
        //checking what the length of the canvas is and bringing the circle back to 0
        circle.y = 0;
      }
      if (circle.y < 0) {
        //If the height of the circle goes below 0, it brings it back to the top
        circle.y = canvas.height;
      }
      // YOUR TODO 6 CODE ENDS HERE //////////////////////////
    };

    /////////////////////////////////////////////////////////////
    // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
    /////////////////////////////////////////////////////////////

    view.addChild(fps);
    app.addUpdateable(fps);

    game.circle = circle;
    game.circles = circles;
    game.drawCircle = drawCircle;
    game.update = update;

    app.addUpdateable(window.opspark.game);
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = init;
}
