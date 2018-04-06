
var express     = require("express"),
    path        = require("path"),
    bodyParser  = require("body-parser"),
    session     = require("express-session"),
    port        = 5000,
    root        = __dirname,
    app         = express();




app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({secret: "123456"}));

app.use(express.static(path.join(root, "./static")));

app.set('views', path.join(root, "./views"));
app.set('view engine', 'ejs');



app.get('/', function(req, res) {
    if (req.session.count){
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    
    res.render("index", {session: req.session});
});

app.get('/addtwo', function(req, res) {
    if (req.session.count){
        req.session.count += 2;
    } else {
        req.session.count = 1;
    }
    
    res.render("index", {session: req.session});
});

app.get('/reset', function(req, res){
    req.session.count = 0;

    res.redirect("/");
});


app.listen(port, function() {
 console.log("server running on port " + port);
});
