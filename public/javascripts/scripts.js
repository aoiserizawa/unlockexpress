// $(document).ready(function (){
//     $('#p1-fight').click(function(){
//         alert("ROCK");
//     });
// });

var app = {
    init: function(){
        app.events();
    },

    events:function(){
        // $('#p1-fight').on('click', function(){
        //     alert("rock");
        // });

        var socket = io.connect();
        var messageBox= $("#message");

        messageBox.on('keyup', function(){
        	socket.emit('changeText', messageBox.val());
        });

        socket.on('newText', function(data){
        	messageBox.val(data);
        });

    }
};

(function(){ app.init(); })();
