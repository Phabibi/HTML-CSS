
var express = require('express');
var app = express();
var serverIndex = require('serve-index');
var http = require('http');
var path = require('path');
var session =require('express-session');
var fs = require('fs');

var admincheck = require('./Public/js/admincheck.js');

var username;
var pass;

var port = process.env.PORT || 3000;
var users = [];
var ssn;

var current_course;

// parsing body
app.use(express.json());
app.use(express.urlencoded( { extended:false} ));


app.use(express.static(path.join(__dirname,'/Public/')));
app.use(session({secret:'PASWAG'}));

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm','html'],
  index: "login.html"
}

var admin_option= {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm','html'],
  index: "admin.html"
}


app.use('/', function(req,res,next){
  console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
  next();
});




app.get('/', function(req,res,next){
  console.log("checking session");
  if(ssn == null)
  {
    console.log("setting session");
    ssn = req.session;
  }
  console.log("serving page");

  res.sendFile(__dirname + "/login.html");

});
//this should be done using ajax.
app.post('/', function(req,res,next){
  console.log("setting the session params");
  ssn = req.session;
  username = req.body.user;
  pass = req.body.pass;

  ssn.user = username;
  ssn.pass = pass;

  if(ssn.user === 'admin' && ssn.pass === '1234' )
  {
    console.log("loging in adming user");
    return res.redirect('/admin');
  }

  else {
    console.log("the user is not an admin");
    return res.redirect('/');
    }
});

app.get('/admin',function(req,res,next)

{
  if(ssn == null)
  {
    console.log("first timer");
    return res.redirect("/");


  }
  else{
    console.log("buddy already logged on");

    ssn = req.session;

    if(ssn.user === 'admin' && ssn.pass === '1234' )
    {
      console.log("loging buddy in");
      return res.sendFile(__dirname + "/admin.html");
    }

    else
     {
       console.log("my mans not an admin")
       return res.redirect("/");
     }

  }
  next();
});

app.post('/admin',function(req,res,next)
{

  console.log("the course added is: ",req.body.id);
  current_course = req.body.id;
  return res.redirect("/admincheck");

});

app.get('/checkin',function(req,res)

{
  console.log("checking in ovee heeii");
  return res.sendFile(__dirname + "/checkin.html");
});
  //console.log(req.body);

  app.get('/admincheck',function(req,res)

  {
    console.log("writing to file");

    var page_create = admincheck.courseid(current_course);

    fs.writeFile("./admincheck.html",page_create,function(err,data){

      if(err)
      {
        console.log(err);
      }

      else{
        console.log("file write success")
        res.sendFile(__dirname + "/admincheck.html");
      }

  });

  });
app.post('/admincheck',function(req,res){

  console.log("stopping the checkin");
  current_course = '';
  console.log(current_course);
  res.redirect('/admin');
});
  app.post('/checkin',function(req,res)
  {
    console.log("Checking in to the course");

if(current_course)
{
  if(req.body.checkstr === current_course)
  {
    console.log("the course exsists, succesfull ");
    res.redirect("/");
  }
}
else {
    console.log("the course doesnt exist, error");
    res.redirect("/checkin");
}


  });

app.delete('/users-api/:id', function(req,res,next){
  // search database for id
  users = users.filter(function(people){
    return ((people.fname !== req.body.fname) || (people.lname !== req.body.lname));
  });
  res.json(users);
});

http.createServer(app).listen(port);
console.log('running on port',port);
