var io = require('socket.io');

exports.initialize = function(server){
    io = io.listen(server);
    var usernames = {};

    io.sockets.on('connection', function(socket){
        socket.on('new user', function(data, callback){
            if(data in usernames){
                callback(false);
            }else{
                callback(true);
                //save the username to the socket for retrieval
                socket.username = data;
                usernames[socket.username] = socket.id;
                io.sockets.emit('usernames', Object.keys(usernames));
            }
        });

        socket.on('sendMessage', function(data, callback){
            var msg = data.trim();
            if(msg.substr(0,3) === "/w "){
                msg = msg.substr(3);
                var space = msg.indexOf(" ");
                if( space !== 1){
                    var name = msg.substr(0, space);
                    msg = msg.substr(space+1);
                    if(name in usernames){
                        // to send the message to specific socket id of users                         
                        io.sockets.connected[usernames[name]].emit('new message', {message: msg, username: socket.username});
                    }   
                } else{ 
                    callback("error invalid user");
                }
            } else{
                //retrieve the username saved in the socket
                io.sockets.emit('new message', {message: data, username: socket.username});
            }

        });

        socket.on('disconnect', function(data){
            if(!socket.username) return;
            //NEW
            delete usernames[socket.nickname];
            // OLD
            //usernames.splice(usernames.indexOf(socket.username), 1);
            io.sockets.emit('usernames', usernames);
        });
    });
};
