exports.index = function(req, res){
        res.send("working");
};

exports.something = function(req, res){

        

        res.render('home', { title: 'Express' , data: 'tang ina gumana!!'});
};
