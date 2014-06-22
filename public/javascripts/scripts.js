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
        $('#p1-fight').on('click', function(){
            alert("rock");
        });

    }
};

(function(){ app.init(); })();
