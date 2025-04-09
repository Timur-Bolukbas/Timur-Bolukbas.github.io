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
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    function createObstacles(x, y, hitSize, damage, image, scale, rotationalVelocity) {
      var hitZoneSize = hitSize; // Define the size of the hitzone and assign it to a variable
      var damageFromObstacle = damage; // Define the damage the obstacle causes and assign it to a variable
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // Create the obstacle hit zone using the size and damage as parameters and assign it to a variable
      obstacleHitZone.x = x; // Set x coordinate of the obstacle
      obstacleHitZone.y = y; // Set y coordinate of the obstacle
      game.addGameItem(obstacleHitZone); // Add the obstacle hit zone to the game
  
      var obstacleImage = draw.bitmap(image); // Draw the obstacle image and store it in obstacleImage
    
  
      // Apply scaling to the obstacle image
      obstacleImage.scaleX = scale; // Scale the width
      obstacleImage.scaleY = scale; // Scale the height
  
      obstacleImage.x = -25 * scale; // Offset the image horizontally, adjusted for scale
      obstacleImage.y = -25 * scale; // Offset the image vertically, adjusted for scale
      obstacleHitZone.addChild(obstacleImage); // Add the obstacle image as a child to the obstacle hit zone
  
      obstacleHitZone.rotationalVelocity = rotationalVelocity; // Set rotational velocity of the obstacle
  }

    function createEnemy(x, y, speed, health, score, image, scale) {
      var enemy = game.createGameItem("enemy", 25); // Creates the enemy game item
      var enemyImage = draw.bitmap(image); // Creates the enemy image
      scale = scale || 1; // Default scale to 1 if not provided
  
      // Apply scaling to the enemy image
      enemyImage.scaleX = scale; // Scale the width
      enemyImage.scaleY = scale; // Scale the height
  
      enemyImage.x = -50 * scale; // Offset the image horizontally, adjusted for scale
      enemyImage.y = -59 * scale; // Offset the image vertically, adjusted for scale
      enemy.addChild(enemyImage); // Adds the enemy image as a child to the enemy game item
  
      enemy.x = x; // X position of the enemy
      enemy.y = y; // Y position of the enemy
      game.addGameItem(enemy); // Adds the enemy to the game
      enemy.velocityX -= speed; // Controls how fast the enemy moves on the x-axis
  
      enemy.onPlayerCollision = function () {
          game.changeIntegrity(health); // Reduces player health on collision
      };
  
      enemy.onProjectileCollision = function () {
          game.increaseScore(score); // Increases score on projectile collision
          enemy.fadeOut(); // Enemy fades out on projectile collision
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
      level.shrink();
      startLevel();
    };
  };

    // BEGIN EDITING YOUR CODE HERE

    

    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel] // fetches the currentLevel from the levelData array and stores it in var level
      var levelObjects = level.gameItems //retrieve the array of gameItems and stores it in levelObjects

      for(i = 0; i < levelObjects.length; i++) {
        var element = levelObjects[i];

        if(element.type === "sawblade"){ // checks the type key:value of the gameItems objects
          createObstacles(element.x, element.y, element.hitSize, element.damage, element.image, element.scale, element.rotationalVelocity); //if the condition is true, it will call the relevant function
        }
        if(element.type === "enemy"){ // checks the type key:value of the gameItems objects
          createEnemy(element.x, element.y, element.speed, element.health, element.score, element.image, element.scale); //if the condition is true, it will call the relevant function
        }
        if(element.type === "reward"){ // checks the type key:value of the gameItems objects
          createReward(element.x, element.y, element.speed, element.health); //if the condition is true, it will call the relevant function
        }
        if(element.type === "level"){ // checks the type key:value of the gameItems objects
          createLevel(element.x, element.y, element.speed); //if the condition is true, it will call the relevant function
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
