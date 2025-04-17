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
          { type: "obstacle", x: 900, y: groundY - 40, hitSize: 25, health: -30, image: "img/lunch.png", scale: 0.1, rotationalVelocity: 0 }, // A lunchbox obstacle that deals 30 damage on player collision
          { type: "obstacle", x: 2800, y: groundY - 40, hitSize: 25, health: -30, image: "img/lunch.png", scale: 0.1, rotationalVelocity: 0 },// A second lunchbox obstacle placed further along the path
          { type: "obstacle", x: 2700, y: groundY - 40, hitSize: 25, health: -30, image: "img/lunch.png", scale: 0.1, rotationalVelocity: 0 },// A third lunchbox obstacle very close to the second, creating a quick obstacle cluster
          
          { type: "obstacle", x: 2200, y: groundY - 70, hitSize: 25, health: -40, image: "img/trash.png", scale: 0.1, rotationalVelocity: 0 },// A trash can obstacle that deals more damage than the lunchboxes (40)
          { type: "obstacle", x: 700, y: groundY - 70, hitSize: 25, health: -40, image: "img/trash.png", scale: 0.1, rotationalVelocity: 0 },// Another trash can obstacle closer to the beginning of the level

          { type: "enemy", x: 900, y: groundY - 70, speed: 1, health: -30, score : 10, image: "img/packet.png", scale: 0.3},// First enemy: packet image, causes -30 integrity on contact, 10 points on defeat
          { type: "enemy", x: 1900, y: groundY - 70, speed: 1, health: -30, score : 10, image: "img/packet.png", scale: 0.3},// Second packet enemy, placed farther into the level
          { type: "enemy", x: 1500, y: groundY - 70, speed: 1, health: -30, score : 10, image: "img/packet.png", scale: 0.3},// Third packet enemy positioned at mid-level

          { type: "enemy", x: 1200, y: groundY - 70, speed: 1, health: -40, score : 10, image: "img/ap.png", scale: 0.07},// First AP icon enemy, smaller in scale, but behaves like packet enemy
          { type: "enemy", x: 2000, y: groundY - 70, speed: 1, health: -40, score : 10, image: "img/ap.png", scale: 0.07},// Second AP icon enemy, placed further down the path
          

          { type: "reward", x: 1000, y: groundY - 50, speed : 4, health: 20, score: 10, image: "img/pencil.png", scale: 0.1},// Pencil reward: increases player integrity by 20, grants 10 points
          { type: "reward", x: 1800, y: groundY - 80, speed : 4, health: 20, score: 20, image: "img/pen.png", scale: 0.05},// Pen reward: same healing value, but gives more score (20)

          { type: "level", x: 3000, y: groundY - 50, speed : 3 } //start of new level
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
