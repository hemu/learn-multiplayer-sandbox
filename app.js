var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    io = require('socket.io'),
    Game = require('./game.js'),
    app = express();

// Express Configuration
// ---------------------
// Use port 3000, so local testing happens at http://localhost:3000.
app.set('port', process.env.PORT || 3000);
// Configure for server side templating engine (currently using jade).
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// Use express.static middleware to serve static assets from whatever folder.
app.use(express.static(path.join(__dirname, 'client/assets/images')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'shared')));

/*
app.configure('development', function () {
    app.use(express.errorHandler());
});
*/
// Routing
// -------
// Paths have been specified in routes module, e.g. routes.index
// is specified in routes/index.js.
app.get('/', routes.index);

// Server
// ------
// Create main http server wih express app.
var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

// Socket.io
// ---------
// Create socket server that sits on top of http/express server.
var sockets = io.listen(server);

// Game Server
// -----------
// uses garageserver.io and needs socket.io instance
var game = new Game(sockets);
game.start();