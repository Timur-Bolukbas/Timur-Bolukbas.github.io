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

    function createEnemy(x, y, speed, health, score) {
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
        game.changeIntegrity(health)
      };
      enemy.onProjectileCollision = function (){
        game.increaseScore(10); //increases score by 100 on projectile collision
        enemy.fadeOut(); //enemy fades out on projectile collision
        //enemy.shrink()
        //enemy.flyTo(x, y)
    };
  };

  function createReward(x, y, speed, health, score) {
      var reward = game.createGameItem("reward", 25); //CREATES YOUR reward GAME ITEM AND ADDS IT TO THE GAME
      var redSquare = draw.rect(50, 50, "blue"); //creates a red square and stores it in the var redSquare
      redSquare.x = -25; //offsets image from the hitzone by -25 horizontally
      redSquare.y = -25; //offsets image from the hitzone by -25 vertically
      reward.addChild(redSquare); //adds the red square as a child to our reward var
      reward.x = x; //x pos of reward
      reward.y = y; //y pos of reward
      game.addGameItem(reward); //adds the reward to the game
      reward.velocityX -= speed; //controlling how fast the reward moves on the x axis
      reward.rotationalVelocity = 7;
      reward.onPlayerCollision = function () {
        game.changeIntegrity(health)
      };
      reward.onProjectileCollision = function (){
        game.increaseScore(10); //increases score by 100 on projectile collision
        reward.fadeOut(); //reward fades out on projectile collision
        //reward.shrink()
        //reward.flyTo(x, y)
    };
  };
  function createLevel(x, y, speed) {
    var level = game.createGameItem("level", 25); //CREATES YOUR level GAME ITEM AND ADDS IT TO THE GAME
    var redSquare = draw.rect(50, 50, "yellow"); //creates a red square and stores it in the var redSquare
    redSquare.x = -25; //offsets image from the hitzone by -25 horizontally
    redSquare.y = -25; //offsets image from the hitzone by -25 vertically
    level.addChild(redSquare); //adds the red square as a child to our level var
    level.x = x; //x pos of level
    level.y = y; //y pos of level
    game.addGameItem(level); //adds the level to the game
    level.velocityX -= speed; //controlling how fast the level moves on the x axis
    level.rotationalVelocity = 7;
    level.onPlayerCollision = function () {
      reward.shrink();
      startLevel();
    };
  };

  createLevel(1200, groundY - 50, 3);

  createEnemy(400, groundY - 50, 3);
  createEnemy(800, groundY - 50, 10);
  createEnemy(1200, groundY - 50, 50);

  createReward(600, groundY - 50, 2, 3);
  createReward(900, groundY - 50, 3, 10);
  createReward(1200, groundY - 50, 4, 50);
    // BEGIN EDITING YOUR CODE HERE

    

    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel] // fetches the currentLevel from the levelData array and stores it in var level
      var levelObjects = level.gameItems //retrieve the array of gameItems and stores it in levelObjects

      for(i = 0; i < levelObjects.length; i++) {
        var element = levelObjects[i];

        if(element.type === "sawblade"){
          createObstacles(element.x, element.y, element.hitSize, element.damage);
        }
      }

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
