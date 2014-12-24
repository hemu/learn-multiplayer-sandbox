var garageServer = require('./lib/garageserver/garageserver.io');
var gamePhysics = require('./shared/core');

exports = module.exports = Game;

function Game (sockets) {
  this.physicsInterval = 15;
  this.physicsDelta = this.physicsInterval / 1000;
  this.physicsIntervalId = 0;

  this.gameServer = garageServer.createGarageServer(sockets, 
      {
        logging: true,
        interpolation: true,
        clientSidePrediction: true,
        smoothingFactor: 0.2
      });
}

Game.prototype.start = function () {
  var self = this;
  this.physicsIntervalId = setInterval(
                               function() { self.update(); }, 
                               this.physicsInterval
                           );
  this.gameServer.start();
};

Game.prototype.update = function () {
  // ---- update players ----
  var players = this.gameServer.getPlayers(),
      entities = this.gameServer.getEntities(),
      self = this;

  players.forEach(function (player) {
    var newState = gamePhysics.getNewPlayerState(
                          player.state,
                          player.inputs,
                          self.physicsDelta,
                          self.gameServer);
    self.gameServer.updatePlayerState(player.id, newState);
  });

  // ---- update Entities ----
  for (var i = entities.length - 1; i >= 0; i--) {
    var entity = entities[i],
      newState = gamePhysics.getNewEntityState(entity.state, self.physicsDelta);

    self.gameServer.updateEntityState(entity.id, newState);
    // if (newState.x < -200 || newState.y < -200 || newState.x > 2000 || newState.y > 2000) {
    //   self.gameServer.removeEntity(entity.id);
    // } else {
    //   self.gameServer.updateEntityState(entity.id, newState);
    // }
  }
};