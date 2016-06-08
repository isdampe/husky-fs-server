var fs = require("fs");
var husky = require("./husky.js");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use( bodyParser.urlencoded({
  extended: true
}));

var cb = fs.readFileSync("config.json",{encoding:"utf8"});
if (! cb ) {
  console.error("No config.json file found.");
  process.exit(1);
}

var config;
try {
  config = JSON.parse(cb);
} catch(e) {
  console.error("Invalid config.json file");
  process.exit(1);
}

//Enable CORS.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Authenticate.
app.use(function(req,res,next){

  var user = req.body.user || false;
  var pass = req.body.pass || false;

  if (! user || ! pass ) {
    res.status(403);
    res.end();
    return false;
  }

  if ( user !== config.user || pass !== config.pass ) {
    res.status(403);
    res.end();
    return false;
  }

  next();
});

//Routes.
app.all('/fs/:uri/read', husky.read);
app.all('/fs/write', husky.write);

app.listen(8291, function(){
  console.log("Server listening on port 8291");
});
