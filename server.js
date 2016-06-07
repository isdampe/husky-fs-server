var husky = require("./husky.js");
var express = require("express");
var app = express();

//Routes.
app.all('/fs/:uri', husky.read);
app.all('/fs/:uri/read', husky.read);
app.all('/fs/:uri/write', husky.write);

app.listen(8291, function(){
  console.log("Server listening on port 8291");
});