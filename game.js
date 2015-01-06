var gamePhysics = require('./shared/core');

function Game (sockets) {
  this.updateInterval = 20;
  this.broadcastInterval = 100;
}

Game.prototype.start = function () {
  var self = this;
  setInterval( function() { self.update(); }, 
               self.updateInterval
             );
  setInterval( function() { self.broadcast(); }, 
               self.broadcastInterval
             );
};

// Update loop
// -----------
// Advance player and entity states based on any new inputs.
// Entities are any objects with state that will be simulated by server (e.g. projectiles).
// Players are special types of entities that can receive input from client.
Game.prototype.update = function () {
  // process client inputs

  // run physics logic

  // run game logic

  // update game state
};

Game.prototype.broadcast = function () {
}

// module.exports is what is returned if some other file require() this file.
// So assigning Game to module.exports means Game will be exposed and returned
// when some other file does require(game.js).
exports = module.exports = Game;