window.exports.mPlayer = (function(exports) {

  function Player() {
    this.x = 20;
    this.y = 100;
  }

  Player.prototype.speak = function () {
    console.log("woof!");
  }

  return {
    Player: Player
  }

}());