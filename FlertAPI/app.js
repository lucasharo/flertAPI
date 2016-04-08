var app = require('express')(),
http = require('http').Server(app),
io = require('socket.io')(http),
chatCtrl = require('./controller/chatController')(io);

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

io.on('connection', function (socket) {
    chatCtrl.novoUsuario(socket);
    
    socket.on('login', function (login) {
       chatCtrl.login(socket, login);
    });

    socket.on('mensagem', function (mensagem) {
        chatCtrl.mensagem(socket, mensagem);
    });

    socket.on('escrevendo', function () {
        chatCtrl.escrevendo(socket);
    });

    socket.on('paraEscrevendo', function () {
        chatCtrl.paraEscrevendo(socket);
    });
});

http.listen(3000, function () {
    console.log('listening on *: 3000');
});