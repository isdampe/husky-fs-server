var husky = require("./husky.js");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use( bodyParser.urlencoded({
  extended: true
}));

//Enable CORS.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Routes.
app.get('/fs/:uri', husky.read);
app.get('/fs/:uri/read', husky.read);
app.get('/fs/:uri/autocomplete', husky.autocomplete);
app.post('/fs/write', husky.write);

app.listen(8291, function(){
  console.log("Server listening on port 8291");
});
