var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY, hitSize: 25, damage: 10, image: "img/lunch.png", scale: 0.1, rotationalVelocity: 10},
          { type: "sawblade", x: 1600, y: groundY, hitSize: 25, damage: 10, image: "img/lunch.png", scale: 0.1, rotationalVelocity: 10 },
          { type: "sawblade", x: 1200, y: groundY, hitSize: 25, damage: 10, image: "img/lunch.png", scale: 0.1, rotationalVelocity: 10 },
          
          { type: "sawblade", x: 1800, y: groundY - 70, hitSize: 25, damage: 10, image: "img/trash.png", scale: 0.1, rotationalVelocity: 0 },
          { type: "sawblade", x: 700, y: groundY - 70, hitSize: 25, damage: 10, image: "img/trash.png", scale: 0.1, rotationalVelocity: 0 },

          { type: "enemy", x: 900, y: groundY - 70, speed: 1, health: -3, score : 10, image: "img/packet.png", scale: 0.3},
          { type: "enemy", x: 1200, y: groundY - 70, speed: 1, health: -10, score : 10, image: "img/packet.png", scale: 0.3},
          { type: "enemy", x: 1500, y: groundY - 70, speed: 1, health: -50, score : 10, image: "img/packet.png", scale: 0.3},
          

          { type: "reward", x: 1200, y: groundY - 50, speed : 4, health: 50 },

          { type: "level", x: 1200, y: groundY - 50, speed : 3 }
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
