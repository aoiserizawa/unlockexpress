var app = {
    init: function(){ 
        app.events();
    },

    events:function(){

        var socket = io.connect();
        var messageBox = $("#message");
        var sendButton = $("#send-message-btn");
        var chatBox = $("#messages-wraper");

        sendButton.on('click', function(e){
            e.preventDefault();
        	socket.emit('sendMessage', messageBox.val());
            messageBox.val('');
        });

        socket.on('showMessage', function(data){
        	chatBox.append("<div>"+data+"</div>");
        });

    }
};

(function(){ app.init(); })();
