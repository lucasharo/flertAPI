﻿module.exports = function (io) {
    var sockets = [];      

    module.novoUsuario = function (socket){
        sockets.push(socket);
        
        console.log('connection');
        
        socket.emit('connect');
    }
    
    module.login = function (socket, login) {
        for (var i = 0; i < sockets.length; i++) {
            if (sockets[i].id === socket.id) {
                sockets[i].login = login;
                console.log("Login");
            }
        }
    }
    
    module.mensagem = function (socket, mensagem) {
        socket.broadcast.emit('mensagem', { nickname: socket.login, mensagem: mensagem });
    }
    
    module.escrevendo = function (socket) {
        socket.broadcast.emit('escrevendo', { username: socket.login });
    }
    
    module.paraEscrevendo = function (socket) {
        socket.broadcast.emit('paraEscrevendo', { username: socket.login });
    }

    return module;
}

