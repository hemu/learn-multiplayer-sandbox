window.exports.mGameManager = (function () {
  "use strict";

  function GameLoopManager(updateCallback){
    this._currentTime = new Date().getTime(),
    this._accumulator = 0.0,
    this.updateCallback = updateCallback;
  }

  GameLoopManager.prototype.update = function () {
    var newTime = new Date().getTime(), 
        frameTime = newTime - this._currentTime;

    if (frameTime  > 250) {
      frameTime = 250;
    }

    this._currentTime = newTime;
    this._accumulator += frameTime;

    while (this._accumulator >= 15) {
      this.updateCallback();
      this._accumulator -= 15;
    }
  }

  return {
    GameLoopManager: GameLoopManager
  }

}());