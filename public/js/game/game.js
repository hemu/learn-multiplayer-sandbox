window.exports.mGame = (function() {

  var mPlayer = window.exports.mPlayer;
  var mGameManager = window.exports.mGameManager;

  function Game(){
    this._game;
  }

  Game.prototype.initialize = function() {
    this._game = new Phaser.Game(800, 600, 
                           Phaser.AUTO, 
                           ''
                           );

    // var playerImg = new Image();
    // playerImg.src = '../images/player.png';

    var player = new mPlayer.Player();
    var gameLoopManager = new mGameManager.GameLoopManager(updateState);
    
    var self = this;
    var playState = {
      preload: function preload () {
        self._game.load.image('logo', 'images/phaser.png');
      },
      create: function create () {
        var logo = self._game.add.sprite(self._game.world.centerX, 
                                   self._game.world.centerY,
                                   'logo');
        logo.anchor.setTo(0.5, 0.5);
      },
      update: function update() {
        gameLoopManager.update()
      }
    }
    this._game.state.add('play', playState);
  }

  Game.prototype.start = function() {
    this._game.state.start('play');
  }



  // main udpate loop for game
  // this is handed off to GameLoopManager, which might
  // call this multiple times during one phaser update() call
  // if phaser update() time delta falls behind
  var updateState = function() {    
  
  }

  return {
    Game : Game
  }

  // function initInput(){
  //   window.addEventListener("keydown", function(e) {
  //       // space and arrow keys
  //       if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
  //           e.preventDefault();
  //       }
  //   }, false);
  // }

}());