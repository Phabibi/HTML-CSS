var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var flag = false;

    var js_body = '';
console.log("y0ooo");


var server = http.createServer();

server.on('request', function(req,res)
{

	if(req.method === 'GET' && req.url === "/")
	{
		res.writeHead(302, {'location':'http://cmpt218.csil.sfu.ca:20682/form.html'});
		res.end();
	}

    if(req.method === 'GET' && req.url === "/data/user.json")
    {
        flag = true;
        if(fs.existsSync(path.join(__dirname, 'data/user.json'))){
            console.log("file exists");
        var Jsonpath = path.join(__dirname,req.url);
        var Json_stream = fs.createReadStream(Jsonpath,{highWatermark:1024});
        res.writeHead(200,{"content-Type" :"application/json" });
        Json_stream.pipe(res);
        //res.end();
        console.log("finished pipin");
    }


    else{
                console.log("file does not EXIST!!!!");
                fs.appendFileSync("data/user.json","[{}]");
                var Jsonpath = path.join(__dirname,req.url);
                var Json_stream = fs.createReadStream(Jsonpath,{highWatermark:1024});
                res.writeHead(200,{"content-Type" :"application/json" });
                Json_stream.pipe(res);
                //res.end();
                //console.log("finished piIMPin");
                /*, function(err)

                {
                    //res.end();
                    var Jsonpath = path.join(__dirname,req.url);
                    var Json_stream = fs.createReadStream(Jsonpath,{highWatermark:1024});
                    res.writeHead(200,{"content-Type" :"application/json" });
                    console.log("so i created the file");
                    Json_stream.pipe(res);
                    res.end();
                });
            }*/


        }

    }


    if(req.method === 'POST')
    {
        var body = '';
        req.on('data',function(data){

            body+= data.toString();
        });

        req.on('end', function(){
            var combo = '';
            var jasonpath_1 = path.join(__dirname,"/data/user.json");
            http.get('http://cmpt218.csil.sfu.ca:20682/data/user.json',function(res){
                res.on('data', function(data){

                    if(data)
                    {
                        combo+=data.toString();
                    }
            });

      res.on('end',function(){

         //console.log(combo);
        var postObj = qs.parse(body);
        //console.log("about to parse" + combo);
         var combo_arr = JSON.parse(combo);
         //var combo_arr_actual = [];
         //combo_arr_actual.push(combo_arr);
        // console.log(combo_arr);
            var email_arr = postObj.emailcount.split(',');  //turining emails into array
            var k = 0;

            for(var i = 0 ; i < email_arr.length ; i++)
            {
                if (email_arr.length != 1)
                {
                    //creating user objects
                    var new_obj = {fname : postObj.fname[i],
                    lname :postObj.lname[i], age : postObj.age[i], email : []};
                    //console.log(new_obj);
                }

                else
                {
                    //if only 1 user, make only 1 user object
                    var new_obj = {fname : postObj.fname,lname : postObj.lname,age : postObj.age, email : []};
                    //console.log(new_obj);
                }

            }

					for(i = 0 ; i < email_arr.length; i++)
					{
						for(j = 0 ; j < email_arr[i]; j++)
						{
							//adding the emails for each user.
								new_obj.email.push( postObj.email[k]);
								k++;
					}
						combo_arr.push(new_obj);
				}




            console.log("this is combo arr" +combo_arr);

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
            res.writeHead(302, {location:"http://cmpt218.csil.sfu.ca:20682/sumbit.html"});
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

                                         var the_table_top = ["fname","lname","age","email"];\
                                         for(var j = 0 ; j < 4 ; j++ ){\
                                             table_arr[0].insertCell(j);\
                                         }\

                                         for(var j = 0 ; j < the_table_top.length ;j++){\

                                             table.rows[0].cells[j].innerHTML = the_table_top[j];\


																					 }\

																					 for(i = 1 ; i < jason_object.length ; i++ )\
																				 	{\
																							table_arr[i] = table.insertRow(1);\
																							for(j = 0 ; j < the_table_top.length; j++)\
																						{\
																									table_arr[i].insertCell(-1);\
																							if(jason_object[i][the_table_top[j]] != ",")\
																						{\
																								table.rows[1].cells[j].innerHTML = jason_object[i][the_table_top[j]];\
																						}\
																						else\
																						{\
																								table.rows[1].cells[j].innerHTML = "none";\
																						}\
																					}\

																					}`;




                                            var html_content = '<!DOCTYPE HTML>' + '<html>' +'\n' + '<head>' +'\n'+ '<meta charset="utf-8">'+'\n' + '<link rel="stylesheet" type="text/css" href="user.css">' + '</head><body>' +'<h1>Table</h1>' + '<table id = "thetable" border = "1"></table>'+'<script type = "text/javascript">'+ js_body+'</script>'+'</body></html>'
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
                                            res.writeHead(200, {location : "http://cmpt218.csil.sfu.ca:20682/user.html"})
                                            res.write(html_content);
                                            res.end();

                                        //console.log(js_body)

                                    }

                            });


                        }
                });


        }
    }
    else if (req.method === 'GET' && req.url.match(/^\/.+\.html$/)) {
     var filepath = path.join(__dirname, req.url);
     if(fs.existsSync(filepath)){
         fs.readFile(filepath, function(err, contents) {
             if (err) {
                 // handle error
             } else {
                 res.writeHead(200, {"Content-Type": "text/html"});
                 res.write(contents);
                 res.end();
             }

         });
     }
     else{
         res.writeHead(404);
         res.write('404 Error');
         res.end();
     }

 }
 if (req.method === 'GET' && req.url.match(/^\/.+\.json$/) && !(flag)) {
     console.log("RECEIVED JSON REQUEST!!!!!!");
    var jsonpath = path.join(__dirname, req.url);
    var jsonstream = fs.createReadStream(jsonpath, {highWaterMark: 1024});
    res.writeHead(200, {"Content-Type": "application/json"});
    jsonstream.pipe(res);

  }


	if (req.method === 'GET' && req.url.match(/^\/.+\.js$/) && !(flag)) {
      console.log("RECEIVED JS REQUEST!!!!!!");
     var jsonpath = path.join(__dirname, req.url);
     var jsonstream = fs.createReadStream(jsonpath, {highWaterMark: 1024});
     res.writeHead(200, {"Content-Type": "application/json"});
     jsonstream.pipe(res);

   }

	 if (req.method === 'GET' && req.url.match(/^\/.+\.css$/) ) {
				console.log("RECEIVED JS REQUEST!!!!!!");
			 var jsonpath = path.join(__dirname, req.url);
			 var jsonstream = fs.createReadStream(jsonpath, {highWaterMark: 1024});
			 res.writeHead(200, {"Content-Type": "text/css"});
			 jsonstream.pipe(res);

		 }


});
server.listen(8080);
