var husky = require("./husky.js");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use( bodyParser.urlencoded({
  extended: true
}));

//Routes.
app.get('/fs/:uri', husky.read);
app.get('/fs/:uri/read', husky.read);
app.post('/fs/write', husky.write);

app.listen(8291, function(){
  console.log("Server listening on port 8291");
});