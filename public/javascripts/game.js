$(function () {

  "use strict";
  Number.prototype.map = function ( in_min , in_max , out_min , out_max ) {
    var curVal = ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
    if(curVal < out_min) curVal = out_min;
    else if(curVal > out_max) curVal = out_max;
    return curVal;
  }

  // var canvas = document.getElementById('gameCanvas'), ctxCanvas = canvas.getContext('2d'), keyboard = new THREEx.KeyboardState(), ships = preloadShips(), entityImage = new Image();
  // entityImage.src = '../images/entity.png';

  window.addEventListener("keydown", function(e) {
      // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
      }
  }, false);

  var playerImg = new Image();
  playerImg.src = '../images/player.png';

  var canvas = document.getElementById('gameCanvas'), 
      ctxCanvas = canvas.getContext('2d'), 
      keyboard = new THREEx.KeyboardState();

  window.addEventListener('resize', resizeCanvas, false);

  GarageServerIO.initializeGarageServer('http://localhost:3000', {
      logging: true,
      onReady: startGame,
      onUpdatePlayerPrediction: GamePhysics.getNewPlayerState,
      onInterpolation: GamePhysics.getInterpolatedState
  });

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  var prevPlayerStates = {};
  var doneInit = false;
  var newX = 0,
      newY = 0
  var oldPlayerState = null;
  var movePercentFactorX = 0.1;
  var movePercentFactorY = 0.1;
  var deltaX = 0;
  var deltaY = 0;
  var maxDelta = 200;
  var minDelta = 0.01;

  function startGame() {
    GameLoop.start(
      //Render Loop
      function (delta) {
        ctxCanvas.clearRect(0, 0, canvas.width, canvas.height);
        // ctxCanvas.font = "40pt Helvetica";
        // ctxCanvas.fillText('GarageServer.IO Demo', 10, canvas.height - 50);

        ctxCanvas.fillStyle = 'white';
        var playerStates = GarageServerIO.getPlayerStates(),
            entityStates = GarageServerIO.getEntityStates();
        // entityStates.forEach(function (entity) {
        //   drawRotatedImage(entity.state.ang, entity.state.x, entity.state.y, entityImage);
        // });

        playerStates.forEach(function (player) {
          oldPlayerState = prevPlayerStates[player.id];
          if(oldPlayerState != undefined){
            deltaX = player.state.x - oldPlayerState.x;
            deltaY = player.state.y - oldPlayerState.y;
            console.log(deltaX);
            if(Math.abs(deltaX) > minDelta){
              movePercentFactorX = Math.abs(deltaX).map(0, maxDelta, 0.1, 1.0);
              newX = oldPlayerState.x + deltaX*movePercentFactorX;
            }
            else {
              console.log("delta not big enough ", deltaX);
              newX = player.state.x;
            }
            if(Math.abs(deltaY) > minDelta) {
              movePercentFactorY = Math.abs(deltaY).map(0, maxDelta, 0.1, 1.0);
              newY = oldPlayerState.y + deltaY*movePercentFactorY;
            }
            else{
              newY = player.state.y;
            }
          }
          else{
            newX = player.state.x;
            newY = player.state.y;
            var prevPlayerState = {};
            prevPlayerState.x = newX;
            prevPlayerState.y = newY;
            prevPlayerStates[player.id] = prevPlayerState;
          }
          drawPlayer(newX, newY, playerImg);
          prevPlayerStates[player.id].x = newX;
          prevPlayerStates[player.id].y = newY;
        });

      },
      //Update Loop
      function () {
        if (keyboard.pressed('left')) {
          GarageServerIO.addInput('left');
        }
        if (keyboard.pressed('right')) {
          GarageServerIO.addInput('right');
        }
        if (keyboard.pressed('up')) {
          GarageServerIO.addInput('up');
        }
        if (keyboard.pressed('down')) {
          GarageServerIO.addInput('down');
        }
        ctxCanvas.clearRect(0, 0, canvas.width, canvas.height);
        // if (keyboard.pressed('space')) {
        //   GarageServerIO.addInput('space');
        // }
      }
    );
  }

  // function drawRotatedImage(angle, x, y, img) {
  //     ctxCanvas.save();
  //     ctxCanvas.translate(x + img.width / 2, y + img.height / 2);
  //     ctxCanvas.rotate(angle * (Math.PI / 180));
  //     ctxCanvas.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);
  //     ctxCanvas.restore();
  // }

  function drawPlayer(x, y, img){
    ctxCanvas.save();
    ctxCanvas.translate(x + img.width / 2, y + img.height / 2);
    ctxCanvas.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);
    ctxCanvas.restore();
  }

  // function preloadShips() {
  //   var ships = [];
  //   for(var i = 0; i < 10; i ++) {
  //       var img = new Image();
  //       img.src = '../images/' + i + '.png';
  //       ships.push(img);
  //   }
  //   return ships;
  // }
});