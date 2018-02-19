var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');

	var js_body = '';
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
				var errcode = "404 The Url that youre trying to reach doesnt exists.";
				var errpost = JSON.stringify(errcode,null,2);
				fs.writeFile("./data/error.json",errpost, function(err)
				{

					res.write(errpost);
					res.end();
				});


			}
			else
			{
			var error = "404 The Url that youre trying to reach doesnt exists.";
			res.write(error);
			res.end();
			}
  }

			else {
				var Jsonpath = path.join(__dirname,req.url);
				var Json_stream = fs.createReadStream(Jsonpath,{highWatermark:1024});
				res.writeHead(200,{"content-Type" :"application/json" })
				Json_stream.pipe(res)
			}
		});
	}
	if(req.method === 'POST' && req.url === "/")
	{
		var body = '';
		req.on('data',function(data){

			body+= data.toString();
		});


		req.on('end', function(){
			var combo = '';
			var jasonpath_1 = path.join(__dirname,"/data/user.json");
			http.get('http://localhost:8080/data/user.json',function(res){
				res.on('data', function(data){

					if(data)
					{
						combo+=data.toString();

					}


			});






			res.on('end',function(){

       console.log(combo);





			var postObj = qs.parse(body);

		 var combo_arr = JSON.parse(combo);
			var email_arr = postObj.emailcount.split(',');	//turining emails into array
			var k = 0;

			for(var i = 0 ; i < email_arr.length ; i++)
			{
				if (email_arr.length != 1)
				{
					//adding oldusers to new ones.
					var new_obj = {fname : postObj.fname[i],
					lname :postObj.lname[i], age : postObj.age[i], email : []};
					//console.log(new_obj);
				}

				else
				{
					//making an array of the rest/
					var new_obj = {fname : postObj.fname,lname : postObj.lname,age : postObj.age, email : []};
					//console.log(new_obj);
				}
				for(j = 0 ; j < email_arr[i]; j++)
				{
					if(email_arr.length != 1)
					{
						new_obj.email.push( postObj.email[k]);


					}
					else
					{
						new_obj.email.push(postObj.email);

					}
					k++
			}


			combo_arr.push(new_obj);

			}
			console.log("this is combo arr" +combo_arr.Object);

			var postobj = JSON.stringify(combo_arr,null,2);
			fs.writeFile("./data/user.json",postobj,function(err){
				if(err)
				{
					var error = "404 The Url that youre trying to reach doesnt exists.";
					res.write(error);
					res.end();

				}
					});
					});

			});
			//console.log("this is the post object " + postobj);
			res.writeHead(302, {location:"http://localhost:8080/data/user.json"})
			res.end();
		});
	}
		if(req.method === 'GET' && req.url === "/user.html")
			{
				var jasonpath = path.join(__dirname,"/data/user.json");
				if(fs.existsSync(jasonpath))
				{
					fs.readFile(jasonpath,function(err,jason_data)
				{
						if(err)
						{
							var er = "404 The Url that youre trying to reach doesnt exists.";
							res.write(er);
							res.end();
						}
						if(jason_data)
						{
							var user_html = path.join(__dirname,"/user.html")
							fs.readFile(user_html , function(err,data){
									if (err)
									{
										var er = "404 The Url that youre trying to reach doesnt exists.";
										res.write(er);
										res.end();
									}

									if(data)
									{
										js_body = ""
										var jason_data_string = jason_data;
										jason_data_string = jason_data.toString()
										var jason_user = qs.parse(jason_data_string);


										js_body = 'var jason_object = ' + jason_data_string +'\n'+`\
									   var table = document.getElementById("thetable");\
										 var table_arr = new Array;\
										 table_arr[0] = table.insertRow(0);\

										 var the_table_top = ["First Name","Last Name","age","Email"];\
										 for(var j = 0 ; j < 4 ; j++ ){\
											 table_arr[0].insertCell(j);\
										 }\

										 for(var j = 0 ; j < the_table_top.length ;j++){\

											 table.rows[0].cells[j].innerHTML = the_table_top[j];\

										 }\

											for(var  i = 0; i <= jason_object.fname.length; i++){\

												if(jason_object.fname[i])\
											{\

												table_arr[i+1] = table.insertRow(i+1);\
													table_arr[i+1].insertCell(0);\
													table.rows[i+1].cells[0].innerHTML = jason_object.fname[i];\

												}\


											}`;




											var html_content = '<!DOCTYPE HTML>' + '<html>' +'\n' + '<head>' +'\n'+ '<meta charset="utf-8">'+'\n' +'</head><body>' +'<h1>Table</h1>' + '<table id = "thetable" border = "1"></table>'+'<script type = "text/javascript">'+ js_body+'</script>'+'</body></html>'
											// var html_content = "<html lang ="+ " eng>" + "\n" + " <head>" + "\n" + " <meta charset =" + " utf-8" + " >"+ "<meta name = "+"keywords"+ " conetent ="+"Parsa,Habibi,Male"+ " >"+ " \n" + " <titl>Table</title>"+"<script src ="+" user.js" + " >"
											// var html_content_2 = "\n" + "</head>" + " \n"+" <body></body>"+ " \n" + " </html>"
											// html_content = html_content+html_content_2;

											fs.writeFile("./user.html",html_content,function (err){
												if(err)
												{
													res.writeHead(404);
													fs.write("404 error")
													res.end();
												}

											});
											res.writeHead(200, {location : "http://localhost:8080/user.html"})
											res.write(html_content);
											res.end();

										//console.log(js_body)

									}

							});


						}
				});


		}
	}


});
server.listen(8080);
