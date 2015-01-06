"use strict";

class GameLoopManager

  constructor: (updateCallback) ->
    @_currentTime = new Date().getTime()
    @_accumulator = 0.0
    @updateCallback = updateCallback

  update: ->
    newTime = new Date().getTime()
    frameTime = newTime - @_currentTime

    if frameTime  > 250
      frameTime = 250

    @_currentTime = newTime
    @_accumulator += frameTime

    while @_accumulator >= 15
      @updateCallback()
      @_accumulator -= 15


module.exports.GameLoopManager = GameLoopManager