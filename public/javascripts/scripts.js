var app = {
    init: function(){ 
        app.events();
    },

    events:function(){

        var socket = io.connect();

        var setUserNameForm = $('#set-username');
        var errorNotice     = $('#error-notice');
        var userName        = $('#username');
        var messageBox      = $("#message");
        var sendButton      = $("#send-message-btn");
        var chatBox         = $("#messages-wraper");

        sendButton.on('click', function(e){
            e.preventDefault();
            socket.emit('sendMessage', messageBox.val());
            messageBox.val('');
        });

        socket.on('new message', function(data){
            chatBox.append(data.username+": "+data.message+"</br>");
        });

        socket.on('message', function(data){
            data = JSON.parse(data);
        	chatBox.append("<div>"+data.message+"</div>");
        });

        setUserNameForm.submit( function(e){
            e.preventDefault();
            socket.emit('new user', userName.val(), function(data){
                console.log(data);
                if(data){
                     $('.username-wrap').hide();
                     $('.chat-content').show();
                }else{
                    errorNotice.html('username is already taken');   
                }
            });
            userName.val('');
        });

        socket.on('usernames', function(data){
            var html = ''; 
            for (var i = 0; i < data.length; i++) {
                html += data[i]+"</br>";
            };
            $('#users-list').html(html);
        });

    }
};

(function(){ app.init(); })();
