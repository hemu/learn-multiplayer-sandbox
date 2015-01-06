mPlayer = require('../entity/player')
Phaser = require('../vendor/phaser.min.js')

class Game

  constructor: ->
    @game = null

  initialize: ->
    # Phaser game instance
    @game = new Phaser.Game(800, 600, 
                         Phaser.AUTO, 
                         '')

    @player = new mPlayer.Player
    
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
  updateState: ->
  

module.exports.Game = Game