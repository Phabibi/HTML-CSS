var  http = require("http");
var fs = require('fs');

var server = http.createServer(function(req,res) {
  console.log(req.url);
  if (req.url == "/"){
    var  file_1 = fs.readFileSync("index.html");
      res.writeHead ( 200 , {"content-type" : "text/html"});
      res.end(file_1,'binary');


  }
  else if(req.url == "img.jpg") {
        var file = fs.readFileSync("img.jpg")
        res.writeHead(200, {'Content-Type' : 'image/jpg'});
        res.end(file, 'binary');
      }

});
server.listen(20682);
