mPlayer = require('../entity/player')
mGameManager = require('./game-manager')
Phaser = require('../vendor/phaser.min.js')

class Game

  constructor: ->
    @game = null

  initialize: ->
    # Phaser game instance
    console.log Phaser
    @game = new Phaser.Game(800, 600, 
                         Phaser.AUTO, 
                         '')

    @player = new mPlayer.Player
    @gameLoopManager = new mGameManager.GameLoopManager(@updateState);
    
    # main Phaser state
    playState =
      preload: =>
        console.log()
        @game.load.image('logo', 'phaser.png');

      create: => 
        logo = @game.add.sprite(@game.world.centerX, 
                                   @game.world.centerY,
                                   'logo')
        logo.anchor.setTo 0.5, 0.5

      update: => 
        @gameLoopManager.update()

    @game.state.add 'play', playState

  start: ->
    @game.state.start('play')

  # main udpate loop for game
  # this is handed off to GameLoopManager, which might
  # call this multiple times during one phaser update() call
  # if phaser update() time delta falls behind
  updateState: ->
  

module.exports.Game = Game