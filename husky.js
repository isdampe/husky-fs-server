var fs = require("fs");

var sendReply = function(res,status,data) {
  
  if ( typeof res == 'undefined' ) {
    throw "husky.sendReply called with no res argument";
    return false;
  }
  
  if ( typeof status == 'undefined' ) {
    status = 200;
  }
  
  if ( typeof data == 'undefined' ) {
    data = {};
  }
  
  res.status(status);
  res.json(data);
  
};

exports.read = function(req,res) {

  var uri = req.params.uri;

  try {
    stats = fs.lstatSync(uri);
  } catch (e) {
	sendReply(res,404,{
      system: "File not found"
    });
  }
  
  if ( stats.isDirectory() ) {
    
	var dir = fs.readdirSync(uri,{
      encoding: "utf8"
    });
    
    var dirStat = [], obj, fst;
    
    for ( var i=0; i<dir.length; i++ ) {

      try {
        fst = fs.lstatSync(uri + '/' + dir[i]);
        obj = {
          type: ( fst.isDirectory() == true ? "directory" : "file" ),
		  directory: uri,
          name: dir[i],
          size: fst.size,
          lastModified: fst.mtime,
          createdOn: fst.birthtime
        };
        dirStat.push(obj);
      } catch (e) {
        //Skip.
      }
      
    }
    
    sendReply(res,200,{
      fileList: dirStat
    });
    return true;
    
  }
  
  if ( stats.isFile() ) {
    
    var file = fs.readFileSync(uri,{
      encoding: "utf8"
    });
    
    sendReply(res,200,{
      buffer: file
    });
    return true;
  }
  
};

exports.write = function(req,res) {

  var uri = req.params.uri;
  
};