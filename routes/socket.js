var io = require('socket.io');

exports.initialize = function(server){
    io = io.listen(server);
    var usernames = [];

    io.sockets.on('connection', function(socket){
        //receiver of message 
        // socket.on('message', function(message){

        //     message = JSON.parse(message);

        //    if(message.type == "userMessage"){
        //         socket.broadcast.send(JSON.stringify(message));
        //         message.type = "myMessage";
        //         socket.send(JSON.stringify(message));
        //     }
        // });

        socket.on('new user', function(data, callback){
            if(usernames.indexOf(data) != -1){
                callback(false);
            }else{
                callback(true);
                //save the username to the socket for retrieval
                socket.username = data;
                usernames.push(socket.username);
                io.sockets.emit('usernames', usernames);
            }
        });

        socket.on('sendMessage', function(data){
            //retrieve the username saved in the socket
            io.sockets.emit('new message', {message: data, username: socket.username})
        });

        socket.on('disconnect', function(data){
            if(!socket.username) return;
            usernames.splice(usernames.indexOf(socket.username), 1);
            io.sockets.emit('usernames', usernames);
        });
    });
};
