var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
console.log("y0ooo");


var server = http.createServer();

server.on('request', function(req,res)
{


	if(req.method === 'GET' && req.url === "/data/user.json")
	{

		var jasonpath = path.join(__dirname,"/data/user.json");
		fs.readFile(jasonpath,function(err,data){
			if(err)
			{
			if(err.code === 'ENOENT')
			{
				var errcode = "Error code: ENOENT";
				var errpost = JSON.stringify(errcode,null,2);
				fs.writeFile("./data/user.json",errpost, function(err)
				{

					res.write(errpost);
					res.end();
				});


			}
			else
			{
				return console.log(err);
			}
  }

			else {
				res.write(data);
				res.end();
			}
		});
	}
	if(req.method === 'POST' && req.url === "/")
	{
		var body = "";
		req.on('data',function(data)
		{
			body+= data.toString();
			console.log(body);
		});

		req.on('end', function(){
			var postObj = qs.parse(body);
			var postobj = JSON.stringify(postObj,null,2);
			fs.writeFile("./data/user.json",postobj,function(err){
				if(err)
				{
					return console.log(err);
				}
			});
			console.log("this is the post object " + postobj);
			res.end();
		});
	}

});
server.listen(8080);
