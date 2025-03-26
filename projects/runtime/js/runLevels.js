var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    function createObstacles (x, y, hitSize, damage) {
      var hitZoneSize = hitSize;
      var damageFromObstacle = damage;
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      obstacleHitZone.x = x;
      obstacleHitZone.y = y;
      game.addGameItem(obstacleHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png")
      obstacleHitZone.rotationalVelocity = 10; //sets rotational velocity of the enemy
      obstacleHitZone.addChild(obstacleImage); //draws the sawblade image and stores it in the obstacleImage
      obstacleImage.x = -25; //position the image in the hot zones x value by moving it up to the left 25 units
      obstacleImage.y = -25; //position the image on the hit zone y value by moving it up 25 units
    }
    createObstacles(400,groundY, 25, 10);
    createObstacles(800,groundY, 25, 10); 
    createObstacles(1200,groundY, 25, 10);

    function createEnemy(x, y, speed) {
      var enemy = game.createGameItem("enemy", 25); //CREATES YOUR ENEMY GAME ITEM AND ADDS IT TO THE GAME
      var redSquare = draw.rect(50, 50, "red"); //creates a red square and stores it in the var redSquare
      redSquare.x = -25; //offsets image from the hitzone by -25 horizontally
      redSquare.y = -25; //offsets image from the hitzone by -25 vertically
      enemy.addChild(redSquare); //adds the red square as a child to our enemy var
      enemy.x = x; //x pos of enemy
      enemy.y = y; //y pos of enemy
      game.addGameItem(enemy); //adds the enemy to the game
      enemy.velocityX -= speed; //controlling how fast the enemy moves on the x axis
      enemy.rotationalVelocity = 5;
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10)
      };
      enemy.onProjectileCollision = function (){
        game.increaseScore(100); //increases score by 100 on projectile collision
        enemy.fadeOut(); //enemy fades out on projectile collision
        //enemy.shrink()
        //enemy.flyTo(x, y)
    };
  };

  createEnemy(400, groundY - 50, 3);
  createEnemy(800, groundY - 50, 10);
  createEnemy(1200, groundY - 50, 50);
    // BEGIN EDITING YOUR CODE HERE

    

    function startLevel() {
      // TODO 13 goes below here



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
